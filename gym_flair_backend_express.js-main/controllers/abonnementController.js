import AbonnModel from '../models/Abonnement.js';

//Show abonnements
export async function showAbonnements(req,res) {
    
    const abonnements = await AbonnModel.find();
        if(abonnements){
            res.json(abonnements);
        }else{
            res.status(404).json({message:"abonnements not found"});
        }
    
}

//create abonnement
export async function create(req, res) {
    try {
        const {title,type}=req.body;
        const abonnement = new AbonnModel({title,type});
        await abonnement.save();
        res.status(201).send('Abonnement added successfully');
    } catch (error) {
        res.status(400).send(error.message)
    }
};



//Show abonnement
export async function showAbonnement(req,res) {
    const {id} = req.params;
    const abonnement = await AbonnModel.findById(id);
        if(abonnement){
            res.json(abonnement);
        }else{
            res.status(404).json({message:"Abonnement not found"});
        }
    
}

//Edit abonnement
export async function editAbonnement (req, res)  {
    const {title,type} = req.body;
    const {id}=req.params;
    try {
        await AbonnModel.findByIdAndUpdate(id, {title,type});
        res.json({ message: "Abonnement updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete abonnement
export async function deleteAbonnement(req,res) {
    try {
       const {id} = req.params;
       await AbonnModel.findByIdAndDelete(id)
       res.send('Abonnement deleted successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
};
