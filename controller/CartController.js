const cart = require('../model/CartModel');
const Pet = require('../model/PetModel');

const addtocart = async (req, res) => {
  try {
    const { pets } = req.body;
    const userid = req.user;
    const data = await cart.findOne({ userid });
    if (data) {
        pets.forEach(j => {
        const exist = data.pets.find(p => p.petid === j.petid);
        
        if (exist) {
            exist.quantityofpets = j.quantityofpets;
        } 
      
        else {
            data.pets.push({
            petid: j.petid,
            quantityofpets: j.quantityofpets
          });
        }
      });

      
      await data.save();
      res.status(200).send({ msg: "Pets added to cart" });

    } 
    else {
      const newCart = new cart({
        userid,
        pets: pets.map(r => ({
          petid: r.petid,
          quantityofpets: r.quantityofpets
        }))
      });
      await newCart.save();
      res.status(200).send({ msg: "Products added to cart" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Internal server error" });
  }
};
const getcart = async (req, res) => {
    try {
        const userid = req.user;
        const Cart = await cart.findOne({ userid });
        let totalprice = 0;
      
        if (Cart) {
            const arr = [];
            for (const item of Cart.pets) {
              const pet = await Pet.findOne({ id: item.petid });
              let totalamt = pet.price * item.quantityofpets;
              totalprice += totalamt;
                if (pet) {
                    arr.push({
                        petid:pet.id,
                        name: pet.name,
                        description: pet.description,
                        price: pet.price,
                        breedtype: pet.breedtype,
                        gender: pet.gender,
                        vaccinated: pet.vaccinated,
                        age: pet.age,
                        image: pet.image,
                        weight:pet.weight,
                        height:pet.height,
                        QuantityOfPets: item.quantityofpets,
                        amount: totalamt
                    });
                }
            }
  
            res.status(200).json({ Subtotal:totalprice,pets: arr });
        } else {
            res.status(404).json({ msg: "Cart not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
  };
  const deletecart = async (req, res) => {
    try {
      const petid = req.params.petid; 
      const userid = req.user;
  
      console.log("User ID:", userid);
      console.log("Pet ID to delete:", petid);
  
      const Cart = await cart.findOne({ userid });
      console.log("Cart found:", Cart);
  
      if (!Cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
  
      const petIndex = Cart.pets.findIndex(pet => pet.petid.toString() === petid); // Ensure petid is compared as a string
      console.log("Pet index in cart:", petIndex);
  
      if (petIndex !== -1) {
        if (Cart.pets.length <= 1) {
          await cart.deleteOne({ userid });
          console.log("Cart deleted because it was the last item.");
          return res.status(200).json({ msg: "Cart deleted Successfully" });
        } else {
          Cart.pets.splice(petIndex, 1);
          await Cart.save();
          console.log("Pet deleted from cart.");
          return res.status(200).json({ msg: "Pet is deleted from cart successfully" });
        }
      } else {
        console.log("Pet not found in the cart.");
        return res.status(404).json({ msg: "Pet not found in the cart" });
      }
    } catch (error) {
      console.error("Error during cart deletion:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  

module.exports = { addtocart, getcart, deletecart };
