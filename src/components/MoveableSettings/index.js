import React from 'react';

import './MoveableSettings.scss';


const MoveableSettings = ({item, changeBannerItemStylesFiled}) => {



    return (
        <div className='moveable-settings'>

            <div className='moveable-settings__text'>

                <input
                    value={parseInt(item.styles['font-size'])}
                    onChange={(e) => changeBannerItemStylesFiled('font-size', e.target.value)}
                />


            </div>


        </div>
    );
}

export default MoveableSettings;