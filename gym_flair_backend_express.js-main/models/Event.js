import mongoose from 'mongoose';


const EventSchema = new mongoose.Schema({
    nom:String,
    date: Date,
    desc: String,
    start:Number,
    photo: String,
    reservedBy: [{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        unique: true
    }]
})



const EventModel = mongoose.model("Event",EventSchema);


export default EventModel;