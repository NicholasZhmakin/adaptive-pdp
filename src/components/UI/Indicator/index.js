import React from 'react';
import './indicator.scss';


const Indicator = ({icon, name, value}) => {
    return (
        <div className='indicator'>
            {icon}
            <p className='indicator__value'>{value}</p>
            <p className='indicator__name'>{name}</p>
        </div>
    );
}

export default Indicator;