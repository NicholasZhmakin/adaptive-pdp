import React, { useEffect, useRef, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';
import './DraggableRange.scss';


const DraggableRange = () => {

  const sliderContainerRef = useRef(null);

  const [colors, setColors] = useState([
    {id: uuidv4(), color: '#f4f4f4', position: 5},
    {id: uuidv4(), color: '#3ec419', position: 20},
    {id: uuidv4(), color: '#67245d', position: 40},
    {id: uuidv4(), color: '#0f7ee9', position: 60},
    {id: uuidv4(), color: '#e00b74', position: 90}
  ]);

  useEffect(() => {
    const sliders = sliderContainerRef.current.querySelectorAll('.multi-thumb-slider__input');

    sliders.forEach((slider) => {
      slider.oninput = handleRangeChange;
      slider.oninput();
    })
  }, [colors.length]);

  const handleRangeChange = () => {
    const sliders = sliderContainerRef.current.querySelectorAll('.multi-thumb-slider__input');

    const newArray = Array.from(sliders).map((element, elementIndex) => ({
      id: element.dataset.id,
      position: element.value,
      color: element.dataset.color,
    }))

    setColors(newArray);
  }

  const handleAddNewSlider = (e) => {
    const mousePosition = e.nativeEvent.offsetX;
    const positionForInput = mousePosition * 100 / 129;

    if (e.target === sliderContainerRef.current) {
      setColors((prevState) => ([
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
      {colors.map((color) =>
        <input
          className="multi-thumb-slider__input"
          key={color.id}
          style={{['--colorX']: color.color}}
          data-color={color.color}
          data-id={color.id}
          value={color.position}
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