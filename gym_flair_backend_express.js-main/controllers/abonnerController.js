import AbonnerModel from '../models/Abonner.js';



//create subscribe
export async function create(req, res) {
    try {
        const {etat,idAbonn,idUser}=req.body;
        const cour = new AbonnerModel({etat,idAbonn,idUser});
        await cour.save();
        res.status(201).send('Cour added successfully');
    } catch (error) {
        res.status(400).send(error.message)
    }
};



//Show abonner
export async function showAbonner(req,res) {
    const {id} = req.params;
    const abonner = await AbonnerModel.findById(id);
        if(abonner){
            res.json(abonner);
        }else{
            res.status(404).json({message:"abonner not found"});
        }
    
}

//Edit abonner
export async function editAbonner (req, res)  {
    const {etat,idAbonn,idUser} = req.body;
    const {id}=req.params;
    try {
        await AbonnerModel.findByIdAndUpdate(id, {etat,idAbonn,idUser});
        res.json({ message: "Abonner updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete abonner
export async function deleteAbonner(req,res) {
    try {
       const {id} = req.params;
       await AbonnerModel.findByIdAndDelete(id)
       res.send('Abonner deleted successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
};
