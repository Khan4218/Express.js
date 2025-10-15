import validator from 'validator'
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

  console.log(req.body);

}