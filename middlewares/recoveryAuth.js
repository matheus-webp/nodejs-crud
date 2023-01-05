import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()


  async function recoveryAuth(req, res, next){
       
          console.log('chegou no começo do middleware');
          const {id, token} = req.params
          const userExists = await User.findById(id)
          if(!userExists){
            res.status(400)
            res.send('User not found')
            return
          }
          console.log('chegou antes do try');
            try {
              console.log('parou no verify');
             await jwt.verify(token, process.env.JWT_SECRET)
             next()
              
            } catch (error) {
              console.log('Deu erro no middleware');
              res.status(404)
              res.send('Invalid/Expired Token')
              return
            }   
           next()
          
      
      
      
      
    
      }






export default recoveryAuth