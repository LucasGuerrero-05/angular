// src/controllers/productController.js
const db = require('../config/db');

exports.getProducts = (req, res) => {
  const query = `
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
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Error fetching products' });
    }
    console.log('Products fetched successfully');
    const products = result.map((product) => ({
      ...product,
      colors: JSON.parse(product.colors || '[]'),
      connectivities: JSON.parse(product.connectivities || '[]'),
      storages: JSON.parse(product.storages || '[]'),
      accessories: JSON.parse(product.accessories || '[]'),
      reviews: JSON.parse(product.reviews || '[]')
    }));
    res.status(200).json(products);
  });
};

exports.addProducts = (req, res) => {
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
};
