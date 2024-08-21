const express = require('express');
const db = require('./config/db');

const Routes = require('./app/routers/index');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba para verificar la conexión
app.get('/', async (req, res) => {
  try {
    // Verifica la conexión a la base de datos
    await db.sequelize.authenticate();
    res.send('Conectado a la base de datos PostgreSQL');
  } catch (err) {
    console.error('Error al conectar a la base de datos:');
    res.status(500).send('Error en el servidor');
  }
});

Routes(app);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});