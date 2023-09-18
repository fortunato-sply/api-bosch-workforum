const User = require('../models/User');
const crypto = require('crypto-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
  static async register(req, res) {
    const { dataEncrypted } = req.body;

    if (!dataEncrypted)
      return res.status(400).send({ message: 'invalid data.' })
    
    const dataDecrypted = crypto.AES.decrypt(dataEncrypted, process.env.SECRET).toString(crypto.enc.Utf8);
    const data = JSON.parse(dataDecrypted);

    if (!data.username || !data.password || !data.email || !data.name)
      return res.status(400).send({ message: 'invalid data.' })

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  
      const user = {
        username: data.username,
        name: data.name,
        email: data.email,
        password: hashedPassword
      }

      await User.create(user);
      return res.status(200).send({ message: 'Successfull!' })
    }
    catch (err) {
      return res.status(500).send({ message: `Error: ${err}` })
    }
  }

  static async login(req, res) {
    const { dataEncrypted } = req.body;

    if (!dataEncrypted)
      return res.status(400).send({ message: 'invalid data.' })

    const dataDecrypted = crypto.AES.decrypt(dataEncrypted, process.env.SECRET).toString(crypto.enc.Utf8);
    const data = JSON.parse(dataDecrypted);
    if (!data.username || !data.password)
      return res.status(400).send({ message: 'invalid data.' })

    const user = await User.findOne({ username: data.username });

    const hasValidUser = user != null && user != undefined;
    if (!hasValidUser)
      return res.status(400).send({ message: 'invalid user and/or password.' });

    const hasValidPassword = await bcrypt.compare(data.password, user.password);
    if (!hasValidPassword)
      return res.status(400).send({ message: 'invalid user and/or password.' });

      console.log(hasValidPassword);
    try {
      const secret = process.env.SECRET;
      const token = jwt.sign({
        id: user._id
      },
        secret,
        {
          expiresIn: '1 day'
        });

      return res.status(200).send({ token: token });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}

module.exports = UserController;