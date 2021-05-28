import React from 'react';
import Header from './Sections/Header';
import Main from './Sections/Main';

import './adaptive-mobile.scss';



const AdaptiveMobile = () => {
    return (
        <div className='adaptive-mobile'>
            <Header />
            <Main />
        </div>
    );
}

export default AdaptiveMobile;