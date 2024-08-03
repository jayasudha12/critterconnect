const Pet = require('../model/PetModel');
const { v4: uuidv4 } = require('uuid');

const addpet = async (req, res) => {
    try {
        const {name,pettype,breed,gender,vaccinated,age,description,price} = req.body;
        const newPet = new Pet({
            petid:uuidv4(),
            name,
            pettype,
            breed,
            gender,
            vaccinated,
            age,
            description,
            price

           
        });
        await newPet.save();
        res.status(201).send({msg:"Product added successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Internal server error' });
    }
};

module.exports = {addpet}