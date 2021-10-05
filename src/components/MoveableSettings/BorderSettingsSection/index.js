import React from 'react';
import SolidGenerator from '../ColorSettingsSection/SolidGenerator';
import './BorderSettingsSection.scss';
import Slider from '@material-ui/core/Slider';


const BorderSettingsSection = ({bannerItem, changeBannerItemStylesField}) => {

  const handleChange = (newValue, name) => {
    changeBannerItemStylesField(name, newValue);
  };

  return (
    <div className='moveable-settings__section-dropDown border-settings-section'>
      Border settings
      <SolidGenerator
        currentSolidColor={bannerItem.styles['border-color']}
        handleBackgroundObjectChange={(newValue) => handleChange(newValue, 'border-color')}
        textColor
      />

      <Slider
        value={parseInt(bannerItem.styles['border-width'])}
        onChange={(event, value) => handleChange(`${value}px`, 'border-width')}
        min={0}
        max={10}
      />

      <Slider
        value={parseInt(bannerItem.styles['border-radius'])}
        onChange={(event, value) => handleChange(`${value}vh`, 'border-radius')}
        min={0}
        step={0.1}
        max={5}
      />
    </div>
  );
};

export default BorderSettingsSection;