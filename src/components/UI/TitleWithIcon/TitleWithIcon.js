import React from 'react';
import './titleWithIcon.scss';


const TitleWithIcon = ({text, icon, handleClick}) => {
    return (
        <div
            className='title-with-icon'
            onClick={handleClick}
        >
            <h3 className='title-with-icon__text'>{text}</h3>
            {icon}
        </div>
    );
}

export default TitleWithIcon;