const express=require('express')
const ProductManager=require('./productsManager')
const CartsManager=require('./cartsManager')

const PORT=8080
const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




const productRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')

    app.use('/api', productRouter);
    app.use('/api/carts', cartsRouter);

  
 

const server=app.listen(PORT, ()=>{
    console.log(`Server on line en puerto ${PORT}`)
}) 

