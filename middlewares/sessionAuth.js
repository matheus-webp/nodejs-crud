import jwt from 'jsonwebtoken'


async function sessionAuth(req, res, next){
   const authToken = req.headers['authorization']

   if(!authToken){
    res.status(403)
    res.send('Invalid Authentication')
    return
   }

   const bearer = authToken.split(' ')
   const token = bearer[1]

   try {
    await jwt.verify(token, process.env.JWT_SECRET)
    next()
   } catch (error) {
    res.status(403)
    res.send('Invalid Authentication')
    return
   }
   
  
  


}

export default sessionAuth