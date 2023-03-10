import User from '../models/User.js'
import Recover from '../models/Recover.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class UserController {


  index(req, res) {
    res.json({ title: "First Commit" });
  }

  create(req, res){
      const createAsync = async () => {
      const {username, name, password, email} = req.body
      const userAlreadyExists = await User.findByUsername(username)
  
      if(userAlreadyExists){
        res.status(409)
        res.send('A User with this name/email already exists!')
        return
      }

      User.new(username, name, password, email)
      res.send('User Created!')
    }
  createAsync()
  }

  delete(req, res){
    const {username, password} = req.body
    const response = User.remove(username, password)

    if(response.status === 'Not Found'){
      res.status(404)
      res.send('User not found')
      return
    }

    if(response.status === 'Incorrect Password'){
      res.status(400)
      res.send('Incorrect Password')
      return
    }

    res.send('User deleted successfully!')
  }

 update(req, res){
    const updateAsync = async () => {
    const {username} = req.params
    const {newUsername, name} = req.body
    const usernameAlreadyExists = await User.findByUsername(newUsername)


        if(!usernameAlreadyExists){
          await User.overwrite(username, newUsername, name)
          res.send('Data Updated')
        return 
        }
        res.status(409)
        res.send('Username already in use')
        
    
  }
   updateAsync()
 }

recover(req, res){
  const recoverAsync = async () => {
    const {email} = req.body
    const userExists = await User.findByEmail(email)
    if(!userExists){
      res.status(400)
      res.send('User not found')
      return
    }
  await Recover.generateToken(userExists.id, userExists.email)
  res.send('Recover password link has been sent')



  }
  recoverAsync()
}

change(req, res){

  const changeAsync = async () => {
    const {id} = req.params
    const {newPassword} = req.body
    await User.changePassword(id, newPassword)
  }
  
changeAsync()
res.send('Password Changed!')

}

login(req, res){
  const loginAsync = async () => {
    const {loginField,password} = req.body
    const isValidLogin = await User.isUserValid(loginField)
    
    if(!isValidLogin){
      res.status(400)
      res.send('Invalid/Incorrect Login or Password!')
      return
    }
    const isValidData = await bcrypt.compare(password, isValidLogin.password)
    if(!isValidData){ 
      res.status(400)
      res.send('Invalid/Incorrect Login or Password!')
      return
    }

  
    const acessToken = await jwt.sign({email: isValidLogin.email}, process.env.JWT_SECRET, {expiresIn: '72h'})
    res.send(`${acessToken}`)
   
   
  
  }
  loginAsync()

}



}

  
export default new UserController();
