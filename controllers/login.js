const {User} = require('../models/index');
const bcrypt = require('bcryptjs');

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
            const { username, password } = req.body
            // let user = await User.findAll()
            await User.create({ username, password })
            res.redirect("/login")
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getLogin(req, res){
        try {
            res.render('Login')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postLogin(req, res){
        try {
            const { username, password } = req.body
            let user = await User.findOne({ where: { username } })
            // console.log(user.id);
            let userId = user.id
            req.session.userId = userId
            // console.log(req.session);
      
            if(username && username === user.username){
                //  let validatePassword = await bcrypt.compare(password, User.password)
                 let validatePassword = bcrypt.compareSync(password, user.password)
                //  console.log(validatePassword);
                 if (validatePassword){
                    req.session.userId = userId
                    res.redirect(`/profile/${userId}`)
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
            req.session.destroy();
            setTimeout(() => {
                res.redirect('/');
            }, 2000)
        } catch (error) {
            throw error    
        }
    }
};

module.exports = LoginController