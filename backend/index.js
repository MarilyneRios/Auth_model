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

app.use(function(req, res, next) {
  for (const address of addresses) {
      res.header("Access-Control-Allow-Origin", address)
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
  next()
})

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
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  res.send('CORS is enabled for all origins!');
});

//app.get("/", (req, res) => res.send("Express on Vercel"));

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
// app.use((req, res, next) => {
//   console.log('1 CORS middleware called');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true'); // credentials true comme dans le front
//   header("Access-Control-Allow-Headers: Content-Type, *");
//   console.log('2 CORS headers set');
//   if (req.method === 'OPTIONS') {
//     res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     console.log('3 OPTIONS request');
//     return res.status(200).json({});
//   }
//   console.log('4 Not an OPTIONS request')
//   next();
// });

//--------------------middleware qui ajoute les en-têtes -----------------


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));