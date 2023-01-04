import express from "express";
import User from '../models/User.js'


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


















}

  
export default new UserController();
