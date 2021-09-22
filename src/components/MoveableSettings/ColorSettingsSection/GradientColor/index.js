import React, {useEffect, useState} from 'react';
import Slider from '@material-ui/core/Slider';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { ClickAwayListener } from '@material-ui/core';
import { PhotoshopPicker } from 'react-color';
import DraggableRange from './DraggableRange';



const GradientColor = ({bannerItem}) => {

  const [isColorPicker, setIsColorPicker] = useState(false);

  const [isLinearGradient, setIsLinearGradient] = useState(true);
  const [activeGradientColor, setActiveGradientColor] = useState('0');
  const [tempFirstGradientColor, setTempFirstGradientColor] = useState(null);
  const [tempSecondGradientColor, setTempSecondGradientColor] = useState(null);
  const [selectedGradientColor, setSelectedGradientColor] = useState('');
  const [gradientPosition, setGradientPosition] = useState([35, 65]);


  useEffect(() => {
    const background = bannerItem.styles['background-color'];

    if (background.includes('gradient')) {
      setSelectedGradientColor(background);
      setTempFirstGradientColor(background);
      setTempSecondGradientColor(background);
    } else {
      setSelectedGradientColor(`linear-gradient(90deg, ${background} 35%, ${background} 65%)`);
      setTempFirstGradientColor(background);
      setTempSecondGradientColor(background);
    }
  }, [bannerItem]);

  useEffect(() => {
    if (tempFirstGradientColor && tempSecondGradientColor) {
      handleAcceptGradientColor();
    }
  }, [gradientPosition, tempFirstGradientColor, tempSecondGradientColor]);

  const handleGradientPositionChange = (event, newValue) => {
    setGradientPosition(newValue);
  };

  const handleGradientColorChange = (color) => {
    if (activeGradientColor === '0') {
      setTempFirstGradientColor(color);
    } else {
      setTempSecondGradientColor(color);
    }
  };

  const handleSwapColors = () => {
    setTempFirstGradientColor(tempSecondGradientColor);
    setTempSecondGradientColor(tempFirstGradientColor);
  };

  const handleAcceptGradientColor = (closeColorPicker) => {
    if (isLinearGradient) {
      setSelectedGradientColor(`linear-gradient(90deg, ${tempFirstGradientColor.hex ?? tempFirstGradientColor} ${gradientPosition[0]}%, ${tempSecondGradientColor.hex ?? tempSecondGradientColor} ${gradientPosition[1]}%)`);
    } else {
      setSelectedGradientColor(`radial-gradient(circle, ${tempFirstGradientColor.hex ?? tempFirstGradientColor} ${gradientPosition[0]}%, ${tempSecondGradientColor.hex ?? tempSecondGradientColor} ${gradientPosition[1]}%)`);
    }

    if (closeColorPicker) {
      setIsColorPicker(false);
    }
  };

  const handleColorClick = (e) => {
    const targetTagName = e.target.tagName;
    const targetDataIndex = e.target.getAttribute('data-index');

    if (targetTagName === 'SPAN' || targetDataIndex) {
      setActiveGradientColor(targetDataIndex);
      setIsColorPicker(true);
    }
  };

  return (
    <div className='color-settings-section__gradient'>

      <div className='color-settings-section__gradient-range-container'>
        <div
          className='color-settings-section__gradient-preview'
          style={{background: selectedGradientColor}}
        />
        <div
          className='color-settings-section__gradient-reverse'
          onClick={() => handleSwapColors()}
        >
          <SwapHorizIcon className='color-settings-section__gradient-reverse-icon' />
        </div>
      </div>

      <div className='color-settings-section__gradient-slider'>

        <DraggableRange />

        {/*<Slider*/}
        {/*  value={gradientPosition}*/}
        {/*  onChange={handleGradientPositionChange}*/}
        {/*  onDoubleClick={handleColorClick}*/}
        {/*/>*/}

        {isColorPicker &&
          <ClickAwayListener onClickAway={() => setIsColorPicker(false)}>
            <div className='color-settings-section__gradient-color-picker'>
              <PhotoshopPicker
                color={activeGradientColor === '0' ? tempFirstGradientColor : tempSecondGradientColor}
                onChange={(color) => handleGradientColorChange(color)}
                onAccept={() => handleAcceptGradientColor(true)}
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