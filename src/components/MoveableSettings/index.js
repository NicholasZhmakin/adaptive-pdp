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


const MoveableSettings = ({
  bannerItem,
  changeBannerItemStylesField,
}) => {

  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    setOpenSection(null);
  }, [bannerItem.id]);

  const handleSettingSectionClick = (sectionName) => {
    if (openSection === sectionName) {
      setOpenSection(null);
    } else {
      setOpenSection(sectionName);
    }
  };

  let dropDown;

  switch (openSection) {
    case MOVEABLE_SETTINGS_SECTIONS.TEXT:
      dropDown = (
        <TextSettingsSection
          bannerItem={bannerItem}
          changeBannerItemStylesField={changeBannerItemStylesField}
        />
      );
      break;
    case MOVEABLE_SETTINGS_SECTIONS.COLOR:
      dropDown = (
        <ColorSettingsSection
          bannerItem={bannerItem}
          changeBannerItemStylesField={changeBannerItemStylesField} />
        );
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
          {(bannerItem.type === 'button' || bannerItem.type === 'text' ) &&
            <>
              <div
                className={classnames('moveable-settings__section', {
                  'active': openSection === MOVEABLE_SETTINGS_SECTIONS.TEXT,
                })}
                onClick={() => handleSettingSectionClick(MOVEABLE_SETTINGS_SECTIONS.TEXT)}
              >
                <TextFieldsIcon className='moveable-settings__section-icon' />
              </div>

              <div
                className={classnames('moveable-settings__section', {
                  'active': openSection === MOVEABLE_SETTINGS_SECTIONS.COLOR,
                })}
                onClick={() => handleSettingSectionClick(MOVEABLE_SETTINGS_SECTIONS.COLOR)}
              >
                <ColorLensIcon className='moveable-settings__section-icon' />
              </div>
            </>
          }

          <div
            className={classnames('moveable-settings__section', {
              'active': openSection === MOVEABLE_SETTINGS_SECTIONS.LAYER,
            })}
            onClick={() => handleSettingSectionClick(MOVEABLE_SETTINGS_SECTIONS.LAYER)}
          >
            <LayersIcon className='moveable-settings__section-icon' />
          </div>

          <div
            className='moveable-settings__section'
            onClick={() => setOpenSection(null)}
          >
            <FileCopyIcon className='moveable-settings__section-icon' />
          </div>

          <div
            className='moveable-settings__section'
            onClick={() => setOpenSection(null)}
          >
            <DeleteIcon className='moveable-settings__section-icon' />
          </div>

          {dropDown}

        </div>
      </ClickAwayListener>
    );
}

export default MoveableSettings;