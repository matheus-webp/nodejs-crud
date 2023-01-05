import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "devmailernode@gmail.com",
      pass: "cxjbknvdibmyzjmy",
    },
  });



class Recovery {
    async generateToken(id, email){

        const payload = {
            id,
            email
        }
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15m'})

        const message = {
            from: "devmailernode@gmail.com",
            to: `${email}`,
            subject: "Recover password",
            text: "Recovery link bellow:",
            html: `<a href="https://localhost:8686/changepassword/${id}/${token}">Click here to change the Password!</a>`
          };
        
          transporter.sendMail(message, (err) => {
            if(err){console.log(err);}
          })
        
        return token
    }
}

export default new Recovery()