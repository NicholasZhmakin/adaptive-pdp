import React, {useEffect, useState} from 'react';
import { ClickAwayListener } from '@material-ui/core';
import { PhotoshopPicker } from 'react-color';

import './SolidGenerator.scss';


const SolidGenerator = ({bannerItem, changeBannerItemStylesField}) => {

  const [isColorPicker, setIsColorPicker] = useState(false);
  const [selectedSolidColor, setSelectedSolidColor] = useState(bannerItem.styles['background']);
  const [tempSolidColor, setTempSolidColor] = useState('#ffffff');

  useEffect(() => {
    const background = bannerItem.styles['background'];

    if (background.includes('gradient') || background === 'none') {
      setTempSolidColor('#ffffff');
      setSelectedSolidColor('#ffffff')
    } else {
      setTempSolidColor(background);
      setSelectedSolidColor(background)
    }
  }, [bannerItem]);

  const handleAcceptSolidColor = () => {
    setIsColorPicker(false);
    setSelectedSolidColor(tempSolidColor.hex);
    changeBannerItemStylesField(bannerItem.id, 'background', tempSolidColor.hex)
  };

  const handleChangeColor = (color) => {
    setSelectedSolidColor(color);
  };

  return (
    <div className='solid-generator'>
      <div
        className='solid-generator__preview'
        style={{background: selectedSolidColor}}
        onClick={() => setIsColorPicker(true)}
      />

      <input
        value={selectedSolidColor}
        onChange={(event) => handleChangeColor(event.target.value)}
      />

      {isColorPicker &&
        <ClickAwayListener onClickAway={() => setIsColorPicker(false)}>
          <div className='solid-generator__color-picker'>
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

export default SolidGenerator;