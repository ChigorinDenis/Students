import express from 'express';
import cors from 'cors';
import config from 'config';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import Student from './models/Student.js';
import bp from 'body-parser';

const app = express();

app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use('/public', express.static(`public`));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


const PORT = process.env.PORT || config.get('port');

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find({})
      .select({
        _id: 1,
        fio: 1,
        speciality: 1,
        group: 1,
        age: 1,
        rating: 1,
        imagePath: 1,
        color: 1,
      });
    res.status(201);
    res.json({ students })
  } catch (e) {
    console.log(e.message);
  }
});

app.post('/student', async (req, res) => {
  try {
    const { photo } = req.files;
    const imagePath = `./public/${photo.name}`;
    photo.mv(imagePath);
    const student = new Student({
      ...req.body,
      imagePath,
    });
    const data = await student.save();
    res.status(201).json({student: data});
  } catch (e) {
    console.log(e.message);
    res.status(400);
  }
});

app.delete('/student/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    Student.findOne({_id: id}).remove().exec();
    res.status(201).json({message: 'student has been deleted'});
  } catch (e) {
    console.log(e.message);
    res.status(400);
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

async function start() {
  try {
    await mongoose.connect( process.env.MONGODB_URI || config.get('mongooseUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => { console.log(`App has been started on port ${PORT}`)});
  } catch(err) {
    console.log('Server error', err.message);
    process.exit({code: 1});
  }
}

start();