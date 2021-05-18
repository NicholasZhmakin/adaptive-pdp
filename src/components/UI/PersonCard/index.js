import React from 'react';
import './personCard.scss';


const PersonCard = ({name, position}) => {
    return (
        <div className='person-card'>
            <img className='person-card__img' src={'http://thispersondoesnotexist.com/image?'} alt='person' />

            <div className='person-card__text'>
                <div className='person-card__main-info'>
                    <h4>{name}</h4> - <h4>{position}</h4>
                </div>
                <div className='person-card__other-info'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                </div>
            </div>

        </div>
    );
}

export default PersonCard;