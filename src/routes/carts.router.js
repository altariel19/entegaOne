const express = require('express');
const fs = require('fs');
const router = express.Router();
const CartsManager=require('../cartsManager')

const cartManager = new CartsManager('carts.json');
  
// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
  const newCart = cartManager.createCart();
  res.status(201).json(newCart);
});

// Ruta para listar los productos de un carrito
router.get('/:cid', (req, res) => {
  
  let id=req.params.cid
  id=parseInt(id)  
  if(isNaN(id)){
      return res.send('Error, ingrese un argumento id numerico')
  }

  const fs=require('fs')
  let resultado = JSON.parse(fs.readFileSync('carts.json', 'utf-8')).find(car=>car.id===id)
  if (resultado === null || resultado === undefined) {
      res.status(404).json('Carrito no encontrado');
  } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ resultado });
  }
  
})

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
  let productId = req.params.pid;
  let id=req.params.cid
  id=parseInt(id)  
  if(isNaN(id)){
      return res.send('Error, ingrese un argumento id numerico')
  }

  productId=parseInt(productId)  
  if(isNaN(productId)){
      return res.send('Error, ingrese un argumento id numerico')
  }

  if (cartManager.addProductToCart(id, productId)) {
    res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

module.exports = router;
