import React,{ useState } from 'react';

function InputAva(props) {
  const { id, formik } = props;
  const [ urlImage, setUrlImage ] = useState('');
  const handleOnchange = (e) => {
    const [file] = e.target.files;
    setUrlImage(URL.createObjectURL(file));
    formik.setFieldValue('photo', file);
  }
  return (
    <section className='input-ava'>
      <img
        src={urlImage}
        alt='ФП'
      />
      <div className='input-ava-control'>
        <label htmlFor={id}>Сменить аватар</label>
        <span>500x500</span>
        <input
          id={id}
          name='photo'
          type='file'
          accept='image/*'
          onChange={handleOnchange}
        />
      </div>
    </section>
  );
}

export default InputAva;