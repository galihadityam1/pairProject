const {User, Profile} = require('../models/index');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

class LoginController{
    static async getRegister(req, res){
        try {
            res.render('Register')
        } catch (error) {
            console.log(error);
            res.send(error)
        } 
    }

    static async postRegister(req, res){
        try {
            const { username, password, name, gender, userImage, email, role } = req.body
            // console.log(req.body);
            let data = await User.create({ username, password, role })
            let UserId = data.id
            await Profile.create({name, UserId, gender, userImage, email})
            res.redirect("/login")
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getLogin(req, res){
        try {
            // console.log(req.query);
            let {error} = req.query
            res.render('Login', {error})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postLogin(req, res){
        try {
            const { username, password } = req.body
            let user = await User.findOne({ 
                include: Profile,
                where: { username } })
            // console.log();
            // res.send(user)
            if(username === user.username){
                //  let validatePassword = await bcrypt.compare(password, User.password)
                 let validatePassword = bcrypt.compareSync(password, user.password)
                //  console.log(validatePassword);
                 if(validatePassword){
                     req.session.userId = user.id
                     req.session.role = user.role
                    //  console.log(user.role);
                    switch (user.role) {
                        case 'Admin':
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                // sendMail: true,
                                auth: {
                                  user: 'akuninibuatnyobanode@gmail.com',
                                  pass: 'ofev ogoo cojz qmde'
                                },
                                // port: 465,
                                host: "smtp.gmail.com",
                                // secure: false
                              });
                            async function main() {
                            const info = await transporter.sendMail({
                                from: 'akuninibuatnyobanode@gmail.com',
                                to: `${user.Profile.email}`,
                                subject: "Login Success",
                                text: "Your Login was successful",
                            });
                        
                                console.log("Message sent: %s", info.messageId);
                            }
                            main().catch(console.error);
                            res.redirect(`/admin/${user.id}`)
                            break;
                        case 'User':
                            const usertransporter = nodemailer.createTransport({
                                service: 'gmail',
                                // port: 465,
                                host: "smtp.gmail.com",
                                // secure: false,
                                auth: {
                                  user: 'akuninibuatnyobanode@gmail.com',
                                  pass: 'ofev ogoo cojz qmde'
                                },
                              });
                            async function mail() {
                            const info = await usertransporter.sendMail({
                                from: 'akuninibuatnyobanode@gmail.com',
                                to: `${user.Profile.email}`,
                                subject: "Login Success",
                                text: "Your Login was successful",
                            });
                        
                                console.log("Message sent: %s", info.messageId);
                            }
                            mail().catch(console.error);
                            res.redirect(`/profile/${user.id}`)
                            break;
                    }
                 }else{
                    let error = "invalid username/password"
                    res.redirect(`/login?error=${error}`)
                 }
             }else{
                let error = "invalid username/password"
                res.redirect(`/login?error=${error}`)
             }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async logout(req, res){
        try {
            await req.session.destroy();
            res.redirect("/");
        } catch (error) {
            throw error    
        }
    }

};

module.exports = LoginController