import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Apartment from '../models/Apartment';
import { imagesUpload } from '../multer';
import { promises as fs } from 'fs';
import {IApartment, PageLimit, SearchParam, SwitchToString} from '../types';

type QueryParams = SwitchToString<
  Pick<
    IApartment,
    | 'title'
    | 'description'
    | 'numberOfApartments'
    | 'apartmentArea'
    | 'readiness'
    | 'isDeleted'
    | 'category'
  > &
  PageLimit
>;

const apartmentsRouter = express.Router();

apartmentsRouter.get('/', async (req, res, next) => {
  try {
    const { page, limit, ...params }: QueryParams = req.query;

    const l: number = parseInt(limit as string) || 10;
    const p: number = parseInt(page as string) || 1;

    const searchParam = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .reduce<SearchParam>((acc, [key, value]) => {
        if (
          [
            'title',
            'description',
            'apartmentArea',
            'readiness',
            'numberOfApartments',
          ].includes(key)
        ) {
          acc[key] = { $regex: value, $options: 'i' };
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});

    const totalCount = await Apartment.count(searchParam);
    const skip = (p - 1) * l;

    const apartments = await Apartment.find(searchParam, '' +
      'title ' +
      'image ' +
      'cost ' +
      'numberOfApartments ' +
      'readiness ' +
      'apartmentArea ' +
      'description')
      .skip(skip)
      .limit(l);

    return res.send({
      message: 'Apartments are found',
      result: { apartments: apartments, currentPage: p, totalCount },
    });
  } catch (e) {
    return next(e);
  }
});

apartmentsRouter.get('/:id', async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id).populate(
      'category',
      'title',
    );

    if (!apartment) {
      return res.sendStatus(404);
    }

    return res.send(apartment);
  } catch (e) {
    return next(e);
  }
});

apartmentsRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const apartment = await Apartment.create({
        title: req.body.title,
        cost: parseFloat(req.body.cost),
        description: req.body.description,
        category: req.body.category,
        numberOfApartments: parseFloat(req.body.numberOfApartments),
        readiness: req.body.readiness,
        apartmentArea: parseFloat(req.body.apartmentArea),
        image: req.file ? req.file.filename : null,
      });
      return res.send(apartment);
    } catch (e) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }

      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

apartmentsRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const course: HydratedDocument<IApartment> | null = await Apartment.findById(
        req.params.id,
      );

      if (!course) {
        return res.sendStatus(404);
      }

      course.title = req.body.title;
      course.description = req.body.description;
      course.numberOfApartments = parseFloat(req.body.numberOfApartments);
      course.apartmentArea = parseFloat(req.body.apartmentArea);
      course.readiness = req.body.readiness;
      course.cost = parseFloat(req.body.cost);

      if (req.file) {
        course.image = req.file.filename;
      }

      await course.save();
      return res.send(course);
    } catch (e) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }

      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

apartmentsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const removingApartment = await Apartment.findById(req.params.id);

    if (!removingApartment) {
      return res.status(404).send({ error: 'Apartment not found' });
    } else {
      await Apartment.deleteOne({ _id: req.params.id });
      return res.send({ message: 'Deleted' });
    }
  } catch (e) {
    return next(e);
  }
});

apartmentsRouter.patch(
  '/:id/toggleIsDeleted',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const currentApartment = await Apartment.findById(req.params.id);
      if (!currentApartment) {
        return res.status(404).send({ error: 'Apartment not found' });
      }

      if (!currentApartment.isDeleted) {
        await Apartment.updateOne(
          { _id: req.params.id },
          { $set: { isDeleted: true } },
        );
      } else {
        await Apartment.updateOne(
          { _id: req.params.id },
          { $set: { isDeleted: false } },
        );
      }

      return res.send({
        message: `isDeleted status was updated for ${currentApartment.isDeleted}`,
        currentApartment: currentApartment,
      });
    } catch (e) {
      return next(e);
    }
  },
);

export default apartmentsRouter;
