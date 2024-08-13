const Wishlist = require('../model/WishlistModel');
const Pet = require('../model/PetModel');

const addToWishlist = async (req, res) => {
  try {
    const { petId } = req.body; 
    const userId = req.user; 

    let wishlist = await Wishlist.findOne({ userId });

    if (wishlist) {
      const petExists = wishlist.pets.find(p => p.petId === petId);
      
      if (petExists) {
        return res.status(400).json({ msg: 'Pet is already in the wishlist' });
      }

      wishlist.pets.push({ petId });
      await wishlist.save();
      res.status(200).json({ msg: 'Pet added to wishlist' });
    } else {
      wishlist = new Wishlist({
        userId,
        pets: [{ petId }]
      });
      await wishlist.save();
      res.status(200).json({ msg: 'Wishlist created and pet added' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user; 
    
    const wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      return res.status(404).json({ msg: 'Wishlist not found' });
    }

    const petDetails = await Promise.all(
      wishlist.pets.map(async (item) => {
        const pet = await Pet.findOne({ id: item.petId }, 'name vaccinated age breedtype description pettype id image price');
        return pet;
      })
    );

    res.status(200).json({ wishlist: petDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const petId = req.params.petId;
    const userId = req.user;

    const userWishlist = await Wishlist.findOne({ userId });

    if (!userWishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    const petIndex = userWishlist.pets.findIndex(pet => pet.petId.toString() === petId);

    if (petIndex === -1) {
      return res.status(404).json({ message: 'Pet not in wishlist' });
    }

    userWishlist.pets.splice(petIndex, 1);

    await userWishlist.save();

    res.status(200).json({ message: 'Pet removed from wishlist' });
  } catch (error) {
    console.error('Error removing pet from wishlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
