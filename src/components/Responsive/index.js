import React from 'react';
import './responsive.scss';
import Header from './Header';
import Main from './Main';


const Responsive = () => {
    return (
        <div className='responsive'>
            <Header />
            <Main />
        </div>
    );
}

export default Responsive;