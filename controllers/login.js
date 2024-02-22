const {User, Profile} = require('../models/index');
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
      
            if(username === user.username){
                //  let validatePassword = await bcrypt.compare(password, User.password)
                 let validatePassword = bcrypt.compareSync(password, user.password)
                //  console.log(validatePassword);
                 if(validatePassword){
                     req.session.userId = user.id
                     req.session.role = user.role
                     console.log(user.role);
                    switch (user.role) {
                        case 'Admin':
                            res.redirect(`/admin/${user.id}`)
                            break;
                        case 'User':
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
};

module.exports = LoginController