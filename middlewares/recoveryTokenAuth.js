import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()


  async function recoveryTokenAuth(req, res, next){
          const {id, token} = req.params
          const userExists = await User.findById(id)
          if(!userExists){
            res.status(400)
            res.send('User not found')
            return
          }
   
            try {

             await jwt.verify(token, process.env.JWT_SECRET)
             next()
              
            } catch (error) {

              res.status(404)
              res.send('Invalid/Expired Token')
              return
            }   
           next()
          
      
      
      
      
    
      }






export default recoveryTokenAuth