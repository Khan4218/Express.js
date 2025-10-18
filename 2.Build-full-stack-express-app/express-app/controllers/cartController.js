import { getDBConnection } from '../db/db.js'

export async function addToCart(req, res) {
   
 try{

    const db = await getDBConnection()
    const productId = parseInt(req.body.productId, 10) 
    const userId = req.session.userId

     if (isNaN(productId)) {
     return res.status(400).json({ error: 'Invalid product ID'})
     }
    if(!productId || !userId) {
    return res.json('Missing productId or userId')
    }
    
   
    const existingItem = await db.get('SELECT * FROM cart_items WHERE user_id =? AND product_id =?',[userId, productId])

    
    if(existingItem) {

     await db.run('UPDATE cart_items SET quantity = quantity + 1 WHERE id = ? ', [existingItem.id])

     return res.json({message: 'Cart Updated'})

    }else{
     await db.run('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?,?,1)',[userId,productId])

    }

    res.json({ message: 'Added new product to cart' })
        
    } catch (err) {
        
    console.error('Add to cart error:', err.message)

    res.status(500).json({ error: 'Failed to add to cart' })
  }
    }

 


 
 

 
 


  
