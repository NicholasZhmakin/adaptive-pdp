import React, { useEffect } from 'react';
import Slider from '@material-ui/core/Slider';

import './TextSettingsSection.scss';


const TextSettingsSection = ({bannerItem, changeBannerItemStylesField}) => {

  const handleChange = (newValue, name) => {
    changeBannerItemStylesField(bannerItem.id, name, `${newValue}px`);
  };


  return (
    <div className='moveable-settings__section-dropDown text-settings-section'>
      Text settings

      Text size
      <Slider
        value={parseInt(bannerItem.styles['font-size'])}
        onChange={(event, value) => handleChange(value, 'font-size')}
        min={6}
        max={120}
      />

    </div>
  );
};

export default TextSettingsSection;