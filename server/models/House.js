import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const HouseSchema = new Schema({
    floors: { type: Number, required: true },
    rooms: { type: Number, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true, min: 1900, max: 2022 },
    imgUrl: { type: String, default: "http://thiscatdoesnotexist.com/" },
    creatorId: { type: Schema.Types.ObjectId, ref: "Account" },}, { timestamps: true, toJSON: { virtuals: true } });

    HouseSchema.virtual('creator', {
        localField: 'creatorId',
        ref: 'Account',
        foreignField: '_id',
        justOne: true
    });