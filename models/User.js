import knex from '../database/db.js'
import bcrypt from 'bcrypt'

class User {

    async findByUsername(username){
        const response =  await knex.select().where({username}).table('users')

        if(response.length > 0){
            return response[0]
        }
        return false
    }



    async new (username, name, password, email){
        const hashedPassword = await bcrypt.hash(password, 10)
        await knex.insert({username, name, password: hashedPassword, email}).table('users')
    }
    
    async remove(username, password){
        const userFound = await this.findByUsername(username)
        if(!userFound){
            return {status: 'Not Found'}
        }
    
        const pwdMatch = await bcrypt.compare(password, userFound.password)
        if(!pwdMatch){
            return {status: 'Incorrect Password'}
        }
        await knex.delete().where({username}).table('users')
     
    }

    async overwrite(username, newUsername, name){
        await knex.update({username: newUsername, name}).where({username}).table('users')
    }

 



} 

export default new User()