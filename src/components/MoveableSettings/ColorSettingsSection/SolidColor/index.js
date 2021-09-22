import React, { useState } from 'react';
import { ClickAwayListener } from '@material-ui/core';
import { PhotoshopPicker } from 'react-color';


const SolidColor = ({bannerItem, changeBannerItemStylesField}) => {

  const [isColorPicker, setIsColorPicker] = useState(false);
  const [selectedSolidColor, setSelectedSolidColor] = useState(bannerItem.styles['background-color']);
  const [tempSolidColor, setTempSolidColor] = useState({});

  const handleAcceptSolidColor = () => {
    setIsColorPicker(false);
    setSelectedSolidColor(tempSolidColor.hex);
    changeBannerItemStylesField(bannerItem.id, 'background-color', tempSolidColor.hex)
  };

  const handleChangeColor = (color) => {
    setSelectedSolidColor(color);
  };

  return (
    <div className='color-settings-section__solid'>
      <div
        className='color-settings-section__solid-preview'
        style={{background: selectedSolidColor}}
        onClick={() => setIsColorPicker(true)}
      />

      <input
        value={selectedSolidColor}
        onChange={(event) => handleChangeColor(event.target.value)}
      />

      {isColorPicker &&
        <ClickAwayListener onClickAway={() => setIsColorPicker(false)}>
          <div className='color-settings-section__solid-color-picker'>
            <PhotoshopPicker
              color={tempSolidColor}
              onChange={((color) => setTempSolidColor(color))}
              onAccept={handleAcceptSolidColor}
              onCancel={() => setIsColorPicker(false)}
            />
          </div>
        </ClickAwayListener>
      }
    </div>
  );
};

export default SolidColor;