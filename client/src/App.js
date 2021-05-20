import { useState } from 'react';
import ListStudents from './components/ListStudents';
import FormAddStudent from './components/FormAddStudent';
import Header from './components/Header';

function App() {
  const [ screen, setScreen] = useState('listStudents');
  return (
    <div>
      <Header />
      <div className='container'>
        <ListStudents
          screen={screen}
          setScreen={setScreen}
        />
        <FormAddStudent
          screen={screen}
          setScreen={setScreen}
        /> 
      </div>
    </div>
  );
}

export default App;
