import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { graphqlHTTP } from 'express-graphql';

import userRoutes from './routes/userRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import consultaRoutes from './routes/consultaRoute.js';
import bloodTypeRoutes from './routes/bloodTypeRoutes.js';
import seguimientoRoutes from './routes/seguimientoRoutes.js';

import schema from "./graphql/typeDefs.js";


// Reemplazo de __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware JSON
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Conexión a MongoDB
mongoose
  .connect('mongodb://localhost:27017/medicalSystemTwo')
  .then(() => console.log(" Conectado a MongoDB"))
  .catch(err => console.error(" Error de conexión a MongoDB", err));

// Configuración CORS solo para REST
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
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
app.use('/api/v1', cors(corsOptions)); // Aplica solo a tus rutas REST

// Rutas REST
app.use('/api/v1/Users', userRoutes);
app.use('/api/v1/Auth', loginRoutes);
app.use('/api/v1/MedicalConsult', consultaRoutes);
app.use('/api/v1/BloodType', bloodTypeRoutes);
app.use('/api/v1/Seguimiento', seguimientoRoutes);

//Usamos graphql
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}));

  // Arrancar servidor
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊GraphQL disponible en http://localhost:${PORT}/graphql`);
  });



