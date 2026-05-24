import path from "path";
import PDFDocument from "pdfkit";
import fs from "fs";
import { GeneratedPaper } from "../types";
import { cloudinary } from "../config/cloudinary";

const TMP_DIR = path.join(__dirname, "../../tmp-pdfs");

// font directory mapping
const FONTS_DIR = path.resolve(__dirname, "../assets/fonts");
const FONT_REGULAR = path.join(FONTS_DIR, "Inter-Regular.otf");
const FONT_BOLD = path.join(FONTS_DIR, "Inter-Bold.otf");
const FONT_ITALIC = path.join(FONTS_DIR, "Inter-LightItalic.otf");

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Easy",
  moderate: "Moderate",
  challenging: "Challenging",
};

// Uploads the generated PDF to Cloudinary and returns the secure URL
export async function generatePDF(paper: GeneratedPaper): Promise<string> {
  const tmpPath = await generateLocalPDF(paper);

  const result = await cloudinary.uploader.upload(tmpPath, {
    folder: "vedaai/papers",
    public_id: `paper_${paper.assignmentId}`,
    resource_type: "raw",
    format: "pdf",
  });

  fs.unlinkSync(tmpPath);

  return result.secure_url;
}

export async function generateLocalPDF(paper: GeneratedPaper): Promise<string> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(TMP_DIR, `${paper.assignmentId}.pdf`);
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // --- DEFENSIVE FONT REGISTRATION ---
    let fontReg = "Helvetica";
    let fontBold = "Helvetica-Bold";
    let fontItalic = "Helvetica-Oblique";

    // Verify if your files physically exist at runtime
    if (
      fs.existsSync(FONT_REGULAR) &&
      fs.existsSync(FONT_BOLD) &&
      fs.existsSync(FONT_ITALIC)
    ) {
      doc.registerFont("Inter", FONT_REGULAR);
      doc.registerFont("Inter-Bold", FONT_BOLD);
      doc.registerFont("Inter-Italic", FONT_ITALIC);

      fontReg = "Inter";
      fontBold = "Inter-Bold";
      fontItalic = "Inter-Italic";
      console.log("Custom Inter fonts loaded successfully!");
    } else {
      console.warn(
        "WARNING: Inter fonts not found. Falling back to default Helvetica to prevent corruption.",
      );
      console.warn(`Expected fonts folder at: ${FONTS_DIR}`);
    }
    // Paper Title and Metadata
    doc.font(fontBold).fontSize(20).text(paper.title, { align: "center" });
    doc.moveDown(0.2);

    doc
      .font(fontBold)
      .fontSize(13)
      .text(`Subject: ${paper.subject}`, { align: "center" });
    doc.moveDown(0.2);
    doc.text(`Class: ${paper.gradeLevel}`, { align: "center" });
    doc.moveDown(1.5);

    // Time Allowed and Total Marks
    const topY = doc.y;
    doc
      .font(fontReg)
      .fontSize(10)
      .text(`Time Allowed: ${paper.timeAllowed}`, 50, topY);
    doc
      .font(fontReg)
      .fontSize(10)
      .text(`Maximum Marks: ${paper.totalMarks}`, 50, topY, {
        width: 495,
        align: "right",
      });
    doc.moveDown(1.5);

    doc
      .font(fontReg)
      .fontSize(10)
      .text("All questions are compulsory unless stated otherwise.");
    doc.moveDown(1.5);

    // Student Info Section
    doc.font(fontReg).fontSize(10);
    doc.text("Name: ___________________________");
    doc.moveDown(0.5);
    doc.text("Roll Number: ________________");
    doc.moveDown(0.5);
    doc.text(`Class: ${paper.gradeLevel}  Section: _______`);
    doc.moveDown(2);

    // Iterate over the questions by Section
    for (const section of paper.sections) {
      // Section Header
      doc.font(fontBold).fontSize(16).text(section.label, { align: "center" });
      doc.moveDown(1);

      doc.font(fontBold).fontSize(11).text(section.title);
      doc.moveDown(0.2);
      doc.font(fontItalic).fontSize(10).text(section.instruction);
      doc.moveDown(1);

      // Questions
      section.questions.forEach((q, index) => {
        const questionLine = `${index + 1}. [${DIFFICULTY_LABEL[q.difficulty]}] ${q.text} [${q.marks} Mark${q.marks > 1 ? "s" : ""}]`;
        doc
          .font(fontReg)
          .fontSize(10)
          .text(questionLine, { lineGap: 5, paragraphGap: 6 });

        if (q.type === "mcq" && q.options && q.options.length > 0) {
          const optionLabels = ["A", "B", "C", "D"];
          q.options.forEach((opt, i) => {
            doc
              .font(fontReg)
              .fontSize(10)
              .text(`   ${optionLabels[i]}. ${opt}`, { lineGap: 3 });
          });
          doc.moveDown(0.5);
        }
      });

      doc.moveDown(1);
      doc.font(fontBold).fontSize(10).text(`End of ${section.label}`);
      doc.moveDown(2);
    }

    doc.font(fontBold).fontSize(10).text(`End of Question Paper`);

    // Answer Key on a new page
    doc.addPage();
    doc.font(fontBold).fontSize(16).text("Answer Key", { align: "left" });
    doc.moveDown(1);

    let answerIndex = 1;
    for (const section of paper.sections) {
      for (const q of section.questions) {
        if (q.answer) {
          doc
            .font(fontBold)
            .fontSize(10)
            .text(`${answerIndex}. `, { continued: true });
          doc
            .font(fontReg)
            .fontSize(10)
            .text(`${q.answer}`, { paragraphGap: 8 });
          answerIndex++;
        }
      }
    }

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
}
