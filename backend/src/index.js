// src/index.js
require('dotenv').config(); // Para leer .env
const app = require('./app');
const { initAdmins } = require('./controllers/authController');

const port = process.env.PORT || 3000;

// Crear admin/editor al arrancar la app
initAdmins().then(() => {
  console.log('Verificación de admin/editor completa');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
