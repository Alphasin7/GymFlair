import CoachModel from '../models/Coach.js';

//Show coachs
export async function showCoachs(req,res) {
    
    const coachs = await CoachModel.find();
        if(coachs){
            res.json(coachs);
        }else{
            res.status(404).json({message:"Coachs not found"});
        }
    
}

//create coach
export async function create(req, res) {
    try {
        if (req.file) {
            const {firstname, lastname,email,phone,speciality}=req.body;
            const coach = new CoachModel({firstname, lastname,email,phone,photo: req.file.filename ,speciality});
            await coach.save();
            res.status(201).json({message: "yes"});
        } else {
            res.json({message: "failed"})
        }
    } catch (error) {
        res.status(400).json({message: "error"})
    }
};



//Show coach
export async function showCoach(req,res) {
    const {id} = req.body;
    const coach = await CoachModel.findById(id);
        if(coach){
            res.json(coach);
        }else{
            res.status(404).json({message:"Coach not found"});
        }
    
}

//Edit coach
export async function editCoach (req, res)  {
    let {id,firstname, lastname,email,phone,currentImage,speciality} = req.body;
    if (req.file){
        currentImage = req.file.filename
    }
    try {
        await CoachModel.findByIdAndUpdate(id, {firstname, lastname,email,phone,photo: currentImage,speciality});
        res.json({ message: "Coach updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete coach
export async function deleteCoach(req,res) {
    try {
       const {id} = req.body;
       await CoachModel.findByIdAndDelete(id)
       res.json({message: "yes"})
    } catch (error) {
        res.json({message:"error"})
    }
};
