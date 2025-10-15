import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'


async function viewAllProducts() {

  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })

  try {
    const products = await db.all('SELECT * FROM products')
    console.table(products)
  } catch (err) {
    console.error('Error fetching data', err)
  } finally {
    await db.close()
  }

}

viewAllProducts()


import { getDBConnection } from '../db/db.js'

async function logTable() {
  const db = await getDBConnection()

  const tableName = 'users'

  try {

    const table = await db.all(`SELECT * FROM ${tableName}`)
    console.table(table)

  } catch (err) {

    console.error('Error fetching table:', err.message)

  } finally {

    await db.close()

  }
}

logTable()