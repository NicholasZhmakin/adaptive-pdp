import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import TextSettingsSection from './TextSettingsSection';
import ColorSettingsSection from './ColorSettingsSection';
import LayerSettingsSection from './LayerSettingsSection';
import { ClickAwayListener } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LayersIcon from '@material-ui/icons/Layers';
import DeleteIcon from '@material-ui/icons/Delete';

import './MoveableSettings.scss';


const MOVEABLE_SETTINGS_SECTIONS = {
  TEXT: 'text',
  COLOR: 'color',
  LAYER: 'layer',
}


const MoveableSettings = ({bannerItem, changeBannerItemStylesField}) => {

  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    setOpenSection(null);
  }, [bannerItem]);

  let dropDown;

  switch (openSection) {
    case MOVEABLE_SETTINGS_SECTIONS.TEXT:
      dropDown = <TextSettingsSection bannerItem={bannerItem} />;
      break;
    case MOVEABLE_SETTINGS_SECTIONS.COLOR:
      dropDown = <ColorSettingsSection bannerItem={bannerItem} changeBannerItemStylesField={changeBannerItemStylesField} />;
      break;
    case MOVEABLE_SETTINGS_SECTIONS.LAYER:
      dropDown = <LayerSettingsSection bannerItem={bannerItem} />;
      break;
    default:
      dropDown = null;
  }


    return (
      <ClickAwayListener onClickAway={() => setOpenSection(null)}>
        <div className='moveable-settings'>
          {bannerItem.type !== 'image' &&
            <>
              <div
                className={classnames('moveable-settings__section', {
                  'active': openSection === MOVEABLE_SETTINGS_SECTIONS.TEXT,
                })}
              >
                <TextFieldsIcon
                  className='moveable-settings__section-icon'
                  onClick={() => setOpenSection(MOVEABLE_SETTINGS_SECTIONS.TEXT)}
                />
              </div>

              <div
                className={classnames('moveable-settings__section', {
                  'active': openSection === MOVEABLE_SETTINGS_SECTIONS.COLOR,
                })}
              >
                <ColorLensIcon
                  className='moveable-settings__section-icon'
                  onClick={() => setOpenSection(MOVEABLE_SETTINGS_SECTIONS.COLOR)}
                />
              </div>
            </>
          }

          <div
            className={classnames('moveable-settings__section', {
              'active': openSection === MOVEABLE_SETTINGS_SECTIONS.LAYER,
            })}
          >
            <LayersIcon
              className='moveable-settings__section-icon'
              onClick={() => setOpenSection(MOVEABLE_SETTINGS_SECTIONS.LAYER)}
            />
          </div>

          <div className='moveable-settings__section'>
            <FileCopyIcon
              className='moveable-settings__section-icon'
              onClick={() => setOpenSection(null)}
            />
          </div>

          <div className='moveable-settings__section'>
            <DeleteIcon
              className='moveable-settings__section-icon'
              onClick={() => setOpenSection(null)}
            />
          </div>

          {dropDown}




          {/*<div className='moveable-settings__text'>*/}
          {/*    <input*/}
          {/*        value={parseInt(bannerItem.styles['font-size'])}*/}
          {/*        onChange={(e) => changeBannerItemStylesFiled(bannerItem.id, 'font-size', e.target.value)}*/}
          {/*    />*/}
          {/*</div>*/}


        </div>
      </ClickAwayListener>
    );
}

export default MoveableSettings;