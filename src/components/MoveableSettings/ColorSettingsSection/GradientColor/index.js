import React, {useEffect, useState} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { ClickAwayListener } from '@material-ui/core';
import { PhotoshopPicker } from 'react-color';
import DraggableRange from './DraggableRange';
import {v4 as uuidv4} from 'uuid';



const GradientColor = ({bannerItem}) => {

  const [isColorPicker, setIsColorPicker] = useState(false);
  const [activePalette, setActivePalette] = useState(null)

  const [isLinearGradient, setIsLinearGradient] = useState(true);
  const [palettes, setPalettes] = useState([]);


  useEffect(() => {
    const background = bannerItem.styles['background-color'];

    if (background.includes('gradient')) {
      setPalettes([
        {id: uuidv4(), color: '#f4f4f4', position: 5},
        {id: uuidv4(), color: '#3ec419', position: 20},
        {id: uuidv4(), color: '#67245d', position: 40},
        {id: uuidv4(), color: '#0f7ee9', position: 60},
        {id: uuidv4(), color: '#e00b74', position: 90}
      ])
    } else {
      setPalettes([
        {id: uuidv4(), color: background, position: 50},
      ])
    }
  }, [bannerItem]);


  const handleGradientPositionChange = (event, newValue) => {

  };

  const handleGradientColorChange = (colorsObject) => {
      const clonePalettes = cloneDeep(palettes);
      const neededPalette = clonePalettes.find((palette) => palette.id === activePalette.id);

      neededPalette.color = colorsObject.hex;
      setPalettes(clonePalettes);
  };

  const handleSwapColors = () => {

  };

  const handleAcceptGradientColor = (closeColorPicker) => {

  };

  const handleSliderThumbClick = (palette) => {
    setActivePalette(palette);
    setIsColorPicker(true);
  };

  return (
    <div className='color-settings-section__gradient'>

      <div className='color-settings-section__gradient-range-container'>
        <div
          className='color-settings-section__gradient-preview'
          // style={{background: selectedGradientColor}}
        />
        <div
          className='color-settings-section__gradient-reverse'
          onClick={() => handleSwapColors()}
        >
          <SwapHorizIcon className='color-settings-section__gradient-reverse-icon' />
        </div>
      </div>

      <div className='color-settings-section__gradient-slider'>

        <DraggableRange
          palettes={palettes}
          setPalettes={setPalettes}
          handleSliderThumbClick={handleSliderThumbClick}
        />

        {isColorPicker &&
          <ClickAwayListener onClickAway={() => setIsColorPicker(false)}>
            <div className='color-settings-section__gradient-color-picker'>
              <PhotoshopPicker
                color={activePalette.color}
                onChange={(color) => handleGradientColorChange(color)}
                onAccept={() => setIsColorPicker(false)}
                onCancel={() => setIsColorPicker(false)}
              />
            </div>
          </ClickAwayListener>
        }
      </div>

    </div>
  );
};

export default GradientColor;