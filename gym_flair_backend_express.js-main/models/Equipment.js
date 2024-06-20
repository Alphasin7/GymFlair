import mongoose from 'mongoose';


const EquipmentSchema = new mongoose.Schema({
    nom: String,
    prix: Number,
    reservedBy: {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        start: Date,
        end: Date
    },
    description:String,
    image:String,
})



const EquipmentModel= mongoose.model("equipments",EquipmentSchema);


export default EquipmentModel;