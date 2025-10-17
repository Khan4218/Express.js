import validator from 'validator'
import { getDBConnection } from '../db/db.js'
import bcrypt from 'bcryptjs'
export async function registerUser(req, res) {

  let { name, email, username, password } = req.body

  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: 'All fields required' })
  }

  name = name.trim()
  email = email.trim()
  username = username.trim()
  password = password.trim()

  const regixUsername = /^[a-zA-Z0-9_-]{1,20}$/

  if (!regixUsername.test(username)) {
    return res.status(400).json({ error: 'Invalid characters in username' })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Ivalid email format' })
  }

  try {

    const db = await getDBConnection()

    const existing = await db.get('SELECT id FROM users WHERE email = ? OR username = ?', [email, username])

    if (existing) {
      return res.status(400).json({ error: 'Email or Username already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.run('INSERT INTO users (name,email,username,password) VALUES(?,?,?,?)',
      [name, email, username, hashedPassword])

    res.status(201).json({ message: 'User registered' })




  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ error: 'Registration failed. Please try again.' })
  }

}