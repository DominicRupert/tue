import {BadRequest, Forbidden} from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext.js'


class CarsService{
    async getAll(query = {}){
        return await dbContext.Cars.find(query).populate('creator', 'name picture')
}

async getById(id){
    const car = await dbContext.Cars.findById(id).populate('creator', 'name picture')
    if (!car){
        throw new BadRequest(`Car with id ${id} not found`)
    }
    return car
}
async create(body){
    const car = await dbContext.Cars.create(body)
    return car
}
async edit(update){
    let original = await this.getById(update.id)
    if (original.creator.toString() !== update.creatorId){
        throw new Forbidden('You are not the creator of this car')
    }

    original.make = update.make || original.make
    original.model = update.model || original.model
    original.year = update.year || original.year
    original.color = update.color || original.color
    original.price = update.price || original.price
    original.description = update.description || original.description
    original.imageUrl = update.imageUrl || original.imageUrl
    await original.save()
    return original
}


async remove(id, userId){
    const car = await this.getById(id)
    if (car.creator.toString() !== userId){
        throw new Forbidden('You are not the creator of this car')
    }
    await car.remove()
    return car
}}

export const carsService = new CarsService()