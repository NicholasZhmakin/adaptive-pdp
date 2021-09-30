import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import SolidGenerator from './SolidGenerator';
import GradientGenerator from './GradientGenerator';

import './ColorSettingsSection.scss';

export const COLOR_TYPE = {
  SOLID: 'solid',
  GRADIENT: 'gradient',
  NONE: 'none',
};

const ColorSettingsSection = ({bannerItem, changeBannerItemStylesField}) => {

  const [activeTab, setActiveTab] = useState(COLOR_TYPE.SOLID);
  const [backgroundObject, setBackgroundObject] = useState({
    solid: '#000000',
    gradient: 'linear-gradient(90deg, rgb(0,0,0) 0%, rgb(255,255,255) 100%)',
    none: 'none',
  });

  useEffect(() => {
    if (bannerItem.type === 'button') {
      const background = bannerItem.styles['background'];

      if (background.includes('gradient')) {
        handleBackgroundObjectChange(COLOR_TYPE.GRADIENT, background);
        setActiveTab(COLOR_TYPE.GRADIENT);
      } else if (background === 'none') {
        handleBackgroundObjectChange(COLOR_TYPE.NONE, 'none');
        setActiveTab(COLOR_TYPE.NONE);
      } else {
        handleBackgroundObjectChange(COLOR_TYPE.SOLID, background);
        setActiveTab(COLOR_TYPE.SOLID);
      }
    }
  }, []);

  useEffect(() => {
    if (bannerItem.type === 'button') {
      changeBannerItemStylesField(bannerItem.id, 'background', backgroundObject[activeTab]);
    }
  }, [activeTab, backgroundObject]);

  const handleBackgroundObjectChange = (name, value) => {
    setBackgroundObject({
      ...backgroundObject,
      [name]: value,
    })
  };

  const handleTextColorChange = (name, value) => {
    changeBannerItemStylesField(bannerItem.id, 'color', value);
  };

  const convertRbgToHex = (color) => {
    if (color.includes('(')) {
      const rgbPoints = color.substring(4, color.length - 1).replace(/ /g, '').split(',');

      const hexArray = rgbPoints.map((point) => {
        let hexPoint = Number(point).toString(16);

        if (hexPoint.length === 1) {
          return "0" + hexPoint;
        } else {
          return hexPoint;
        }
      });

      return "#" + hexArray.join('');
    } else {
      return color;
    }
  };

  let mainContent = null;

  if (activeTab === COLOR_TYPE.SOLID) {
    if (bannerItem.type === 'button') {
      mainContent = (
        <SolidGenerator
          currentSolidColor={convertRbgToHex(backgroundObject[COLOR_TYPE.SOLID])}
          handleBackgroundObjectChange={handleBackgroundObjectChange}
        />
      );
    } else {
      mainContent = (
        <SolidGenerator
          currentSolidColor={convertRbgToHex(bannerItem.styles['color'])}
          handleBackgroundObjectChange={handleTextColorChange}
        />
      );
    }
  } else if (activeTab === COLOR_TYPE.GRADIENT) {
    mainContent = (
      <GradientGenerator
        currentGradientColor={backgroundObject[COLOR_TYPE.GRADIENT]}
        handleBackgroundObjectChange={handleBackgroundObjectChange}
      />
    );
  }

  return (
    <div className='moveable-settings__section-dropDown color-settings-section'>
      Color

      {bannerItem.type === 'button' &&
        <div className='color-settings-section__tabs'>
          <div
            className={classnames('color-settings-section__tab', {
              'active': activeTab === COLOR_TYPE.SOLID,
            })}
            onClick={() => setActiveTab(COLOR_TYPE.SOLID)}
          >
            solid
          </div>
          <div
            className={classnames('color-settings-section__tab', {
              'active': activeTab === COLOR_TYPE.GRADIENT,
            })}
            onClick={() => setActiveTab(COLOR_TYPE.GRADIENT)}
          >
            gradient
          </div>
          <div
            className={classnames('color-settings-section__tab', {
              'active': activeTab === COLOR_TYPE.NONE,
            })}
            onClick={() => setActiveTab(COLOR_TYPE.NONE)}
          >
            none
          </div>
        </div>
      }

      {mainContent}

    </div>
  );
};

export default ColorSettingsSection;