const Pet = require('../model/PetModel');
const { v4: uuidv4 } = require('uuid');

const addpet = async (req, res) => {
    try {
        const { name, pettype, breedtype, gender, vaccinated, age, description, price, image,weight,height } = req.body;
        const userId = req.user; 
    
        const newPet = new Pet({
          id : uuidv4(),
          userid : userId,
          name,
          pettype,
          breedtype,
          gender,
          vaccinated,
          age,
          description,
          price,
          image,
          weight,
          height
        });
    
        await newPet.save();
        res.status(201).json({ msg: 'Pet added successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
      }
    
};

const getPetsByUser = async (req, res) => {
    try {
        const userId = req.user; 
        const pets = await Pet.find({ userid: userId });

        if (pets.length === 0) {
            return res.status(404).json({ msg: 'No pets found for this user' });
        }

        res.status(200).json(pets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};


const getpet = async (req, res) => {
    try {
        const { pettype } = req.params; 
        
        let pets;
        if (pettype === 'Other') {
            pets = await Pet.find({ pettype: { $nin: ['Dog', 'Cat'] } });
        } else {
            pets = await Pet.find({ pettype });
        }

        if (pets.length === 0) {
            return res.status(404).json({ msg: 'No pets found for this type' });
        }

        res.status(200).json(pets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const editpet = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, pettype, breedtype, gender, vaccinated, age, description, price, image, weight, height } = req.body;

        const updatedPet = await Pet.findOneAndUpdate(
            { id, userid: req.user },
            { name, pettype, breedtype, gender, vaccinated, age, description, price, image, weight, height },
            { new: true }
        );

        if (updatedPet) {
            res.status(200).json({ msg: "Pet updated successfully", pet: updatedPet });
        } else {
            res.status(404).json({ msg: "Pet not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

const deletepet = async (req, res) => {
    try {
        const { id } = req.params;
        const petdata = await Pet.findOne({ id, userid: req.user });
        if (petdata) {
            await Pet.deleteOne({ id });
            res.status(200).send({ msg: "Pet details deleted successfully!!" });
        } else {
            res.status(404).send({ msg: "Pet details not found or not authorized to delete" });
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal server error" });
    }
}

module.exports = {addpet,getpet,getPetsByUser,editpet,deletepet}