class CartManager {
    constructor(path) {
      this.carts = {};
      this.path=path
    }
  
    createCart() {
        const fs = require('fs');
        let existingData = [];
        if (fs.existsSync(this.path)) {
            const fileContent = fs.readFileSync(this.path, 'utf-8');
            existingData = JSON.parse(fileContent);
        }
    
      const cartId = existingData.length;
      this.carts[cartId] = { id: cartId, products: [] };
      existingData.push(this.carts[cartId]);
     fs.writeFileSync(this.path, JSON.stringify(existingData, null, '\t'));
      return this.carts[cartId];
    }
  
    getCart(cartId) {
      return this.carts[cartId];
    }
  
    addProductToCart(cartId, productId) {
        const fs = require('fs');
        const cartData = JSON.parse(fs.readFileSync('carts.json', 'utf-8'));
        const cart = cartData.find(car => car.id === cartId);
    
        if (!cart) {
            return false; 
        }
    
        const existingProductIndex = cart.products.findIndex(product => product.id === productId);
    
        if (existingProductIndex !== -1) {
            
            cart.products[existingProductIndex].quantity = (cart.products[existingProductIndex].quantity || 0) + 1;
        } else {
           
            cart.products.push({ id: productId, quantity: 1 });
        }
    
        
        const cartIndex = cartData.findIndex(car => car.id === cartId);
    
        
        cartData[cartIndex] = cart;
    
        
        fs.writeFileSync('carts.json', JSON.stringify(cartData, null, '\t'));
    
        return true;
    }
    
    }

    module.exports = CartManager;
