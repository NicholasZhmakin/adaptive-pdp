import React, { useState } from 'react';
import AdaptiveMobile from './components/AdaptiveMobile';
import Responsive from './components/Responsive';
import MoveableComponent from './components/MoveableComponent/index';
import AdCreatePreview from "./components/AdCreatePreview";


const App = () => {

  const [activeDesign, setActiveDesign] = useState(2);

  return (
    <div className='App'>
        <AdCreatePreview />
      {/*{activeDesign === 2 ?*/}
      {/*  <AdaptiveMobile /> :*/}
      {/*  <Responsive />*/}
      {/*}*/}
    </div>
  );
}

export default App;
