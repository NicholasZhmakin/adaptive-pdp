import React, { useState } from 'react';
import { ClickAwayListener } from '@material-ui/core';
import { SketchPicker } from 'react-color';
import { COLOR_TYPE } from '../index';

import './SolidGenerator.scss';


const SolidGenerator = ({currentSolidColor, handleBackgroundObjectChange, textColor}) => {

  const [isColorPicker, setIsColorPicker] = useState(false);

  const handleChangeColor = (color) => {
    if (textColor) {
      handleBackgroundObjectChange(color, 'color');
    } else {
      handleBackgroundObjectChange(COLOR_TYPE.SOLID, color);
    }
  };

  return (
    <div className='solid-generator'>
      <div
        className='solid-generator__preview'
        style={{background: currentSolidColor}}
        onClick={() => setIsColorPicker(true)}
      />

      <input
        value={currentSolidColor}
        onChange={(event) => handleChangeColor(event.target.value)}
      />

      {isColorPicker &&
        <ClickAwayListener onClickAway={() => setIsColorPicker(false)}>
          <div className='solid-generator__color-picker'>
            <SketchPicker
              color={currentSolidColor}
              onChange={((color) => handleChangeColor(color.hex))}
              onAccept={() => setIsColorPicker(false)}
              onCancel={() => setIsColorPicker(false)}
            />
          </div>
        </ClickAwayListener>
      }
    </div>
  );
};

export default SolidGenerator;