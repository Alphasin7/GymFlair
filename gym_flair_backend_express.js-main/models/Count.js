import mongoose from 'mongoose';


const CountSchema = new mongoose.Schema({
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
   
})



const CountModel = mongoose.model("Count",CountSchema);


export default CountModel;