import ReservationModel from '../models/Reservation.js';



//create reservation
export async function create(req, res) {
    try {
        const {title,idCour,idUser}=req.body;
        const reservation = new ReservationModel({title,idCour,idUser});
        await reservation.save();
        res.status(201).send('Reservation added successfully');
    } catch (error) {
        res.status(400).send(error.message)
    }
};



//Show reservation
export async function showReservation(req,res) {
    const {id} = req.params;
    const reservation = await ReservationModel.findById(id);
        if(reservation){
            res.json(reservation);
        }else{
            res.status(404).json({message:"Reservation not found"});
        }
    
}

//Edit reservation
export async function editReservation (req, res)  {
    const {title,idCour,idUser} = req.body;
    const {id}=req.params;
    try {
        await ReservationModel.findByIdAndUpdate(id, {title,idCour,idUser});
        res.json({ message: "Reservation updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete reservation
export async function deleteReservation(req,res) {
    try {
       const {id} = req.params;
       await ReservationModel.findByIdAndDelete(id)
       res.send('Reservation deleted successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
};
