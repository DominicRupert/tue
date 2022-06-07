import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";

class HousesService{
    async getAll(query = {}){
        return await dbContext.Houses.find(query).populate('creator', 'name picture')
    }
    async getById(id){
        const house = await dbContext.Houses.findById(id).populate('creator', 'name picture')
        if(!house) {throw new BadRequest(`House with id ${id} not found`)}
        return house
}

    async create(body){
        const house = await dbContext.Houses.create(body)
        return house
    }

    async edit(update){
        let original = await this.getById(update.id)
        if(original.creatorId.toString() != update.creatorId){
            throw new Forbidden(`You are not allowed to edit this house`)
        }
        original.floors = update.floors || original.floors
        original.rooms = update.rooms || original.rooms
        original.price = update.price || original.price
        original.year = update.year || original.year
        original.imgUrl = update.imgUrl || original.imgUrl
        await original.save()
        return original

    
    
    
    }
    async remove(id, userId){
        const house = await this.getById(id)
        if(house.creatorId.toString() != userId){
            throw new Forbidden(`You are not allowed to delete this house`)
        }
        await dbContext.Houses.findByIdAndRemove(id)
    }
}

export const housesService = new HousesService()