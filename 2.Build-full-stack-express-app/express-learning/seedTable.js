import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { abductionsData } from './abductionData.js'

async function seedTable() {

  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })

  try {
    await db.exec('BEGIN TRANSACTION')

    for (const { location, details } of abductionsData) {
      await db.run(`
        INSERT INTO abductions(location, details)
        VALUES (?,?)
        `,
        [location, details]
      )
    }

    await db.exec('COMMIT')

    console.log('All records inserted');
  } catch (error) {

    await db.exec('ROLLBACK')

    console.log('cannot insert data', error);
  } finally {
    await db.close()
    console.log('connection closed');

  }
}

seedTable()