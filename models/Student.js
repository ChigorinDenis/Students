import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
  fio: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  age: {
    type: Number,
  },
  speciality: {
    type: String,
  },
  group: {
    type: String,
  },
  color: {
    type: String,
  },
  sex: {
    type: String,
  },
  email: {
    type: String,
  },
  imagePath: {
    type: String,
  }
});

export default model('Student', schema);