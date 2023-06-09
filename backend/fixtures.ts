import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Category from './models/Category';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [admin, user] = await User.create(
    {
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'Admin',
      password: 'adminadmin1',
      token: crypto.randomUUID(),
      phoneNumber: '+996555555555',
      role: 'admin',
      avatar: null,
      verified: true,
    },
    {
      email: 'user@gmail.com',
      firstName: 'Walter',
      lastName: 'White',
      password: 'useruser1',
      token: crypto.randomUUID(),
      phoneNumber: '+996550902644',
      avatar: null,
      verified: true,
    },
    {
      email: 'user1@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'useruser1',
      token: crypto.randomUUID(),
      phoneNumber: '+996550902645',
      avatar: null,
      verified: true,
    },
    {
      email: 'user2@gmail.com',
      firstName: 'Tony',
      lastName: 'Stark',
      password: 'useruser1',
      token: crypto.randomUUID(),
      phoneNumber: '+996550902646',
      avatar: null,
      verified: true,
    },
  );

  const [multiStoreyHouse, privateHouse] = await Category.create(
    {
      title: 'Высокоэтажные дома',
      description:
        'Высокоэтажные дома - здания, которые имеют три и более этажей, рассчитанные на постоянное проживание определенного количества семей.',
      image: 'fixtures/multi.jpg',
      isDeleted: false,
    },
    {
      title: 'Частные дома',
      description:
        'Частный дом — отдельно стоящее жилое строение, которое может быть выполнено из самых разных видов материалов.',
      image: 'fixtures/private.jpg',
      isDeleted: false,
    },
  );

  await db.close();
};

void run();
