import React, { useState, useEffect } from 'react';
import Header from './Sections/Header';
import Main from './Sections/Main';
import Footer from './Sections/Footer';

import './adaptive-mobile.scss';



const AdaptiveMobile = () => {

    const [isNavigation, setIsNavigation] = useState(false);

    useEffect(() => {
        if (isNavigation) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isNavigation]);

    return (
        <div className={isNavigation ? 'adaptive-mobile shaded' : 'adaptive-mobile'}>
            <Header
                isNavigation={isNavigation}
                setIsNavigation={setIsNavigation}
            />
            <Main />
            <Footer />
        </div>
    );
}

export default AdaptiveMobile;