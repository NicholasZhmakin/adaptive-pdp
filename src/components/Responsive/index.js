import React from 'react';
import './responsive.scss';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';


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