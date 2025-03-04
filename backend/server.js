const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Para manejar contraseñas seguras
const jwt = require('jsonwebtoken'); // Para generar tokens de autenticación

const app = express();

// Configuración para permitir solicitudes de orígenes cruzados
app.use(cors());

// Configuración de body-parser para poder leer datos JSON
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',  // Cambia esto si tu base de datos está en otro host
  user: 'root',       // Tu usuario de MySQL
  password: 'Teclados98',       // Tu contraseña de MySQL
  database: 'gestion_productos',  // Nombre de la base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log("Conexión a MySQL exitosa");



// Ruta para obtener productos (existente)
app.get('/productos', (req, res) => {
  db.query(`
    SELECT 
      p.id, 
      p.name, 
      p.category_id, 
      c.name AS category, 
      p.brand, 
      p.price, 
      p.old_price, 
      p.discount, 
      p.stock, 
      p.image, 
      p.description, 
      p.screen_size, 
      p.screen_resolution, 
      p.ram, 
      p.processor, 
      p.os, 
      p.battery, 
      p.waterproof, 
      p.release_date, 
      p.rating, 
      p.styles,
      COALESCE((SELECT JSON_ARRAYAGG(JSON_OBJECT('color', col.color)) 
                FROM product_colors pc 
                JOIN colors col ON pc.color_id = col.id 
                WHERE pc.product_id = p.id), '[]') AS colors,
      COALESCE((SELECT JSON_ARRAYAGG(JSON_OBJECT('type', con.type)) 
                FROM product_connectivities pc2 
                JOIN connectivities con ON pc2.connectivity_id = con.id 
                WHERE pc2.product_id = p.id), '[]') AS connectivities,
      COALESCE((SELECT JSON_ARRAYAGG(JSON_OBJECT('capacity', s.capacity)) 
                FROM product_storages ps 
                JOIN storages s ON ps.storage_id = s.id 
                WHERE ps.product_id = p.id), '[]') AS storages,
      COALESCE((SELECT JSON_ARRAYAGG(JSON_OBJECT('name', acc.name)) 
                FROM product_accessories pa 
                JOIN accessories acc ON pa.accessory_id = acc.id 
                WHERE pa.product_id = p.id), '[]') AS accessories,
      COALESCE((SELECT JSON_ARRAYAGG(JSON_OBJECT('user', r.user, 'comment', r.comment, 'rating', r.rating)) 
                FROM reviews r 
                WHERE r.product_id = p.id), '[]') AS reviews
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    GROUP BY p.id, c.name;
  `, (err, result) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send({ error: 'Error fetching products' });
    } else {
      console.log('Products fetched successfully');
      const products = result.map(product => ({
        ...product,
        colors: JSON.parse(product.colors || '[]'),
        connectivities: JSON.parse(product.connectivities || '[]'),
        storages: JSON.parse(product.storages || '[]'),
        accessories: JSON.parse(product.accessories || '[]'),
        reviews: JSON.parse(product.reviews || '[]')
      }));
      res.status(200).json(products);
    }
  });
});

crearAdministrador();
});

// Función para crear el administrador si no existe
async function crearAdministrador() {
  const adminEmail = 'admin@gmail.com';  // Correo del administrador
  const adminPassword = 'admin123';  // Contraseña predeterminada
  const adminNombre = 'Administrador';  // Nombre del administrador

// Verificar si el administrador ya existe
db.query('SELECT * FROM usuarios WHERE email = ?', [adminEmail], async (err, results) => {
  if (err) {
    console.error('Error al verificar administrador:', err);
    return;
  }

  if (results.length === 0) {
    // El administrador no existe, lo creamos

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Insertar el nuevo usuario administrador en la base de datos
    db.query(
      'INSERT INTO usuarios (nombre, email, contraseña, rol, fecha_creacion) VALUES (?, ?, ?, ?, NOW())',
      [adminNombre, adminEmail, hashedPassword, 'admin'],
      (err) => {
        if (err) {
          console.error('Error al insertar administrador:', err);
        } else {
          console.log('Administrador creado exitosamente');
        }
      }
    );
  } else {
    console.log('El administrador ya existe');
  }
});


  // Crear el administrador inicial si no existe
    crearEditor();
  };

  // Función para crear el administrador si no existe
  async function crearEditor() {
    const editorEmail = 'editor@gmail.com';  // Correo del administrador
    const editorPassword = 'editor123';  // Contraseña predeterminada
    const editorNombre = 'Editor';  // Nombre del administrador

  // Verificar si el administrador ya existe
  db.query('SELECT * FROM usuarios WHERE email = ?', [editorEmail], async (err, results) => {
    if (err) {
      console.error('Error al verificar editor:', err);
      return;
    }

    if (results.length === 0) {
      // El editor no existe, lo creamos

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(editorPassword, 10);

      // Insertar el nuevo usuario administrador en la base de datos
      db.query(
        'INSERT INTO usuarios (nombre, email, contraseña, rol, fecha_creacion) VALUES (?, ?, ?, ?, NOW())',
        [editorNombre, editorEmail, hashedPassword, 'editor'],
        (err) => {
          if (err) {
            console.error('Error al insertar editor:', err);
          } else {
            console.log('editor creado exitosamente');
          }
        }
      );
    } else {
      console.log('El editor ya existe');
    }
  });

}

// Ruta para el registro de usuarios
app.post('/register', async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  // Verificar si el usuario ya existe
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar el nuevo usuario en la base de datos
    db.query(
      'INSERT INTO usuarios (nombre, email, contraseña, rol, fecha_creacion) VALUES (?, ?, ?, ?, NOW())',
      [nombre, email, hashedPassword, 'user'],
      (err) => {
        if (err) {
          console.error('Error al insertar usuario:', err);
          return res.status(500).json({ message: 'Error al registrar el usuario' });
        }

        // Mostrar en la consola que el usuario se ha registrado
        console.log(`El usuario @${email} se ha registrado`);

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
      }
    );
  });
});


// Ruta para login
app.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

// Middleware de autenticación
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtén el token del header

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se ha proporcionado un token.' });
  }

  try {
    const decoded = jwt.verify(token, 'tu_secreto_jwt'); // Verifica el token
    req.user = decoded; // Decodifica el token y guarda los datos del usuario
    next(); // Pasa al siguiente middleware o ruta
  } catch (err) {
    return res.status(400).json({ message: 'Token inválido.' });
  }
};

// Ejemplo de uso del middleware en una ruta protegida
app.get('/productos', verifyToken, (req, res) => {
  // Código para obtener productos...
});


  // Buscar el usuario en la base de datos
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];

    // Verificar la contraseña
    const isContraseñaValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isContraseñaValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Mensaje en la consola si es administrador
    if (user.rol === 'admin') {
      console.log(`El administrador ${user.email} ha iniciado sesión.`);
    } else {
      console.log(`El usuario ${user.email} ha iniciado sesión.`);
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      'tu_secreto_jwt', // Cambia por una clave secreta segura
      { expiresIn: '1h' }
    );

    // Devolver el token y los datos del usuario
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
  });
});

// Ruta para agregar productos (existente)
app.post('/productos', (req, res) => {
  const productos = req.body;

  productos.forEach((producto) => {
    const { name, price, categoriaId } = producto;

    db.query(
      'INSERT INTO productos (name, price, categoriaId) VALUES (?, ?, ?)',
      [name, price, categoriaId],
      (err, result) => {
        if (err) {
          console.error('Error al insertar producto:', err);
        } else {
          console.log('Producto insertado con ID:', result.insertId);
        }
      }
    );
  });

  res.status(200).send('Productos insertados correctamente');
});



// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
