import React from 'react';
import Header from '../Sections/Header';
import Main from '../Sections/Main';
import Footer from '../Sections/Footer';

import './responsive.scss';


const Responsive = () => {
    return (
        <div className='responsive'>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Responsive;