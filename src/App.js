import React, { useState } from 'react';
import AdaptiveMobile from './components/AdaptiveMobile';
import Responsive from './components/Responsive';


const App = () => {

  const [activeDesign, setActiveDesign] = useState(1);

  return (
    <div className='App'>
      {activeDesign === 2 ?
        <AdaptiveMobile /> :
        <Responsive />
      }
    </div>
  );
}

export default App;
