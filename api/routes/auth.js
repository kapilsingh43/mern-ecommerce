const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

//REGISTER
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser)
      throw new Error('Username occupied!');
    
    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    !user && res.status(401).json("Wrong credentials!");

    const userPasswordHash = user.password; 
    const passwordValid = await bcrypt.compare(password, userPasswordHash);
    if (!passwordValid)
      throw new Error('Invalid Password!');

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password:userPassword, ...others } = user._doc;

    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
