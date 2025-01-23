import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import loginRoutes from './routes/loginRoutes.js'


const app = express();
const PORT = 3000;

//Configuramos cors
const allowedOrigins = ['http://localhost:5174', 'http://127.0.0.1:5174'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No autorizado por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
//Middleware para parsear JSON
app.use(express.json());



//Coneccion a la base de datos
mongoose
  .connect('mongodb://localhost:27017/medicalSystemTwo')
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.error("Error al conectar a la base de datos", err))

//Rutas
app.use('/api/v1/Users', userRoutes);
app.use('/api/v1/Auth', loginRoutes)

app.listen(PORT, () => {
    console.log(`app running on ${PORT}`);
});