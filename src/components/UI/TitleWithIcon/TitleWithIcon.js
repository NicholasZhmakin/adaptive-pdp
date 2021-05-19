import React from 'react';
import './titleWithIcon.scss';


const TitleWithIcon = ({text, icon}) => {
    return (
        <div className='title-with-icon'>
            <h3 className='title-with-icon__text'>{text}</h3>
            {icon}
        </div>
    );
}

export default TitleWithIcon;