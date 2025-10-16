import { getDBConnection } from "../db/db.js";


const db = await getDBConnection()

export async function getGenres(req, res) {


  try {

    const genreRows = await db.all(`SELECT DISTINCT genre FROM products`)
    const genre = genreRows.map(obj => obj.genre)
    res.json(genre)

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch genres', details: errors.message })
  }


}



export async function getProducts(req, res) {
  try {

    let query = 'SELECT * FROM products';
    let params = [];

    const { genre, search } = req.query

    if (genre) {
      query += ' WHERE genre = ?';
      params.push(genre)

    } else if (search) {
      query += ' WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ?';
      const searchPattern = `%${search}%`
      params.push(searchPattern, searchPattern, searchPattern)
    }

    const getAllproducts = await db.all(query, params)

    res.json(getAllproducts)

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', details: error.message })
  }

}