import express from 'express'
import bcrypt from 'bcryptjs'


// const password = 'skywalker96'
// const hashed = await bcrypt.hash(password, 10)
// console.log(hashed);


const userInput = {
    name: 'Luke Skywalker',
    password : '$2b$10$pyzxk19lHZbx/aGmjbVGeOswnmX7lwxnDg2RQUhnOSMhFeRYaXtSq'
}

const loginAttempt = {
    name: 'Luke Skywalker',
    password: 'skywalker96'
}

const compare = await bcrypt.compare(userInput.password, loginAttempt.password)

console.log(compare) // true


const app = express()

app.listen(8000, () => console.log('listening 8000'))