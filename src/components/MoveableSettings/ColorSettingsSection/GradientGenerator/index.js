import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { ClickAwayListener } from '@material-ui/core';
import { PhotoshopPicker } from 'react-color';
import MultiThumbSlider from './MultiThumbSlider';

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
  {classModifier: 'top-center', value: 'circle at 0%'},
  {classModifier: 'top-right', value: 'circle at 12.5%'},
  {classModifier: 'center-right', value: 'circle at 25%'},
  {classModifier: 'bottom-right', value: 'circle at 37.5%'},
  {classModifier: 'bottom-center', value: 'circle at 50%'},
  {classModifier: 'bottom-left', value: 'circle at 62,5%'},
  {classModifier: 'center-left', value: 'circle at 75%'},
  {classModifier: 'top-left', value: 'circle at 87.5%'},
  {classModifier: 'center-center', value: 'circle'},
];

const GradientGenerator = ({bannerItem}) => {

  const [isColorPicker, setIsColorPicker] = useState(false);
  const [activePalette, setActivePalette] = useState(null)

  const [gradientType, setGradientType] = useState('linear');
  const [anglePoints, setAnglePoints] = useState([...linearAnglePoints]);
  const [activeAnglePoint, setActiveAnglePoint] = useState('90deg');


  const [gradientPreview, setGradientPreview] = useState('red');
  const [palettes, setPalettes] = useState([]);


  useEffect(() => {
    const background = bannerItem.styles['background'];

    if (background.includes('gradient')) {
      const splitGradient = background.split(', ');
      const gradientType = splitGradient[0].split('(')[0];
      const gradientAnglePoint = splitGradient[0].split('(')[1];
      const gradientPalettesArray = splitGradient.slice(1).map((palette) => ({
        id: uuidv4(),
        color: palette.split(' ')[0],
        position: palette.split(' ')[1].slice(0, -1),
      }));

      setGradientType(gradientType);
      setActiveAnglePoint(gradientAnglePoint);

      console.log(gradientPalettesArray, 'gradientPalettesArray');

      setPalettes([
        {id: uuidv4(), color: '#f4f4f4', position: 5},
        {id: uuidv4(), color: '#3ec419', position: 20},
        {id: uuidv4(), color: '#67245d', position: 40},
        {id: uuidv4(), color: '#0f7ee9', position: 60},
        {id: uuidv4(), color: '#e00b74', position: 90}
      ])
    } else if (background === 'none') {
      setPalettes([
        {id: uuidv4(), color: '#ffffff', position: 35},
        {id: uuidv4(), color: '#000000', position: 65},
      ])
    } else {
      setPalettes([
        {id: uuidv4(), color: '#ffffff', position: 35},
        {id: uuidv4(), color: background, position: 65},
      ])
    }
  }, [bannerItem]);

  useEffect(() => {
    if (gradientType === 'linear') {
      setAnglePoints(linearAnglePoints);
      setActiveAnglePoint('90deg');
    } else {
      setAnglePoints(radialAnglePoints);
      setActiveAnglePoint('circle');
    }
  }, [gradientType]);

  useEffect(() => {
    handleCreateGradientBackground();
  }, [palettes, gradientType, activeAnglePoint]);

  const handleCreateGradientBackground = () => {
    const sortedPallets = [...palettes].sort((paletteA, paletteB) => paletteA.position - paletteB.position);
    const colorsAndPositionsString = sortedPallets.map((palette) => `${palette.color} ${palette.position}%`).join(', ');
    const result = `${gradientType}-gradient(${activeAnglePoint}, ${colorsAndPositionsString})`;

    setGradientPreview(result);
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

  return (
    <div className='gradient-generator'>

      <div className='gradient-generator__gradient-range-container'>
        <div
          className='gradient-generator__gradient-preview'
          style={{background: gradientPreview}}
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
            onClick={() => setGradientType('linear')}
          />
          <div
            className={classnames('gradient-generator__type-radial', {
              'active': gradientType === 'radial',
            })}
            onClick={() => setGradientType('radial')}
          />
        </div>

        <div className='gradient-generator__angle-container'>
          <p>angle</p>
          <div className='gradient-generator__angle-box'>

            {anglePoints.map((anglePoint) => {
              return (
                <div
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