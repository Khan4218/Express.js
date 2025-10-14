import { getDBConnection } from "../db/db.js";


const db = await getDBConnection()

export async function getGenres(req, res) {


  try {

    const genreRows = await db.all(`SELECT DISTINCT genre FROM products`)
    const genre = genreRows.map(obj => obj.genre)
    res.json(genre)

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch genres', details: err.message })
  }


}



export async function getProducts(req, res) {
  try {

    let query = `SELECT * FROM products`

    const getAllproducts = await db.all(query)

    res.json(getAllproducts)

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message })
  }

}