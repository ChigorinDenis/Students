import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons'

function CustomSelect(props) {
  const {
    options,
    placeholder,
    type = 'default',
    name,
    formik,
    updateData
  } = props;
  const [initialValue, setInitialValue] = useState('');
  const [show, onShow] = useState(false);
  const handleChangeValue = (value) => {
    setInitialValue(value);
    onShow(false);
  };
  const buildDefaultOptions = () => {
    return (
      show && <div className='option-box'>
        {
          options.map(({ id, value }) => (
            <div
              key={id}
              onClick={() => {
                handleChangeValue(value);
                formik && formik.setFieldValue(name, value);
                updateData && updateData(value);                             
              }}
              className='option'
              role='list'
            >
              {value}
              <FontAwesomeIcon 
                icon={faCheck}
                className='option-marker'
              />
            </div>
          ))
        }
      </div>
    );
  };
  const buildColorOptions = () => {
    return (
      show && <div className='option-box-color'>
        {options.map(({ id, value}) => (
          <div
            key={id}
            onClick={() => {
              handleChangeValue(value);
              formik.setFieldValue(name, value);
            }}
            className={`option-color ${value}`} />
        ))}         
      </div>
    );
  };
  const mapBuildOptions = {
    default: buildDefaultOptions,
    color: buildColorOptions,
  };
  const buildOptions = mapBuildOptions[type];

  return (
    <div className='custom-select'>
      <input
        name={name}
        type='text'
        value={initialValue}
        onClick={() => onShow(!show)}
        placeholder={placeholder}
        readOnly
      />
      <FontAwesomeIcon 
        icon={faCaretDown}
        className='custom-select-caret'
      />
      {buildOptions()}
    </div>
  );
}

export default CustomSelect;