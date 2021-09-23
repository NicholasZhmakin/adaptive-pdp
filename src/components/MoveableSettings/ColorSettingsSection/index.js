import React, { useState } from 'react';
import classnames from 'classnames';
import SolidGenerator from './SolidGenerator';
import GradientGenerator from './GradientGenerator';

import './ColorSettingsSection.scss';

const COLOR_TYPE = {
  SOLID: 'solid',
  GRADIENT: 'gradient',
  NONE: 'none',
};

const ColorSettingsSection = ({bannerItem, changeBannerItemStylesField}) => {

  const [activeTab, setActiveTab] = useState(COLOR_TYPE.SOLID);

  let mainContent = null;

  if (activeTab === COLOR_TYPE.SOLID) {
    mainContent = (
      <SolidGenerator
        bannerItem={bannerItem}
        changeBannerItemStylesField={changeBannerItemStylesField}
      />
    );
  } else if (activeTab === COLOR_TYPE.GRADIENT) {
    mainContent = (
      <GradientGenerator
        bannerItem={bannerItem}
        changeBannerItemStylesField={changeBannerItemStylesField}
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