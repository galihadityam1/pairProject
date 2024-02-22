const express = require('express')
const Controller = require('../controllers/controller')
const LoginController = require('../controllers/login')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('Landing')
  })
  
  router.get('/register', LoginController.getRegister)  
  router.post('/register', LoginController.postRegister)
  router.get('/login', LoginController.getLogin)
  router.post('/login', LoginController.postLogin)

  router.get('/logout', LoginController.logout)
  
  //=========middleware================
  function login (req, res, next) {
    // console.log('User:', User)
    console.log(req.session);
    if(req.session.userId){
        next()
    } else {
        res.redirect(`/login`)
    }
  }
  
  router.get('/home', (req, res) => {
    res.render(`home`)
  })
// router.get('/login', LoginController.login)

// router.use((req, res, next) => {
//     console.log(req.session, '<<<<<');
//     console.log(`Time ${Date.now()}`, '<<<<<');
    // if(req.session.userId){
    //     next()
    // } else {
    //     res.redirect(`/login`)
    // }
// })

router.get('/cars', Controller.getAllCars)
router.get('/cars/add', Controller.getAddCar)
router.post('/cars/add', Controller.postAddCar)
router.get('/profile/:userId', Controller.profile)
router.get('/cars/edit/:CarId', Controller.getEditCar)
router.post('/cars/edit/:CarId', Controller.postEditCar)
router.get('/cars/detail/:CarId', Controller.detailCar)
router.get('/cars/:CarId/delete', Controller.delete)

router.get('/dummy', (req,res)=>{
  res.render('profileAdmin')
})


router.get('/dummy2', (req,res)=>{
  res.render('profileUser')
})

module.exports = router