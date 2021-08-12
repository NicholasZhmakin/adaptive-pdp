import React, { useState } from 'react';
import AdaptiveMobile from './components/AdaptiveMobile';
import Responsive from './components/Responsive';
import MoveableComponent from './components/MoveableComponent/index';
import AddCreatePreview from "./components/AddCreatePreview";


const App = () => {

  const [activeDesign, setActiveDesign] = useState(2);

  return (
    <div className='App'>
        <AddCreatePreview />
      {/*{activeDesign === 2 ?*/}
      {/*  <AdaptiveMobile /> :*/}
      {/*  <Responsive />*/}
      {/*}*/}
    </div>
  );
}

export default App;
