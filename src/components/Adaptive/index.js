import React from 'react';
import Header from '../Sections/Header';
import Main from '../Sections/Main';
import Footer from '../Sections/Footer';

import './adaptive.scss';


const Adaptive = () => {
    return (
        <div className='adaptive'>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Adaptive;