import express from "express";
import User from '../models/User.js'


class UserController {


  index(req, res) {
    res.json({ title: "First Commit" });
  }

  create(req, res){
    const {username, name, password, email} = req.body
    const userAlreadyExists = User.findByUsername(username)
    if(userAlreadyExists != []){
      res.status(409)
      res.send('A User with this name/email already exists!')
      return
    }
    User.new(username, name, password, email)
    res.send('User Created!')
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


















}

  
export default new UserController();
