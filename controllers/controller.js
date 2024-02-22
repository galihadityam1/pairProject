const { Op } = require('sequelize');
const { User, Profile, Category, Car, ProfileCar } = require('../models/index');
// const bcrypt = require('bcryptjs');

class Controller {
    static async profile(req, res){
        try {
            let {userId} = req.params
            console.log(userId);
            let data = await Profile.findAll({
                include:{
                    model: ProfileCar,
                    include: Car
                },
                order: [['id', 'asc']]
            })
                res.send(data)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getAllCars(req, res){
        try {
            // console.log(req.query);
            let {CategoryId} = req.query
            let category = await Category.findAll()
            let sort = {}
            if(CategoryId){
                sort = {
                    include: Category,
                    where: {
                        CategoryId: {
                            [Op.eq]: CategoryId
                        }
                    }
                }
            } else {
                sort = {
                    include: Category
                }
            }
            let data = await Car.findAll(sort)
            // res.send(data);
            res.render('cars', {data, category})
        } catch (error) {
            console.log(error.message);
            res.send(error)
        }
    }

    static async detailCar(req, res){
        try {
            let {CarId} = req.params
            let data = await Car.findOne({where: {id: CarId}, include: Category})
            // res.send(data)
            res.render('carDetail', {data})
        } catch (error) {
            console.log(error.message);
            res.send(error)
        }
    }

    static async getAddCar(req, res){
        try {
            let category = await Category.findAll()
            // console.log(category);
            res.render("add", {category})
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postAddCar(req, res){
        try {
            let {name, CategoryId, carReleased, price, carImage} = req.body
            // console.log(req.body);
            await Car.create({name, CategoryId, carReleased, price, carImage})
            res.redirect('/cars')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getEditCar(req, res){
        try {
            let {CarId} = req.params
            let data = await Car.findOne({where: {id: CarId}})
            res.send(data)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postEditCar(req, res){
        try {
            let {CarId} = req.params
            let {name, CategoryId, carReleased, price, carImage} = req.body
            await Car.update({name, CategoryId, carReleased, price, carImage}, {where: {id: CarId}})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async delete(req, res){
        try {
            let {UserId, CarId} = req.params
            let car = await Car.findByPk(CarId);
            let error = []
            if (!car) {
                error.push('Mobil tidak ditemukan');
            }
            // await Car.destroy({where: {id: CarId}})
            res.redirect(`/cars/?error=${error}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller