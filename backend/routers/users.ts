import express from "express";
import {Error} from "mongoose";
import {imagesUpload} from "../multer";
import User from "../models/User";

const usersRouter = express.Router();

usersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      displayName: req.body.displayName,
      password: req.body.password,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();
    await user.save();
    return res.send({message: 'Registered successfully!', user});

  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post(('/sessions'), async (req, res, next) => {
  const user = await User.findOne({username: req.body.username});

  if (!user){
    return res.status(400).send({error: 'Username not found'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch){
    return res.status(400).send({error: 'Password is wrong!'});
  }

  try {
    user.generateToken();
    await user.save();

    return res.send({message: "Username and password correct!", user});
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = {message: 'OK!'};

    if (!token) {
      return res.send(success);
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next();
  }
});

export default usersRouter;