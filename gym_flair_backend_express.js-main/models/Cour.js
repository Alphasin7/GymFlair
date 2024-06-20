import mongoose from 'mongoose';
import EquipmentModel from './Equipment.js';

const CourSchema = new mongoose.Schema({
    nom:String,
    capacite:Number,
    date: Date,
    start:Number,
    end:Number,
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coachs'
    },
    reservedBy: [{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        unique: true
    }]
})



const CourModel= mongoose.model("Cours",CourSchema);


export default CourModel;