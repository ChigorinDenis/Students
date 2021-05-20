import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { orderBy } from 'lodash';
import SearchPanel from './SearchPanel';
import { addStudent, removeStudent} from '../reducers/studentReducer'

const buildRow = (cb) => (data) => {
  const {
    _id,
    fio,
    rating,
    age,
    speciality,
    group,
    color, 
    imagePath,
  } = data;
  return (
    <tr key={_id}>
      <td>
        <img
          className='ava'
          src={`/${imagePath}`} 
          alt='text'
        />
      </td>
      <td>{fio}</td>  
      <td>{speciality}</td>
      <td>{group}</td>
      <td>{age}</td>
      <td>{rating}</td>
      <td>
        <span
          className={`color ${color}`} 
        />
      </td>
      <td>
        <FontAwesomeIcon
          className='btn-delete'
          icon={faTrashAlt}
          onClick={cb(_id)}
        />
      </td>
    </tr>
  );
};



function ListStudent(props) {
  const students = useSelector((state) => state.students);
  const filter = useSelector((state) => state.filter);
  const {field, order} = useSelector((state) => state.sort);
  const result = orderBy(students, [field], [order])
    .filter((student) => student.fio.includes(filter));
  const dispatch = useDispatch();
  const { screen, setScreen } = props;
  const show = screen === 'listStudents';
  const handleClick = (id) => async () => {
    try {
      await axios.delete(`/student/${id}`);
      dispatch(removeStudent({ _id: id }));
    } catch (e) {
      console.log(e.message);
    }
  }
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get('/students');
        const students  = [...response.data.students];
        students.map((student) => dispatch(addStudent(student)));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();    
  }, []);
  return (
    show && <>
    <SearchPanel setScreen={setScreen} />
    <table className='students'>
      <thead>
        <tr>
          <th></th>
          <th>ФИО</th>
          <th>Специальность</th>
          <th>Группа</th>
          <th>Возраст</th>
          <th>Рейтинг</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {result && result.map(buildRow(handleClick))}
      </tbody>
    </table>
    </>
  );
}

export default ListStudent;