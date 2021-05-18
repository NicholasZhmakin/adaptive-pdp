import React, { useState } from 'react';
import Adaptive from './components/Adaptive';
import Responsive from './components/Responsive';


const App = () => {

  const [activeDesign, setActiveDesign] = useState(2);

  return (
    <div className='App'>
      {activeDesign === 1 ?
        <Adaptive /> :
        <Responsive />
      }
    </div>
  );
}

export default App;
