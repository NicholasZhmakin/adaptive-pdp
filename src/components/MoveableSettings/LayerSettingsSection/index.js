import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { ReactComponent as LeftAlignIcon } from './../../../align-icons/align-left.svg';
import { ReactComponent as CenterXAlignIcon } from './../../../align-icons/align-center-x.svg';
import { ReactComponent as RightAlignIcon } from './../../../align-icons/align-right.svg';
import { ReactComponent as TopAlignIcon } from './../../../align-icons/align-top.svg';
import { ReactComponent as CenterYAlignIcon } from './../../../align-icons/align-center-y.svg';
import { ReactComponent as BottomAlignIcon } from './../../../align-icons/align-bottom.svg';

import './LayerSettingsSection.scss';

const ALIGN_POSITION = {
  LEFT: 'left',
  CENTER_X: 'center_x',
  RIGHT: 'right',
  TOP: 'top',
  CENTER_Y: 'center_Y',
  BOTTOM: 'bottom',
}


const LayerSettingsSection = ({bannerItem, cropAreaDimensionAndPosition, changeBannerItemStylesField}) => {

  const [alignByX, setAlignByX] = useState({
    name: 'undefined',
    value: 0,
  });

  const [alignByY, setAlignByY] = useState({
    name: 'undefined',
    value: 0,
  });

  const handleChangeAlignPositionByX = (alignPosition) => {
    const widthDifference = cropAreaDimensionAndPosition.width - parseInt(bannerItem.styles.width);

    switch (alignPosition) {
      case ALIGN_POSITION.LEFT:
        changeBannerItemStylesField('left', `${cropAreaDimensionAndPosition.x}px`);
        setAlignByX({
          name: alignPosition,
          value: cropAreaDimensionAndPosition.x,
        });
        break;
      case ALIGN_POSITION.CENTER_X:
        changeBannerItemStylesField('left', `${widthDifference / 2 + cropAreaDimensionAndPosition.x}px`);
        setAlignByX({
          name: alignPosition,
          value: widthDifference / 2 + cropAreaDimensionAndPosition.x,
        });
        break;
      case ALIGN_POSITION.RIGHT:
        changeBannerItemStylesField('left', `${widthDifference + cropAreaDimensionAndPosition.x}px`);
        setAlignByX({
          name: alignPosition,
          value: widthDifference + cropAreaDimensionAndPosition.x,
        });
        break;
    }
  };

  const handleChangeAlignPositionByY = (alignPosition) => {
    const heightDifference = cropAreaDimensionAndPosition.height - parseInt(bannerItem.styles.height);

    switch (alignPosition) {
      case ALIGN_POSITION.TOP:
        changeBannerItemStylesField('top', `${cropAreaDimensionAndPosition.y}px`);
        setAlignByY({
          name: alignPosition,
          value: cropAreaDimensionAndPosition.y,
        });
        break;
      case ALIGN_POSITION.CENTER_Y:
        changeBannerItemStylesField('top', `${heightDifference / 2 + cropAreaDimensionAndPosition.y}px`);
        setAlignByY({
          name: alignPosition,
          value: heightDifference / 2 + cropAreaDimensionAndPosition.y,
        });
        break;
      case ALIGN_POSITION.BOTTOM:
        changeBannerItemStylesField('top', `${heightDifference + cropAreaDimensionAndPosition.y}px`);
        setAlignByY({
          name: alignPosition,
          value: heightDifference + cropAreaDimensionAndPosition.y,
        });
        break;
    }
  };

  return (
    <div className='moveable-settings__section-dropDown layer-settings-section'>
      Align
      <div className='layer-settings-section__align-container'>
        <div
          className={classnames('layer-settings-section__align-option', {
            'active': parseInt(alignByX.value) === parseInt(bannerItem.styles.left) && alignByX.name === ALIGN_POSITION.LEFT
          })}
          onClick={() => handleChangeAlignPositionByX(ALIGN_POSITION.LEFT)}
        >
          <LeftAlignIcon className='layer-settings-section__align-icon' />
        </div>
        <div
          className={classnames('layer-settings-section__align-option', {
            'active': parseInt(alignByX.value) === parseInt(bannerItem.styles.left) && alignByX.name === ALIGN_POSITION.CENTER_X
          })}
          onClick={() => handleChangeAlignPositionByX(ALIGN_POSITION.CENTER_X)}
        >
          <CenterXAlignIcon className='layer-settings-section__align-icon' />
        </div>
        <div
          className={classnames('layer-settings-section__align-option', {
            'active': parseInt(alignByX.value) === parseInt(bannerItem.styles.left) && alignByX.name === ALIGN_POSITION.RIGHT
          })}
          onClick={() => handleChangeAlignPositionByX(ALIGN_POSITION.RIGHT)}
        >
          <RightAlignIcon className='layer-settings-section__align-icon' />
        </div>
        <div
          className={classnames('layer-settings-section__align-option', {
            'active': parseInt(alignByY.value) === parseInt(bannerItem.styles.top) && alignByY.name === ALIGN_POSITION.TOP
          })}
          onClick={() => handleChangeAlignPositionByY(ALIGN_POSITION.TOP)}
        >
          <TopAlignIcon className='layer-settings-section__align-icon' />
        </div>
        <div
          className={classnames('layer-settings-section__align-option', {
            'active': parseInt(alignByY.value) === parseInt(bannerItem.styles.top) && alignByY.name === ALIGN_POSITION.CENTER_Y
          })}
          onClick={() => handleChangeAlignPositionByY(ALIGN_POSITION.CENTER_Y)}
        >
          <CenterYAlignIcon className='layer-settings-section__align-icon' />
        </div>
        <div
          className={classnames('layer-settings-section__align-option', {
            'active': parseInt(alignByY.value) === parseInt(bannerItem.styles.top) && alignByY.name === ALIGN_POSITION.BOTTOM
          })}
          onClick={() => handleChangeAlignPositionByY(ALIGN_POSITION.BOTTOM)}
        >
          <BottomAlignIcon className='layer-settings-section__align-icon' />
        </div>
      </div>
    </div>
  );
};

export default LayerSettingsSection;