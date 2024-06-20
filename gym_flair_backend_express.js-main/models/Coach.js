import mongoose from 'mongoose';


const CoachSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone:String,
    speciality:String,
    photo: String, // Champ pour contenir l'URL de l'image de l'utilisateur
})


const CoachModel= mongoose.model("coachs",CoachSchema);


export default CoachModel;