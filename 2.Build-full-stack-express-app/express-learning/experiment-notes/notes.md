middleware under the hood
app.use((req, res, next) => {

  console.log('Custom headers added')
  next()

})

app.use((req, res, next) => {

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()

})

