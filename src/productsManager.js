
class ProductManager {
    constructor(path) {
        this.products = [];
        this.path=path
    }

    
    
       

        addProduct(title, description, price, thumbnail, code, stock, category, estado) {
            const missingFields = [];
        
            if (!title) {
                missingFields.push("Título");
            }
            if (!description) {
                missingFields.push("Descripción");
            }
            if (!price) {
                missingFields.push("Precio");
            }
           
            if (!code) {
                missingFields.push("Código");
            }
            if (stock === undefined) {
                missingFields.push("Stock");
            }
            if (category === undefined) {
                missingFields.push("Categoría");
            }
           
        
            if (missingFields.length > 0) {
                return false;
            }
        
            
            const fs = require('fs');
            let existingData = [];
            if (fs.existsSync(this.path)) {
                const fileContent = fs.readFileSync(this.path, 'utf-8');
                existingData = JSON.parse(fileContent);
            }
        
            
            const id = existingData.length;
        
            
            const newProduct = { title, description, price, thumbnail, code, stock, category, estado:true, id };
        
            
            existingData.push(newProduct);
        
            
            fs.writeFileSync(this.path, JSON.stringify(existingData, null, '\t'));
        
            return { message: 'Producto agregado con éxito', producto: newProduct };
        }
        
    
    

    getProducts(){
        const fs=require('fs')
        console.log(JSON.parse(fs.readFileSync(this.path, "utf-8")))
        
    }

    getProdcutsById(id){
        const fs=require('fs')
        const lectura = fs.readFileSync(this.path, 'utf-8');
        const arrayJSON = JSON.parse(lectura);
        arrayJSON.find((prod) => prod.id === id) ?
        console.log(this.products.find((prod) => prod.id === id)) :
        console.log('Not found');

       
        
    }

  

    updateProduct(id, updates) {
        const fs = require('fs');
        const lectura = fs.readFileSync(this.path, 'utf-8');
        const arrayJSON = JSON.parse(lectura);
    
        const updatedArray = arrayJSON.map((prod) => {
            if (prod.id === id) {
                return {
                    ...prod,
                    ...updates,
                };
            } else {
                return prod;
            }
        });
    
        fs.writeFileSync(this.path, JSON.stringify(updatedArray, null, '\t'));
    
        return true;
    }
    
    deleteProducto(id){
        const fs = require('fs');
        const lectura = fs.readFileSync(this.path, 'utf-8');
        const arrayJSON = JSON.parse(lectura);
        const updatedArray = arrayJSON.filter(prod => prod.id !== id); 
            

        
        fs.writeFileSync(this.path, JSON.stringify(updatedArray, null, '\t'));
    
        return true;
            
                
    }
}    

module.exports = ProductManager;









