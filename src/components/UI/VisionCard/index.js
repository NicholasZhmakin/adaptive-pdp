import React from 'react';
import './visionCard.scss';


const VisionCard = ({name, imgSrc}) => {
    return (
        <div className='vision-card'>
            <img className='vision-card__img' src={process.env.PUBLIC_URL + imgSrc} alt='vision-icon' />
            <h4 className='vision-card__title'>{name}</h4>
            <p className='vision-card__text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
        </div>
    );
}

export default VisionCard;