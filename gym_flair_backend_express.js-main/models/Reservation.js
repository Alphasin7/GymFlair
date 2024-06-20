import mongoose from 'mongoose';
import CourModel from './Cour.js';
import UserModel from './User.js';

const ReservationSchema = new mongoose.Schema({
    title:String,
    idCour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourModel'
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
})



const ReservationModel= mongoose.model("reservations",ReservationSchema);


export default ReservationModel;