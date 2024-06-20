import CourModel from '../models/Cour.js';

//Show cours
export async function showCours(req,res) {
    
    try {
        const courses = await CourModel.find({}).populate('reservedBy').populate('coach').lean().exec();

        courses.forEach(course => {
            course.count = course.reservedBy.length
            const userExists = course.reservedBy.some(user => {
                return user._id.equals(req.userId);
            });
            course.booked = userExists
            delete course.reservedBy;
        });
        
        res.status(200).json({courses})
    } catch (error) {
        res.status(500).json({"message": "Server error"})
        console.error("Error:", error);
    }
    
}

//create cour
export async function create(req, res) {
    try {
        const { nom, capacite, date, start, end, coach }=req.body;
        const cour = new CourModel({nom, capacite, date, start, end, coach});
        await cour.save();
        res.status(200).json({message: "yes"});
    } catch (error) {
        res.status(400).json({message: "error"});
    }
};

export async function reserveCours(req, res) {
    const { courseId } = req.body
    try {
        const updatedCourse = await CourModel.findByIdAndUpdate(
            courseId,
            { $push: { reservedBy: req.userId } },
            { new: true }
        ).exec();
        
        if (!updatedCourse) {
            res.status(400).json({"message": "failed to book course"})
            console.log("Course not found.");
            return;
        }
        res.status(200).json({"message": "success"})
        console.log("Course updated:", updatedCourse);
    } catch (error) {
        res.status(500).json({"messgae": "Server error"})
        console.error("Error:", error);
    }
}

//Show cour
export async function showCour(req,res) {
    const {id} = req.body;
    const cour = await CourModel.findById(id).populate('reservedBy').populate('coach').lean().exec();
        if(cour){
            res.json({
                _id: cour._id,
                capacite: cour.capacite,
                count: cour.reservedBy.length,
                nom: cour.nom,
                date: cour.date,
                start: cour.start,
                end: cour.end,
                coach: cour.coach
            });
        }else{
            res.status(404).json({message:"Cour not found"});
        }
    
}

//Edit cour
export async function editCour (req, res)  {
    const {id,nom,capacite,date,start,end,coach} = req.body;
    console.log(req.body)
    try {
        await CourModel.findByIdAndUpdate(id, {nom,capacite,date,start,end,coach});
        res.json({ message: "Cour updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "error"});
    }
};

//delete cour
export async function deleteCour(req,res) {
    try {
       const {id} = req.body;
       await CourModel.findByIdAndDelete(id)
       res.json({message: "yes"})
    } catch (error) {
        res.json({message: "error"})
    }
};
