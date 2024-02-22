const express = require('express')
const Controller = require('../controllers/controller')
const LoginController = require('../controllers/login')
const router = express.Router()


//=========middleware================
function login(req, res, next) {
// console.log('User:', User)
// console.log(req.session, "============");
if(req.session.userId){
    req.params.userId = req.session.userId
    // console.log('hiii');
    next()
} else {
    res.redirect(`/login`)
}
}

router.get('/', (req, res) => {
    res.render('Landing')
  })
  
router.get('/register', LoginController.getRegister)  
router.post('/register', LoginController.postRegister)
router.get('/login', LoginController.getLogin)
router.post('/login', LoginController.postLogin)
router.get('/logout', LoginController.logout)

router.get('/home', (req, res) => {
res.render(`home`)
})

router.get('/admin/:userId',login, Controller.admin)
router.get('/profile/:userId', login, Controller.profile)
// router.get('/cars',login, Controller.getAllCars)
router.get('/cars/add/:ProfileId',login, Controller.getAddCar)
router.post('/cars/add/:ProfileId',login, Controller.postAddCar)
router.get('/cars/edit/:CarId',login, Controller.getEditCar)
router.post('/cars/edit/:CarId',login, Controller.postEditCar)
router.get('/cars/detail/:CarId',login, Controller.detailCar)
router.get('/cars/:CarId/delete/:UserId',login, Controller.delete)

router.get('/dummy', (req,res)=>{
  res.render('profileAdmin')
})


router.get('/dummy2', (req,res)=>{
  res.render('profileUser')
})

module.exports = router