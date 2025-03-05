// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Registro
exports.register = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    try {
      const hashedPassword = await bcrypt.hash(contraseña, 10);
      db.query(
        'INSERT INTO usuarios (nombre, email, contraseña, rol, fecha_creacion) VALUES (?, ?, ?, ?, NOW())',
        [nombre, email, hashedPassword, 'user'],
        (err) => {
          if (err) {
            console.error('Error al insertar usuario:', err);
            return res.status(500).json({ message: 'Error al registrar el usuario' });
          }
          console.log(`El usuario @${email} se ha registrado`);
          res.status(201).json({ message: 'Usuario registrado exitosamente' });
        }
      );
    } catch (error) {
      return res.status(500).json({ message: 'Error al encriptar la contraseña' });
    }
  });
};

// Login
exports.login = async (req, res) => {
  const { email, contraseña } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];
    try {
      const isValidPassword = await bcrypt.compare(contraseña, user.contraseña);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Generamos un token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, rol: user.rol },
        process.env.JWT_SECRET || 'tu_secreto_jwt',
        { expiresIn: '1h' }
      );

      // Mensaje en consola si es admin
      if (user.rol === 'admin') {
        console.log(`El administrador ${user.email} ha iniciado sesión.`);
      } else {
        console.log(`El usuario ${user.email} ha iniciado sesión.`);
      }

      // Retornamos token y datos del usuario
      res.json({
        message: 'Inicio de sesión exitoso',
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        }
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error al comparar la contraseña' });
    }
  });
};

// Crear usuarios iniciales (admin, editor) si no existen
exports.initAdmins = async () => {
  try {
    await crearUsuario('admin@gmail.com', 'admin123', 'Administrador', 'admin');
    await crearUsuario('editor@gmail.com', 'editor123', 'Editor', 'editor');
  } catch (error) {
    console.error('Error creando usuarios iniciales:', error);
  }
};

const crearUsuario = (email, password, nombre, rol) => {
  return new Promise(async (resolve, reject) => {
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
      if (err) return reject(err);

      // Si no existe, lo creamos
      if (results.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
          'INSERT INTO usuarios (nombre, email, contraseña, rol, fecha_creacion) VALUES (?, ?, ?, ?, NOW())',
          [nombre, email, hashedPassword, rol],
          (err) => {
            if (err) {
              return reject(err);
            }
            console.log(`Usuario ${rol} creado: ${email}`);
            return resolve(true);
          }
        );
      } else {
        console.log(`El usuario ${email} (rol: ${rol}) ya existe`);
        return resolve(false);
      }
    });
  });
};
