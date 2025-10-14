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

    let query = 'SELECT * FROM products';
    let params = [];

    const { genre } = req.query

    if (genre) {
      query += ' WHERE genre = ?';
      params.push(genre)

    }
    const getAllproducts = await db.all(query, params)

    res.json(getAllproducts)

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', details: error.message })
  }

}