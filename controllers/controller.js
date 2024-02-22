const { Op } = require('sequelize');
const { User, Profile, Category, Car, ProfileCar } = require('../models/index');
// const bcrypt = require('bcryptjs');

class Controller {
    static async admin(req, res){
        try {
            // console.log(req.params);
            let {userId} = req.params
            let {CategoryId} = req.query
            // console.log(req.query, req.params);
            let category = await Category.findAll()
            let data = await Profile.findOne({
                where: {
                    UserId: {
                        [Op.eq]: userId
                    }
                },
                include:{
                    model: ProfileCar,
                    include: Car
                },
                order: [['id', 'asc']]
            })
            let sort = {}
            if(CategoryId){
                sort = {
                    include: [
                        Category, ProfileCar
                    ],
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
            let car = await Car.findAll(sort)
            // console.log(data.UserId);
            // res.send(car)
            res.render('admin', {data, car, category})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async profile(req, res){
        try {
            // console.log(req.params);
            let {userId} = req.params
            let {CategoryId} = req.query
            console.log(req.query, req.params);
            let category = await Category.findAll()
            let data = await Profile.findOne({
                where: {
                    UserId: userId
                },
                include:{
                    model: ProfileCar,
                    include: Car
                },
                order: [['id', 'asc']]
            })
            let car = await Car.findAll({
                include: ProfileCar
            })
            // console.log(data.UserId);
            res.render('profile', {data, car, category})
        } catch (error) {
            console.log(error);
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
            console.log(req.params);
            let {name, CategoryId, carReleased, price, carImage} = req.body
            // console.log(req.body);
            await Car.create({name, CategoryId, carReleased, price, carImage})
            res.redirect('/admin/:userId')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getEditCar(req, res){
        try {
            let {CarId} = req.params
            let data = await Car.findOne({where: {id: CarId}})
            let category = await Category.findAll()
            // res.send(data)
            res.render('edit', {data, category})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postEditCar(req, res){
        try {
            let {CarId, userId} = req.params
            let {name, CategoryId, carReleased, price, carImage} = req.body
            CarId = +CarId
            console.log(req.params);
            await Car.update({name, CategoryId, carReleased, price, carImage}, {where: {id: CarId}})
            res.redirect(`/admin/${userId}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async delete(req, res){
        try {
            let {UserId, CarId} = req.params
            // console.log(req.params);
            let car = await Car.findByPk(CarId);
            let error = []
            if (!car) {
                error.push('Mobil tidak ditemukan');
            }
            console.log(CarId, UserId);
            // await ProfileCar.destroy({where: {CarId: CarId}})
            // await Car.destroy({where: {id: CarId}})
            res.redirect(`/profile/${UserId}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller