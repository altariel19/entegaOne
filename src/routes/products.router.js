const express = require('express');
const fs = require('fs');
const router = express.Router();
const ProductManager=require('../productsManager')

router.get('/products',(req, res)=>{
    const fs=require('fs')
    let resultado = JSON.parse(fs.readFileSync('products.json', 'utf-8'));
     
   
    if(req.query.limit){
        resultado=resultado.slice(0, req.query.limit)
    }

    res.setHeader('Content-Type','application/json');
    res.status(200).json({filtros: req.query,resultado });
})

router.get('/products/:pid',(req,res)=>{

    let id=req.params.pid
    id=parseInt(id)  
    if(isNaN(id)){
        return res.send('Error, ingrese un argumento id numerico')
    }

    const fs=require('fs')
    let resultado = JSON.parse(fs.readFileSync('products.json', 'utf-8')).find(prod=>prod.id===id)
    if (resultado === null || resultado === undefined) {
        res.status(404).json('producto no encontrado');
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ resultado });
    };
})

router.post('/products', (req, res) => {
    const { title, description, code, price, stock, category, /* estado,  */thumbnail } = req.body;
    


  
    if (!title || !description || !code || !price || !stock || !category /* || !estado */ ) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    } 
  
    const manager = new ProductManager('products.json');
    const addProduct =  manager.addProduct(title, description, price, thumbnail, code, stock, category/* , estado */);  

    if (addProduct) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).json({ message: 'Producto agregado con éxito', producto: addProduct });
    } else {
        res.status(400).json({ error: 'Producto no añadido' });
    }

    
    

})

router.post('/products/:pid', (req, res) => {
    let id = req.params.pid;
    id = parseInt(id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Error, ingrese un argumento id numérico' });
    }

    const { title, description, code, price, stock, category, estado, thumbnail } = req.body;

    if (!title || !description || !code || !price || !stock || !category || estado === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const manager = new ProductManager('products.json');
    const updatedProducts = manager.updateProduct(id, {
        title,
        description,
        code,
        price,
        stock,
        category,
        estado,
        thumbnail
    });

    if (updatedProducts) {
        res.status(200).json({ message: 'Producto Modificado con éxito' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.delete('/delete/:pid', (req, res) => {
    let id = req.params.pid;
    id = parseInt(id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Error, ingrese un argumento id numérico' });
    }
 
    
   
    const manager = new ProductManager('products.json');
    const deleteProduct = manager.deleteProducto(id)
    
    if (deleteProduct) {
        res.status(200).json({ message: 'Producto eliminado con exito'});
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;
