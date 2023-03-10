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

    async findByEmail(email){
        const response =  await knex.select().where({email}).table('users')
     
        if(response.length > 0){
            return response[0]
        }
        return false
    }

    async findById(id){
        const response =  await knex.select().where({id}).table('users')
     
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

    async changePassword(id, newPassword){
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await knex.update({password: hashedPassword}).where({id}).table('users')
    }

    async isUserValid(loginField){
        const validUsername = await this.findByUsername(loginField)
        const validEmail = await this.findByEmail(loginField)

        if(!validUsername && !validEmail){
            return false
        }
        if(!validUsername && validEmail){
            return validEmail
        }
        if(validUsername && !validEmail){
            return validUsername
        }
    }

 



} 

export default new User()