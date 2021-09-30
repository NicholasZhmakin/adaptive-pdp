import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './MultiThumbSlider.scss';
import classnames from 'classnames';


const MultiThumbSlider = ({palettes, focusPalette, setPalettes, handleSliderThumbClick, handleSliderThumbDoubleClick}) => {

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

    const newArray = Array.from(sliders).map((element) => ({
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
        {id: uuidv4(), color: 'rgb(0, 0, 0)', position: positionForInput},
      ]))
    }
  }

  return (
    <div
      ref={sliderContainerRef}
      className='multi-thumb-slider'
      onClick={handleAddNewSlider}
    >
      {palettes.map((palette) =>
        <input
          className={classnames('multi-thumb-slider__input', {
            'active': focusPalette?.id === palette.id,
          })}
          key={palette.id}
          style={{['--gradient-thumb-color']: palette.color}}
          onClick={() => handleSliderThumbClick(palette)}
          onDoubleClick={() => handleSliderThumbDoubleClick(palette)}
          readOnly
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

export default MultiThumbSlider;