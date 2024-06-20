import mongoose from 'mongoose';
import EquipmentModel from './Equipment.js';

const AbonnerSchema = new mongoose.Schema({
    etat:String,
    idAbonn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AbonnModel'
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
})



const AbonnerModel= mongoose.model("abonner",AbonnerSchema);


export default AbonnerModel;