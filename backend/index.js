import path from 'path';
import { fileURLToPath } from 'url';
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

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get("/", (req, res) => res.send("Express on Vercel"));

// --------------------------deployment------------------------------
// resolving dirname for ES module
/*


//console.log(__dirname);//D:\Projets développement\vite\authentification_model\Auth_model\backend
*/
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
// --------------------------deployment------------------------------

//--------------------middleware qui ajoute les en-têtes -----------------
app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  
  next();
});


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));