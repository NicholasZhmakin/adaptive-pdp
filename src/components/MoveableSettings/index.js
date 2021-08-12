import React from 'react';

import './MoveableSettings.scss';


const MoveableSettings = ({item, changeBannerItemStyles}) => {



    return (
        <div className='moveable-settings'>

            <div className='moveable-settings__text'>

                <input
                    value={parseInt(item.styles['font-size'])}
                    onChange={(e) => changeBannerItemStyles('font-size', e.target.value)}
                />


            </div>


        </div>
    );
}

export default MoveableSettings;