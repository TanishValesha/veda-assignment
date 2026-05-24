import express, { Application, Request, Response } from 'express';
import { connectDB } from './config/db';

const app: Application = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express & TypeScript!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
