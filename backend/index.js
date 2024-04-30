import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
const { v4: uuidv4 } = require('uuid');
console.log(uuidv4()); 


// resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//console.log(__dirname);//D:\Projets développement\vite\authentification_model\Auth_model\backend

const port = process.env.PORT || 3001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get("/", (req, res) => res.send("Express on Vercel"));

/*
// --------------------------deployment------------------------------


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
// --------------------------deployment------------------------------*/

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));