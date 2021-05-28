import React, { useState } from 'react';
import Header from './Sections/Header';
import Main from './Sections/Main';

import './adaptive-mobile.scss';



const AdaptiveMobile = () => {

    const [isNavigation, setIsNavigation] = useState(false);

    return (
        <div className={isNavigation ? 'adaptive-mobile shaded' : 'adaptive-mobile'}>
            <Header
                isNavigation={isNavigation}
                setIsNavigation={setIsNavigation}
            />
            <Main />
        </div>
    );
}

export default AdaptiveMobile;