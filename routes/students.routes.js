import { Router } from 'express';
import Student from '../models/Student.js';

const router = Router();

router.get('/students', async (req, res) => {
  console.log('роут запускался');
  try {
    const students = await Student.find({});
    
    res.status(201).json({ students });
  } catch (e) {
    
  }

});

router.post('/student', async (req, res) => {
  try {
    const {fio, rating } = req.body;
    // const student = new Student({ fio, rating});
    // student.save();
    console.log(req.body);
    res.status(201).json({message: 'student has been added'});
  } catch (e) {
    res.status(400);
  }
});
router.delete('/student/:id', async (req, res) => {
  try {
    const { id } = req.param;
    const student = new Student({ fio, rating});
    student.save();
    res.status(201).json({message: 'student has been added'});
  } catch (e) {
    res.status(400);
  }
});

export default router;