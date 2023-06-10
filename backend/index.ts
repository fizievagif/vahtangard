import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import config from "./config";
import usersRouter from "./routers/users";
import categoriesRouter from "./routers/categories";
import apartmentsRouter from "./routers/apartments";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/apartments', apartmentsRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);