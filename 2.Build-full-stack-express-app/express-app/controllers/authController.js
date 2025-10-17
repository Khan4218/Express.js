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

    req.session.userId = result.lastID

    res.status(201).json({ message: 'User registered' })




  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ error: 'Registration failed. Please try again.' })
  }

}



export async function loginUser(req, res) {

  let {username, password} = req.body
   
  if(!username || !password) {
   return res.status(400).json( { error: 'All fields are required' } )
  }

  username = username.trim()

  




/*
Challenge:

 1. If the user's login details are incomplete, end the response with this JSON and a suitable code:
    { error: 'All fields are required' } 

 2. If the user's login details are invalid, end the response with this JSON and a suitable code:
    { error: 'Invalid credentials'}. This could be because the user does not exist OR because the password does not match the username.

 3. If the user’s login details are valid, create a session for the user and end the response with this JSON:
    { message: 'Logged in' }

Look at .registerUser() above. Is there anything else you need to do?

Important: lastID is not available to us here, so how can we get the user’s ID to attach it to the session?

You can test it by signing in with the following:
username: test
password: test

hint.md for help.
*/


  try {
    const db = await getDBConnection()

    const user = await db.get('SELECT * FROM users WHERE username = ?', [username])

    if(!user) {
      return res.status(400).json({ error: 'Invalid credentials'})
    }

    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid) {
      return res.status(400).json({ error: 'Invalid credentials'})
    }

    req.session.userId = user.id
    res.json({ message: 'Logged in' })


  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ error: 'Login failed. Please try again.' })
  }
}