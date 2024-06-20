import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const UserSchema = new mongoose.Schema({
    username: String,
    birth: Date,
    email: String,
    password: String,
    photo: String, // Champ pour contenir l'URL de l'image de l'utilisateur
    role: { type: String, enum: ['admin', 'employe', 'adherant'] }, // Champ pour spécifier le rôle de l'utilisateur
})

UserSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)
    }
    next();
})

const UserModel= mongoose.model("users",UserSchema);


export default UserModel;