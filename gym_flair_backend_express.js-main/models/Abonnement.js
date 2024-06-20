import mongoose from 'mongoose';


const AbonnSchema = new mongoose.Schema({
    title:String,
    type: String,
})



const AbonnModel = mongoose.model("abonnements",AbonnSchema);

export default AbonnModel;