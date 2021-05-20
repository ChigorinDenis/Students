import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import CustomSelect from './CustomSelect';
import InputAva from './InputAva';
import axios from 'axios';

const specialities = [
  { id: 0, value: 'Прикладная математика'},
  { id: 1, value: 'Прикладная информатика'},
  { id: 2, value: 'Компьютерная графика'},
];
const colors = [
  { id: 0, value: 'blue'},
  { id: 1, value: 'red'},
  { id: 2, value: 'green'},
  { id: 3, value: 'yellow'}, 
  { id: 4, value: 'black'},
  { id: 5, value: 'orange'},
  { id: 6, value: 'lgbt'},
];
const groups = [
  { id: 0, value: 'Пи-101'}
];
const sexs = [
  { id: 0, value: 'Мужской'},
  { id: 1, value: 'Женский'}
];

const AddStudentSchema = yup.object().shape({
  photo: yup.mixed().required('A file is required'),
  fio: yup.string()
    .matches(/\D/, 'Введено не корректное значение')
    .required('Поле не должно быть пустым'),
  email: yup.string().email('Invalid email')
    .required('Поле не должно быть пустым'),
  rating: yup.number('Поле должно быть числовым'),
  age: yup.number('Поле должно быть числовым'),
});

function FormAddStudent(props) {
  const { screen, setScreen } = props;
  const show = screen === 'addStudent';
  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.entries(values).map(([name, value]) =>  formData.append(name, value));
    try { 
      const response = await axios({
        method: 'post',
        url:'/student',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('res', response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      fio: '',
      email: '',
      speciality: '',
      rating: '',
      group: '',
      sex: '',
      color: '',
      age: '',
      photo: '',
    },
    validationSchema: AddStudentSchema,
    onSubmit: handleSubmit
  });
  return (
    show && <>
      <a
        className='back'
        href='/#'
        onClick={(e) => {
          e.preventDefault();
          setScreen('listStudents')
        }}
      > 
        <FontAwesomeIcon icon={faArrowLeft} />
        &nbsp;
        Назад к списку студентов
      </a>
      <h1>Новый студент</h1>
      <form  
        onSubmit={formik.handleSubmit}
      >
        <InputAva
          id='ava'
          className='ava'
          formik={formik}
        />
        <section className='add-student'>
          <div className='form-control'>
            <label>ФИО</label>
            <input
              name='fio'
              placeholder='Введите ФИО'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.fio && formik.touched.fio && <span className='in-valid'>{formik.errors.fio}</span>}
          </div>
          <div className='form-control'>
            <label>Email</label>
            <input
              name='email'
              placeholder='Введите email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && <span className='in-valid'>{formik.errors.email}</span>}
          </div>
          <div className='form-control'>
            <label>Специальность</label>
            <CustomSelect
              id='speciality'
              name='speciality'
              formik={formik}
              options={specialities}
              placeholder='Выберите специальность'
            />
          </div>
          <div className='form-control'>
            <label>Группа</label>
            <CustomSelect
              id='group'
              name='group'
              formik={formik}
              options={groups}
              placeholder='Выберите группу'
            />
          </div>
          <div className='form-control'>
            <label>Рейтинг</label>
            <input
              name='rating'
              placeholder='Введите рейтинг'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rating && formik.touched.rating && <span className='in-valid'>{formik.errors.rating}</span>}
          </div>
          <div className='form-control'>
            <label>Пол</label>
            <CustomSelect
              id='sex'
              name='sex'
              formik={formik}
              options={sexs}
              placeholder='Выберите группу'
            />
          </div>
          <div className='form-control'>
            <label>Возраст</label>
            <input
              name='age'
              placeholder='Введите возраст'
              onChange={formik.handleChange}
            />
          </div>
          <div className='form-control'>
            <label>Цвет</label>
            <CustomSelect
              id='color'
              name='color'
              type='color'
              formik={formik}            
              options={colors}
              placeholder='Выберите цвет'
            />
          </div>
        </section>
        <button
          type='submit'
          className='btn btn-create'
        >
          Создать
        </button>
      </form>
    </>
  );
}

export default FormAddStudent;
