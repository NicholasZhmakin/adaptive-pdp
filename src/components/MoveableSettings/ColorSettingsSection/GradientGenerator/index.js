import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { ClickAwayListener } from '@material-ui/core';
import { PhotoshopPicker } from 'react-color';
import MultiThumbSlider from './MultiThumbSlider';
import { COLOR_TYPE } from '../index';

import './GradientGenerator.scss'


const linearAnglePoints = [
  {classModifier: 'top-center', value: '0deg'},
  {classModifier: 'top-right', value: '45deg'},
  {classModifier: 'center-right', value: '90deg'},
  {classModifier: 'bottom-right', value: '135deg'},
  {classModifier: 'bottom-center', value: '180deg'},
  {classModifier: 'bottom-left', value: '225deg'},
  {classModifier: 'center-left', value: '270deg'},
  {classModifier: 'top-left', value: '315deg'},
];

const radialAnglePoints = [
  {classModifier: 'top-center', value: 'circle at 0% center'},
  {classModifier: 'top-right', value: 'circle at 12.5% center'},
  {classModifier: 'center-right', value: 'circle at 25% center'},
  {classModifier: 'bottom-right', value: 'circle at 37.5% center'},
  {classModifier: 'bottom-center', value: 'circle at 50% center'},
  {classModifier: 'bottom-left', value: 'circle at 62.5% center'},
  {classModifier: 'center-left', value: 'circle at 75% center'},
  {classModifier: 'top-left', value: 'circle at 87.5% center'},
  {classModifier: 'center-center', value: 'circle'},
];

const GradientGenerator = ({currentGradientColor, handleBackgroundObjectChange}) => {

  const [isColorPicker, setIsColorPicker] = useState(false);
  const [activePalette, setActivePalette] = useState(null)

  const [gradientType, setGradientType] = useState('');
  const [anglePoints, setAnglePoints] = useState([...linearAnglePoints]);
  const [activeAnglePoint, setActiveAnglePoint] = useState('');

  const [palettes, setPalettes] = useState([]);

  useEffect(() => {
    const regex = new RegExp(/,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/,'gi');
    const gradientType = currentGradientColor.substring(0, currentGradientColor.indexOf('(')).split('-')[0];
    const secondPartOfGradient = currentGradientColor.substring(currentGradientColor.indexOf('(') + 1, currentGradientColor.lastIndexOf(')')).split(regex);
    let gradientAnglePoint = secondPartOfGradient[0];
    const isDefaultAngle = !gradientAnglePoint.includes('rgb');

    if (!isDefaultAngle) {
      gradientAnglePoint = '180deg';
    }

    const gradientPalettesArray = secondPartOfGradient.slice(Number(!!isDefaultAngle)).map((palette) => {
      const color = palette.substring(0, palette.indexOf(')') + 1).trim();
      const position = palette.substring(palette.indexOf(')') + 1, palette.length - 1).trim();

      return ({
        id: uuidv4(),
        color,
        position,
      })
    });

    console.log(gradientType, gradientAnglePoint, gradientPalettesArray);

    handleGradientTypeChange(gradientType, gradientAnglePoint);

    setGradientType(gradientType);
    setActiveAnglePoint(gradientAnglePoint);
    setPalettes(gradientPalettesArray);
  }, []);

  useEffect(() => {
    handleCreateGradientBackground();
  }, [palettes, gradientType, activeAnglePoint]);

  const handleCreateGradientBackground = () => {
    const sortedPallets = [...palettes].sort((paletteA, paletteB) => paletteA.position - paletteB.position);
    const colorsAndPositionsString = sortedPallets.map((palette) => `${palette.color} ${palette.position}%`).join(', ');
    const result = `${gradientType}-gradient(${activeAnglePoint}, ${colorsAndPositionsString})`;

    handleBackgroundObjectChange(COLOR_TYPE.GRADIENT, result);
  };

  const handleGradientColorChange = (colorsObject) => {
      const clonePalettes = cloneDeep(palettes);
      const neededPalette = clonePalettes.find((palette) => palette.id === activePalette.id);

      neededPalette.color = colorsObject.hex;
      setPalettes(clonePalettes);
  };

  const handleSwapColors = () => {
    const sortedPallets = [...palettes].sort((paletteA, paletteB) => paletteA.position - paletteB.position);
    const reversePositions = sortedPallets.map((palette) => palette.position).reverse();

    const swappedPalettes = sortedPallets.map((palette, paletteIndex) => ({
      ...palette,
      position: reversePositions[paletteIndex],
    }));

    setPalettes(swappedPalettes);
  };

  const handleSliderThumbClick = (palette) => {
    setActivePalette(palette);
    setIsColorPicker(true);
  };

  const handleGradientTypeChange = (type, angle) => {

    if (!angle) {
      setGradientType(type);
    }

   if (type === 'linear') {
     setActiveAnglePoint(angle ?? '90deg');
     setAnglePoints(linearAnglePoints);
   } else {
     setActiveAnglePoint(angle ?? 'circle');
     setAnglePoints(radialAnglePoints);
   }

  };

  return (
    <div className='gradient-generator'>

      <div className='gradient-generator__gradient-range-container'>
        <div
          className='gradient-generator__gradient-preview'
          style={{background: currentGradientColor}}
        />
        <div
          className='gradient-generator__swap-button'
          onClick={handleSwapColors}
        >
          <SwapHorizIcon className='gradient-generator__swap-icon' />
        </div>
      </div>

      <div className='gradient-generator__gradient-slider-container'>
        <MultiThumbSlider
          palettes={palettes}
          setPalettes={setPalettes}
          handleSliderThumbClick={handleSliderThumbClick}
        />

        {isColorPicker &&
          <ClickAwayListener onClickAway={() => setIsColorPicker(false)}>
            <div className='gradient-generator__color-picker'>
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

      <div className='gradient-generator__settings'>
        <div className='gradient-generator__types-container'>
          <div
            className={classnames('gradient-generator__type-linear', {
              'active': gradientType === 'linear',
            })}
            onClick={() => handleGradientTypeChange('linear')}
          />
          <div
            className={classnames('gradient-generator__type-radial', {
              'active': gradientType === 'radial',
            })}
            onClick={() => handleGradientTypeChange('radial')}
          />
        </div>

        <div className='gradient-generator__angle-container'>
          <p>angle</p>
          <div className='gradient-generator__angle-box'>

            {anglePoints.map((anglePoint) => {
              return (
                <div
                  key={anglePoint.value}
                  className={`
                    gradient-generator__angle-point 
                    gradient-generator__angle-point--${anglePoint.classModifier}
                    ${activeAnglePoint === anglePoint.value && 'active'}
                  `}
                  onClick={() => setActiveAnglePoint(anglePoint.value)}
                />
              )
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default GradientGenerator;