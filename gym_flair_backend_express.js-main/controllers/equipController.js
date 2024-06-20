import EquipmentModel from '../models/Equipment.js';

//Show equipments
export async function showEquipments(req, res) {
    try {
      const equipments = await EquipmentModel.find();
  
      for (let i = 0; i < equipments.length; i++) {
        const equipment = equipments[i];
        
        if (equipment.reservedBy && equipment.reservedBy.end) {
          const currentDate = new Date();
          const endDate = new Date(equipment.reservedBy.end);
          
          if (endDate < currentDate) {
            equipment.reservedBy = null;
            await equipment.save();
          } 
        } 
      }
      
      const availableEquipments = equipments.map(equipment => {
        var val 
        if (!equipment.reservedBy.end) {
          val=false
        } else if(equipment.reservedBy.user == req.userId) {
          
          val = true
        } else {
          val = false
        }
        return {_id: equipment._id, nom: equipment.nom, image: equipment.image,
          prix: equipment.prix, description: equipment.description, isYou: val}
      });
      res.status(200).json(availableEquipments);
    } catch (error) {
      console.error('Error fetching and updating equipments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export async function allShowEquipments(req, res) {
    try {
      // Fetch equipments with user populated if reservedBy.user is not null
      const equipments = await EquipmentModel.find()
      let data = []
      // Transform the reservedBy field
      for (let i=0; i<equipments.length; i++) {
        let equipment = equipments[i]
        if (equipment.reservedBy.end) {
          const currentDate = new Date();
          const endDate = new Date(equipment.reservedBy.end);
          
          if (endDate < currentDate) {
            console.log(endDate)
            console.log(currentDate)
            equipment.reservedBy = {};
            await equipment.save();
          }
        }
        if(equipment.reservedBy.end){
          await equipment.populate('reservedBy.user', 'username')
        }
        const reservedByText = formatReservedBy(equipment.reservedBy);
        data=[...data, {
           id: equipment._id,
           nom: equipment.nom,
           prix: equipment.prix, 
           reservation: reservedByText,
           desc: equipment.description,
           image: equipment.image
          }] 
      }
      res.json(data);
    } catch (error) {
      console.error('Error fetching equipments:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  const formatReservedBy = (reservedBy) => {
    if (!reservedBy || !reservedBy.start || !reservedBy.end) {
      return 'Not reserved';
    }
    const start = new Date(reservedBy.start);
    const end = new Date(reservedBy.end);
    const duration = (end - start) / (1000 * 60 * 60); // duration in hours
  
    return `${reservedBy.user.username} reserved on ${start.toDateString()} for ${duration} hours`;
  };

 

export default async function reserveEquipment(req, res) {
    try {
        console.log(req.body)
        const { equipmentId, start, end } = req.body;
    
        // Find the equipment by ID
        const equipment = await EquipmentModel.findById(equipmentId);
        if (!equipment) {
          return res.status(404).json({ error: 'Equipment not found' });
        }
    
        // Update the reservedBy field with user ID and reservation dates
        const dstart = new Date(start) 
        const dend = new Date(end)
        dstart.setHours(dstart.getHours()+1)
        dend.setHours(dend.getHours()+1)
        equipment.reservedBy = {
          user: req.userId,
          start: dstart,
          end: dend
        };
        // Save the updated equipment
        await equipment.save();
        res.status(200).json({ message: 'Equipment reserved successfully' });
      } catch (error) {
        console.error('Error reserving equipment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


//create equipment
export async function create(req, res) {
    try {
        if(req.file) {
          const { nom, description, prix } = req.body;
          const equipement = new EquipmentModel({ nom, description, image:req.file.filename, prix });
          await equipement.save();
          res.status(201).json({message: "success"})
        } else {
          res.json({message: "failed"})
        }
    } catch (error) {
        res.status(400).json({message: "error"})
    }
};



//Show equipment
export async function showEquipment(req,res) {
    const { id } = req.body;
    const equipment = await EquipmentModel.findById(id);
        if(equipment){
          const data= {
             id: equipment._id,
             nom: equipment.nom,
             prix: equipment.prix, 
             description: equipment.description,
             image: equipment.image
            }
            res.json(data);
        }else{
            res.status(404).json({message:"Equipment not found"});
        }
    
}

//Edit equipment
export async function editEquipment (req, res)  {
  try {
    let { nom, prix, currentImage, description, id } = req.body;
    if(req.file) {
      console.log(req.file.filename)
      currentImage = req.file.filename
    }
    // Find the equipment by ID and update the specified fields
    const updatedEquipment = await EquipmentModel.findByIdAndUpdate(
        id,
        {
            $set: {
                nom,
                prix,
                image: currentImage,
                description
            }
        },
        { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedEquipment) {
        return res.status(404).json({ message: 'Equipment not found' });
    }

    res.json(updatedEquipment);
} catch (error) {
    console.error('Error updating equipment:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
}
};

//delete equipment
export async function deleteEquipment(req,res) {
    try {
       const {id} = req.body;
       await EquipmentModel.findByIdAndDelete(id)
       res.json({message: "yes"})
    } catch (error) {
        res.status(400).send(error.message)
    }
};
