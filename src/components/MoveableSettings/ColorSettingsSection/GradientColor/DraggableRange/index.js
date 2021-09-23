import React, { useEffect, useRef, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';
import './DraggableRange.scss';


const DraggableRange = ({palettes, setPalettes, handleSliderThumbClick}) => {

  const sliderContainerRef = useRef(null);


  useEffect(() => {
    const sliders = sliderContainerRef.current.querySelectorAll('.multi-thumb-slider__input');

    sliders.forEach((slider) => {
      slider.oninput = handleRangeChange;
      slider.oninput();
    })
  }, [palettes.length]);

  const handleRangeChange = () => {
    const sliders = sliderContainerRef.current.querySelectorAll('.multi-thumb-slider__input');

    const newArray = Array.from(sliders).map((element, elementIndex) => ({
      id: element.dataset.id,
      position: element.value,
      color: element.dataset.color,
    }))

    setPalettes(newArray);
  }

  const handleAddNewSlider = (e) => {
    const mousePosition = e.nativeEvent.offsetX;
    const positionForInput = mousePosition * 100 / 129;

    if (e.target === sliderContainerRef.current) {
      setPalettes((prevState) => ([
        ...prevState,
        {id: uuidv4(), color: '#f4f4f4', position: positionForInput},
      ]))
    }
  }

  return (
    <div
      ref={sliderContainerRef}
      className="multi-thumb-slider"
      onClick={handleAddNewSlider}
    >
      {palettes.map((palette) =>
        <input
          className="multi-thumb-slider__input"
          key={palette.id}
          style={{['--colorX']: palette.color}}
          onDoubleClick={() => handleSliderThumbClick(palette)}
          data-color={palette.color}
          data-id={palette.id}
          value={palette.position}
          min="0"
          max="100"
          step="1"
          type="range"
        />
      )}
    </div>
  );
};

export default DraggableRange;