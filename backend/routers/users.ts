import express from "express";
import mongoose, {Error} from "mongoose";
import {imagesUpload} from "../multer";
import User from "../models/User";
import {randomUUID} from "crypto";
import {downloadFile} from "../helper";
import config from "../config";
import {OAuth2Client} from "google-auth-library";
import path from "path";
import fs from "fs";
import auth, {RequestWithUser} from "../middleware/auth";

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : null,
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

usersRouter.post('/sessions', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({ error: 'Email не найден!' });
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({ error: 'Неверный email и/или пароль' });
  }

  try {
    user.generateToken();
    await user.save();
    return res.send({ message: 'Email and password correct!', user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = { message: 'OK' };

    if (!token) {
      return res.send(success);
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Wrong Google token!' });
    }

    const email = payload['email'];
    const googleId = payload['sub'];
    const firstName = payload['given_name'];
    const lastName = payload['family_name'];
    const avatarUrl = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data' });
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      const avatar =
        'images/' + (await downloadFile(avatarUrl as string, 'images'));

      user = new User({
        email,
        password: randomUUID(),
        firstName,
        lastName,
        avatar,
        googleId,
      });
    }

    user.generateToken();
    await user.save();
    return res.send({ message: 'Login with Google successful', user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.patch(
  '/',
  auth,
  imagesUpload.single('avatar'),
  async (req, res, next) => {
    try {
      const { user } = req as RequestWithUser;

      if (!user) {
        return res
          .status(500)
          .send({ error: 'Учетная запись пользователя не найдена!' });
      }

      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

      if (req.file) {
        if (user.avatar) {
          const imagePath = path.join(config.publicPath, user.avatar);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error('Error removing avatar:', err);
            }
          });
        }
        user.avatar = req.file.filename;
      }

      await user.save();

      return res.send({
        message: 'Информация пользователя обновлена!',
        user,
      });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

usersRouter.post('/change-password', auth, async (req, res, next) => {
  try {
    const { user } = req as RequestWithUser;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const isMatch = await user.checkPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).send({ error: 'Текущий пароль указан неверно' });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .send({ error: 'Пароль подтверждения не совпадает с новым паролем' });
    }

    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!regex.test(newPassword)) {
      return res.status(400).send({
        error:
          'Пароль должен содержать минимум 8 символов, из них минимум 1 букву и 1 цифру.',
      });
    }

    user.password = newPassword;
    await user.generateToken();
    await user.save();
    return res.send({
      message: 'Password has been changed successfully',
      result: user,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

usersRouter.patch('/remove-avatar', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.avatar) {
      const imagePath = path.join(config.publicPath, user.avatar);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error removing avatar:', err);
        }
      });

      user.avatar = null;
      await user.save();
    }

    return res.send({ message: 'Avatar removed successfully!', user });
  } catch (error) {
    return next(error);
  }
});

usersRouter.patch(
  '/add-avatar',
  auth,
  imagesUpload.single('avatar'),

  async (req, res, next) => {
    try {
      const user = (req as RequestWithUser).user;

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      user.avatar = req.file ? req.file.filename : null;
      await user.save();

      return res.send({ message: 'Avatar uploaded successfully!', user });
    } catch (error) {
      return next(error);
    }
  },
);

export default usersRouter;