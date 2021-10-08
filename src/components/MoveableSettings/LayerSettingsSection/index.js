import React, { useState } from 'react';
import classnames from 'classnames';
import { ReactComponent as LeftAlignIcon } from './../../../align-icons/align-left.svg';
import { ReactComponent as CenterXAlignIcon } from './../../../align-icons/align-center-x.svg';
import { ReactComponent as RightAlignIcon } from './../../../align-icons/align-right.svg';
import { ReactComponent as TopAlignIcon } from './../../../align-icons/align-top.svg';
import { ReactComponent as CenterYAlignIcon } from './../../../align-icons/align-center-y.svg';
import { ReactComponent as BottomAlignIcon } from './../../../align-icons/align-bottom.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import './LayerSettingsSection.scss';

const ALIGN_POSITION = {
  LEFT: 'left',
  CENTER_X: 'center_x',
  RIGHT: 'right',
  TOP: 'top',
  CENTER_Y: 'center_Y',
  BOTTOM: 'bottom',
}


const LayerSettingsSection = ({
  bannerItem,
  bannerContainerItem,
  lastIndexZ,
  cropAreaDimensionAndPosition,
  changeBannerItemStylesField,
  changeBannerItemLayerOrder,
}) => {

  const [alignByX, setAlignByX] = useState({
    name: 'undefined',
    value: 0,
  });

  const [alignByY, setAlignByY] = useState({
    name: 'undefined',
    value: 0,
  });


  const handleChangeAlignPositionByX = (alignPosition) => {
    let widthDifference;
    let cropXPosition;

    if (bannerContainerItem) {
      widthDifference = parseInt(bannerContainerItem.styles.width) - parseInt(bannerItem.styles.width);
      cropXPosition = 0;
    } else {
      widthDifference = cropAreaDimensionAndPosition.width - parseInt(bannerItem.styles.width);
      cropXPosition = cropAreaDimensionAndPosition.x;
    }

    switch (alignPosition) {
      case ALIGN_POSITION.LEFT:
        changeBannerItemStylesField('left', `${cropXPosition}px`);
        setAlignByX({
          name: alignPosition,
          value: cropXPosition,
        });
        break;
      case ALIGN_POSITION.CENTER_X:
        changeBannerItemStylesField('left', `${widthDifference / 2 + cropXPosition}px`);
        setAlignByX({
          name: alignPosition,
          value: widthDifference / 2 + cropXPosition,
        });
        break;
      case ALIGN_POSITION.RIGHT:
        changeBannerItemStylesField('left', `${widthDifference + cropXPosition}px`);
        setAlignByX({
          name: alignPosition,
          value: widthDifference + cropXPosition,
        });
        break;
    }
  };

  const handleChangeAlignPositionByY = (alignPosition) => {
    let heightDifference;
    let cropYPosition;

    if (bannerContainerItem) {
      heightDifference = parseInt(bannerContainerItem.styles.height) - parseInt(bannerItem.styles.height);
      cropYPosition = 0;
    } else {
      heightDifference = cropAreaDimensionAndPosition.height - parseInt(bannerItem.styles.height);
      cropYPosition = cropAreaDimensionAndPosition.y;
    }

    switch (alignPosition) {
      case ALIGN_POSITION.TOP:
        changeBannerItemStylesField('top', `${cropYPosition}px`);
        setAlignByY({
          name: alignPosition,
          value: cropAreaDimensionAndPosition.y,
        });
        break;
      case ALIGN_POSITION.CENTER_Y:
        changeBannerItemStylesField('top', `${heightDifference / 2 + cropYPosition}px`);
        setAlignByY({
          name: alignPosition,
          value: heightDifference / 2 + cropYPosition,
        });
        break;
      case ALIGN_POSITION.BOTTOM:
        changeBannerItemStylesField('top', `${heightDifference + cropYPosition}px`);
        setAlignByY({
          name: alignPosition,
          value: heightDifference + cropYPosition,
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

      Layer order
      <div className='layer-settings-section__order-container'>
        <div
          className={classnames('layer-settings-section__order-option', {
            'disabled': Number(bannerItem.styles['z-index']) === 1
          })}
          onClick={() => changeBannerItemLayerOrder(bannerItem.id, -1)}
        >
          <ArrowDropDownIcon className='layer-settings-section__order-icon' />
        </div>
        <div
          className={classnames('layer-settings-section__order-option', {
            'disabled':  Number(bannerItem.styles['z-index']) === lastIndexZ
          })}
          onClick={() => changeBannerItemLayerOrder(bannerItem.id, 1)}
        >
          <ArrowDropUpIcon className='layer-settings-section__order-icon' />
        </div>
        <div
          className={classnames('layer-settings-section__order-option layer-settings-section__order-option--down', {
            'disabled': Number(bannerItem.styles['z-index']) === 1
          })}
          onClick={() => changeBannerItemLayerOrder(bannerItem.id, 'down')}
        >
          <SkipNextIcon className='layer-settings-section__order-icon' />
        </div>
        <div
          className={classnames('layer-settings-section__order-option layer-settings-section__order-option--up', {
            'disabled': Number(bannerItem.styles['z-index']) === lastIndexZ
          })}
          onClick={() => changeBannerItemLayerOrder(bannerItem.id, 'up')}
        >
          <SkipNextIcon className='layer-settings-section__order-icon' />
        </div>
      </div>
    </div>
  );
};

export default LayerSettingsSection;