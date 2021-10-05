import React, { useEffect } from 'react';
import classnames from 'classnames';
import SolidGenerator from '../ColorSettingsSection/SolidGenerator';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

import './TextSettingsSection.scss';


const TextSettingsSection = ({bannerItem, changeBannerItemStylesField}) => {

  const handleChange = (newValue, name) => {
    changeBannerItemStylesField(name, newValue);
  };

  return (
    <div className='moveable-settings__section-dropDown text-settings-section'>
      Text settings

      <Select
        native
        value={bannerItem.styles['font-family']}
        onChange={(e) => handleChange(e.target.value, 'font-family')}
      >
        <option aria-label="None" value="" />
        <option value={'"Roboto", sans-serif'}>Roboto</option>
        <option value={'"Ephesis", cursive'}>Ephesis</option>
        <option value={'"Stick No Bills", sans-serif'}>Stick No Bills</option>
        <option value={'"Anton", sans-serif'}>Anton</option>
      </Select>

      <Select
        native
        value={bannerItem.styles['font-weight']}
        onChange={(e) => handleChange(e.target.value, 'font-weight')}
      >
        <option aria-label="None" value="" />
        <option value={'lighter'}>Light</option>
        <option value={'normal'}>Normal</option>
        <option value={'bold'}>Bold</option>
      </Select>

      {bannerItem.type === 'text' ?
        <div className='text-settings-section__text-align-container'>
          <div
            className={classnames('text-settings-section__text-align-option', {
              'active': bannerItem.styles['text-align'] === 'left',
            })}
            onClick={() => handleChange('left', 'text-align')}
          >
            <FormatAlignLeftIcon className='text-settings-section__text-align-icon' />
          </div>
          <div
            className={classnames('text-settings-section__text-align-option', {
              'active': bannerItem.styles['text-align'] === 'center',
            })}
            onClick={() => handleChange('center', 'text-align')}
          >
            <FormatAlignCenterIcon className='text-settings-section__text-align-icon' />
          </div>
          <div
            className={classnames('text-settings-section__text-align-option', {
              'active': bannerItem.styles['text-align'] === 'right',
            })}
            onClick={() => handleChange('right', 'text-align')}
          >
            <FormatAlignRightIcon className='text-settings-section__text-align-icon' />
          </div>
        </div> :
        <SolidGenerator
          currentSolidColor={bannerItem.styles['color']}
          handleBackgroundObjectChange={handleChange}
          textColor
        />
      }

      <Slider
        value={parseInt(bannerItem.styles['font-size'])}
        onChange={(event, value) => handleChange(`${value}px`, 'font-size')}
        min={6}
        max={120}
      />

    </div>
  );
};

export default TextSettingsSection;