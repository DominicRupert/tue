import  {Auth0Provider} from '@bcwdev/auth0provider'
import {carsService} from '../services/CarsService.js'
import BaseController from '../utils/BaseController.js'
import { logger } from '../utils/Logger.js'


export class CarsController extends BaseController{
    constructor(){
        super('api/cars')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.remove)
    }

    async getAll(req, res, next){
        try{
            logger.log ('[QUERY]', req.query)
            const cars = await carsService.getAll(req.query)
            return res.send(cars)
        }
        catch(error){
            logger.error(error)
            next(error)
        }
    }



    async getById(req, res, next){
        try{
            const car = await carsService.getById(req.params.id)
            return res.send(car)
        }
        catch(error){
            logger.error(error)
            next(error)
        }
    }

    async create(req, res, next){
        try{
            req.body.creatorId = req.userInfo.id
            const car = await carsService.create(req.body)
            return res.send(car)

        } catch(error){
            logger.error(error)
            next(error)
        }
}
async edit(req, res, next){
    try{
        req.body.id = req.params.id
        req.body.creatorId = req.userInfo.id
        const car = await carsService.edit( req.body)
        return res.send(car)
    }
    catch(error){
        logger.error(error)
        next(error)
    }


}
async remove(req, res, next){
    try{
        const car = await carsService.remove(req.params.id, req.userInfo.id)
        return res.send(car)
    }
    catch(error){
        logger.error(error)
        next(error)
    }
}
}

