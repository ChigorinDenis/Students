import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faSortAmountDownAlt,
  faSortAmountUpAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { filterStudent } from '../reducers/filterReducer';
import { sortStudent } from '../reducers/sortReducer';
import CustomSelect from './CustomSelect';

const sortTypes = [
  { id: 0, value: 'fio'},
  { id: 1, value: 'rating'},
  { id: 2, value: 'age'},
  { id: 3, value: 'color'},
];

function SearchPanel(props) {
  const { setScreen } = props;
  const { order } = useSelector((state) => state.sort);
  const dispatch = useDispatch();
  const handleSort = (field) => {
    dispatch(sortStudent({ field }));
  }
  const handleSearch = (e) => {
    dispatch(filterStudent(e.target.value));
  }
  const handleOrder = () => {
    if (order === 'asc') {
      dispatch(sortStudent({ order: 'desc'}));
      return;
    }
    dispatch(sortStudent({ order: 'asc'}));
  }
  return (
    <section className='search-panel'>
      <div>
        <h1>Студенты</h1>
        <button
          className="btn"
          onClick={() => setScreen('addStudent')}
        >
          <FontAwesomeIcon 
            icon={faPlus}
          />
          &nbsp;
          Добавить студента
        </button>
      </div>
      <div>
        <div className='input-wrapper left'>
          <input
            type='search'
            name='search'
            placeholder='Поиск по имени'
            onChange={handleSearch}
          />
          <FontAwesomeIcon 
            icon={faSearch}
          />
        </div>
        <div className='input-wrapper right'>
          <CustomSelect
              id='sort'
              name='sort'
              options={sortTypes}
              updateData={handleSort}
              placeholder=''
          />
          <FontAwesomeIcon 
            icon={order === 'asc' ? faSortAmountDownAlt : faSortAmountUpAlt}
            onClick={handleOrder}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchPanel;