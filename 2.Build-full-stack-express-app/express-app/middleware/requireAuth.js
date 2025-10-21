export function requireAuth(req, res, next) {

  if(!req.session.userId){

    console.log('access denied please log in')

    res.status(401).json({error: 'Unauthorized' })
  }

  next()

}