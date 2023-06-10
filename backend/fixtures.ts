import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Category from './models/Category';
import Apartment from "./models/Apartment";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('apartments');
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

  const [house1, house2, house3, house4] = await Apartment.create(
    {
      title: 'Чуйская обл, р-н Кок-Джар с, ул. Уметалиева (9.3 км до центра)',
      cost: 0,
      description: `Дом новый, свежий ремонт по дизайн проекту. Рядом ресторан Супара, ТРЦ Фрунзе, заправки и аптеки, частный дет сад и школа.`,
      category: privateHouse._id,
      numberOfApartments: 4,
      readiness: 'done',
      apartmentArea: 150,
      image: 'fixtures/house1.jpeg',
      isDeleted: false,
    },
    {
      title: 'Чуйская обл, р-н Чон-Арык с, ул. Эшпай (3865.1 км до центра)',
      cost: 90000,
      description: `Это мансардный дом с интересной планировкой и просторными комнатами.На первом этаже дома расположены кухня и спальня, а также холл, обеспечивающий уютную атмосферу. На втором этаже находятся три спальни и коридор. `,
      category: privateHouse._id,
      numberOfApartments: 4,
      readiness: 'done',
      apartmentArea: 100,
      image: 'fixtures/house2.jpeg',
      isDeleted: false,
    },
    {
      title: 'ул. А. Токомбаева и ул. Байтик Баатыра.',
      cost: 900000,
      description: `Это новый проект бизнес-класса с исключительно привлекательным местоположением в любимой столице: неподалеку от Южных Ворот.`,
      category: multiStoreyHouse._id,
      numberOfApartments: 140,
      readiness: 'in developing',
      apartmentArea: 1250,
      image: 'fixtures/house3.jpg',
      isDeleted: false,
    },
    {
      title: 'Не дом, а сказка!',
      cost: 300000,
      description: `Text Text Text Text Text Text`,
      category: multiStoreyHouse._id,
      numberOfApartments: 110,
      readiness: 'almost done',
      apartmentArea: 950,
      image: 'fixtures/house3.jpg',
      isDeleted: false,
    },
  );

  await db.close();
};

void run();
