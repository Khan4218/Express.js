| **Method**     | **Use Case**                        | **Returns**                 |
|----------------|------------------------------------|-----------------------------|
| `db.run()`     | Insert / Update / Delete / Create   | `{ lastID, changes }`       |
| `db.get()`     | Fetch one record                    | Object or `undefined`       |
| `db.all()`     | Fetch multiple records              | Array of objects            |
| `db.exec()`    | Run multiple SQL statements          | `void`                      |
| `db.close()`   | Close database connection            | `void`                      |

## EXAMPLES

🧩 1. db.run()

Used for Insert, Update, Delete, or Create operations.
| **Example** | **Description** |
|--------------|----------------|
| ```js
await db.run(
  'INSERT INTO users (name, email) VALUES (?, ?)',
  ['Akbar', 'akbar@example.com']
)
``` | Inserts a new user into the database. |


🔍 2. db.get()

Used to fetch a single record.

| **Example** | **Description** |
|--------------|----------------|
| ```js
const user = await db.get(
  'SELECT * FROM users WHERE id = ?',
  [1]
)
``` | Returns one user object with `id = 1`, or `undefined` if not found. |


📋 3. db.all()

Used to fetch multiple records.

| **Example** | **Description** |
|--------------|----------------|
| ```js
const users = await db.all('SELECT * FROM users')
``` | Returns an array of all user records in the table. |


⚙️ 4. db.exec()

Used to run multiple SQL statements at once.

| **Example** | **Description** |
|--------------|----------------|
| ```js
await db.exec(`
  CREATE TABLE IF NOT EXISTS test (
    id INTEGER PRIMARY KEY,
    name TEXT
  );
  INSERT INTO test (name) VALUES ('John');
`)
``` | Executes multiple SQL commands in one go. |


🔒 5. db.close()

Used to close the database connection.

| **Example** | **Description** |
|--------------|----------------|
| ```js
await db.close()
``` | Closes the database connection to free resources. |
