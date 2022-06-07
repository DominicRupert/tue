import mongoose from 'mongoose';
const Schema = mongoose.Schema



export const CarSchema = new Schema({
    make: {type: String, required: true},
    model: {type: String, required: true},
    year: {type: Number, required: true, min: 1900, max: 2022},
    price: {type: Number, required: true, min: 0},
    description: {type: String, default: 'no description'},
    imgUrl: {type: String, default: 'http://thiscatdoesnotexist.com/'},
}, { timestamps: true, toJSON: { virtuals: true } })


CarSchema.virtual('creator',{
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

