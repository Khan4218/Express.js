import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { vinyl } from './data.js'

async function seedTables() {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })

  try {
    await db.exec('BEGIN TRANSACTION')

    // 🧹 Clear old data first
    await db.run('DELETE FROM products')

    // (Optional) reset auto-increment ID if you want to start fresh
    await db.run('DELETE FROM sqlite_sequence WHERE name = "products"')

    // Now insert fresh data
    for (const { title, artist, price, image, year, genre, stock } of vinyl) {
      await db.run(
        `INSERT INTO products (title, artist, price, image, year, genre, stock)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, artist, price, image, year, genre, stock]
      )
    }

    await db.exec('COMMIT')
    console.log('✅ DATA INSERTED SUCCESSFULLY')
  } catch (error) {
    await db.exec('ROLLBACK')
    console.error('❌ Failed to insert data:', error.message)
  } finally {
    await db.close()
    console.log('🔒 Connection closed')
  }
}

seedTables()
