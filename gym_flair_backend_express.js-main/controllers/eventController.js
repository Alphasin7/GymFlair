import EventModel from "../models/Event.js";

export async function getEvents(req,res) {
try {
        const events = await EventModel.find({}).populate('reservedBy').lean().exec();

        events.forEach(event => {
            event.count = event.reservedBy.length
            const userExists = event.reservedBy.some(user => {
                return user._id.equals(req.userId);
            });
            event.booked = userExists
            delete event.reservedBy;
        });
        
        res.status(200).json({events})
    } catch (error) {
        res.status(500).json({"message": "Server error"})
        console.error("Error:", error);
    }
    
}

export async function getEvent(req,res) {
    const { id } = req.body
    try {
            const event = await EventModel.findById(id).populate('reservedBy').lean().exec();
            res.status(200).json({
                _id: event._id,
                nom: event.nom,
                date: event.date,
                desc: event.desc,
                start:event.start,
                photo: event.photo,
                count: event.reservedBy.length
            })
        } catch (error) {
            res.status(500).json({"message": "Server error"})
            console.error("Error:", error);
        }
        
    }

export async function createEvent(req, res) {
    
    try {
        let { nom, date, start, photo, desc } = req.body;
        if (req.file) {
            photo = req.file.filename
        }
        const cour = new EventModel({nom, date, start, photo, desc});
        await cour.save();
         
        res.status(200).json({message: "yes"});
    } catch (error) {
        res.status(400).json({message: "error"})
    }
}

export async function editEvent(req, res) {
    try {
        let { id,nom, date, start, photo, desc }=req.body;
        if (req.file) {
            photo = req.file.filename
        }
        await EventModel.findByIdAndUpdate(id,{nom, date, start, photo, desc})
        
        res.status(200).json({message: "yes"});
    } catch (error) {
        res.status(400).json({message: "error"})
    }
}

export async function deleteEvent(req, res) {
    const {id} = req.body
    try {
        await EventModel.findByIdAndDelete(id)
        res.json({message: "yes"})
    }catch(e) {
        res.json({message: "error"})
    }
}

export async function reserveEvent(req, res) {
    const { eventId } = req.body
    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(
            eventId,
            { $push: { reservedBy: req.userId } },
            { new: true }
        ).exec();
        
        if (!updatedEvent) {
            res.status(400).json({"message": "failed to join event"})
            console.log("event not found.");
            return;
        }
        res.status(200).json({"message": "success"})
        console.log("event updated:", updatedEvent);
    } catch (error) {
        res.status(500).json({"messgae": "Server error"})
        console.error("Error:", error);
    }
}