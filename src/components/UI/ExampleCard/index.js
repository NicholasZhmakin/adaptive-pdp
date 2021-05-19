import React from 'react';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import './exampleCard.scss';


const ExampleCard = ({name}) => {
    return (
        <div className='example-card'>
            <div className='example-card__left-block'>
                <img className='example-card__img' src={'https://picsum.photos/150/200'} alt='example' />
            </div>

            <div className='example-card__right-block'>
                <div className='example-card__main-info'>
                    <WallpaperIcon className='example-card__icon' />
                    <h4>{name}</h4>
                </div>

                <div className='example-card__other-info'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                </div>

                <button className='example-card__btn'>
                    learn more
                </button>
            </div>
        </div>
    );
}

export default ExampleCard;