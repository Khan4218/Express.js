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

export async function getCartCount(req, res) {
  try {
    const db = await getDBConnection();
    const userId = req.session.userId;

    if (!userId) {
      return res.json({ totalItems: 0 });
    }

    const result = await db.get(
      'SELECT SUM(quantity) AS totalItems FROM cart_items WHERE user_id = ?',
      [userId]
    );

    res.json({ totalItems: result?.totalItems || 0 });
  } catch (err) {
    console.error('Cart count error:', err.message);
    res.status(500).json({ error: 'Failed to get cart count' });
  }
}


 
export async function getAll(req, res) {


  const db = await getDBConnection()

  const items = await db.all(`
  SELECT ci.id AS cartItemId, ci.quantity, p.title, p.artist, p.price FROM cart_items ci JOIN products p ON p.id = ci.product_id WHERE ci.user_id = ?`,
  [req.session.userId])

  res.json({ items: items})

} 

export async function deleteItem(req, res) {

    try{
        
        const db = await getDBConnection()
    
        const itemId = parseInt(req.params.itemId, 10)
    
        if(!itemId){
          return res.status(400).json({message : 'Innvalid ItemId'})
        }
    
        const item = await db.get('SELECT quantity FROM cart_items WHERE id = ? AND user_id = ?', [itemId, req.session.userId])
    
        if(!item) {
         return res.status(400).json({message: 'item not found'})
        }
    
        await db.run('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [itemId, req.session.userId])
    
        res.status(204).send()
    }catch(error) {
    console.error('Delete item error:', error.message);
     res.status(500).json({ error: 'Failed to delete item' });
   }

}



export async function deleteAll(req, res) {
    
    const db = await getDBConnection()

    await db.run('DELETE FROM cart_items WHERE user_id = ?', [req.session.userId])
    
    res.status(204).send()

}
 
 

 
 


  
