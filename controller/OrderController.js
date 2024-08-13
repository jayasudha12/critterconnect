const Order = require('../model/OrderModel');
const User = require('../model/UserModel');
const Cart = require('../model/CartModel');
const Pet = require('../model/PetModel');
const { v4: uuidv4 } = require('uuid');

const createOrder = async (req, res) => {
  try {
    const { name, address, phoneno } = req.body;
    const userId = req.user;

   
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ userid: userId });

    
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: 'User not found' });
    }
    if (!cart) {
      console.log("Cart not found for user ID:", userId);
      return res.status(404).json({ message: 'Cart not found' });
    }
    if (!Array.isArray(cart.pets)) {
      console.log("Cart pets is not an array for user ID:", userId);
      return res.status(400).json({ message: 'Cart pets is not an array' });
    }

    let totalAmt = 0;

    
    for (const item of cart.pets) {
      console.log("Processing cart item:", item);

      const pet = await Pet.findOne({ id: item.petid });
      if (!pet) {
        console.log(`Pet with ID ${item.petid} not found`);
        return res.status(404).json({ message: `Pet with ID ${item.petid} not found` });
      }

      totalAmt += pet.price * item.quantityofpets;
    }

   
    const newOrder = new Order({
      orderid: uuidv4(),
      userid: userId,
      name: name || user.name,
      email: user.email,
      address: address || user.address,
      phoneno: phoneno || user.phoneno,
      pets: cart.pets,
      totalamount: totalAmt,
      orderdate: new Date(),
      estimatedate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), 
      orderstatus: 'Pending', 
    });

    await newOrder.save();
    await Cart.findOneAndDelete({ userid: userId });

    res.status(201).send({ msg: "Order placed successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getorder = async (req, res) => {
  try {
      const userid = req.user;
      const orders = await Order.find({ userid }); 

      if (orders.length === 0) {
          return res.status(404).json({ msg: "No orders found" });
      }

      const allOrders = await Promise.all(orders.map(async (order) => {
          const petsDetails = [];
          for (const item of order.pets) {
              const pet = await Pet.findOne({ id: item.petid });

              if (pet) {
                  petsDetails.push({
                      name: pet.name,
                      description: pet.description,
                      price: pet.price,
                      breedtype: pet.breedtype,
                      gender: pet.gender,
                      vaccinated: pet.vaccinated,
                      age: pet.age,
                      image: pet.image,
                      quantityofpets: item.quantityofpets,
                  });
              } else {
                  console.log(`Pet with ID ${item.petid} not found`);
              }
          }

          return {
              orderid: order.orderid,
              name: order.name,  
              address: order.address,
              phoneno: order.phoneno,
              pets: petsDetails,
              totalamount: order.totalamount,
              orderdate: order.orderdate,
              estimatedate: order.estimatedate,
              orderstatus: order.orderstatus,
          };
      }));

      res.status(200).json(allOrders);
  } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
  }
};


module.exports = { createOrder,getorder };
