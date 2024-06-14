import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4()); 

const port = process.env.PORT || 3001;
const adresses = ["http://localhost:3000", "*"];

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'PATCH','POST', 'PUT', 'DELETE'],
  }),
);

app.use((req, res, next) => {
  console.log(res.get('Access-Control-Allow-Origin'));
  next();
});

app.get('/', (req, res) => {
  res.send('CORS is enabled for all origins!');
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/api", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));