import React, { useState, useEffect, useRef } from 'react';
import { arrayDnd, sizesMockData } from "./mockData";
import Cropper from 'react-easy-crop';
import cloneDeep from 'lodash/cloneDeep';
import MoveableComponent from "../MoveableComponent";
import MoveableSettings from "../MoveableSettings";
import { ClickAwayListener } from '@material-ui/core';

import './AdCreatePreview.scss';

const zoomSettings = {
    step: 0.03,
    min: 1,
    max: 3,
};

const AdCreatePreview = () => {

    const containerRef = useRef(null);
    const videoRef = useRef(null);

    const [bannerItems,  setBannerItems] = useState([]);
    const [selectedBannerItem,  setSelectedBannerItem] = useState(null);

    const [isMediaLoaded, setIsMediaLoaded] = useState(false);
    const [aspect, setAspect] = useState(1200 / 1500);
    // const [cropSize, setCropSize] = useState({ width: 600, height: 400});
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [cropComplete, setCropComplete] = useState({ xComplete: 0, yComplete: 0 });
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        setBannerItems(cloneDeep(arrayDnd));
    }, []);

  const setIsDraggableForContainer = (containerId, value) => {
    const cloneBannerItems = cloneDeep(bannerItems);
    const neededContainer = cloneBannerItems.find((item) => item.id === containerId);

    neededContainer.isDraggable = value;
    setBannerItems(cloneBannerItems);
  };

    const changeBannerItemStylesField = (bannerItemId, fieldName, fieldValue) => {
        const cloneBannerItems = cloneDeep(bannerItems);
        const neededBannerItem = cloneBannerItems.find((item) => item.id === bannerItemId);

        neededBannerItem.styles[fieldName] = fieldValue;
        setSelectedBannerItem(neededBannerItem);
        setBannerItems(cloneBannerItems);
    };

    const replaceBannerItemStyles = (bannerItemId, newStylesString, containerId) => {
        const result = {};
        const attributes = newStylesString.trim().split(';');

        for (let i = 0; i < attributes.length; i++) {
            let entry = attributes[i].split(':');
            result[entry.splice(0,1)[0].trim()] = entry.join(':').trim();
        }

        const cloneBannerItems = cloneDeep(bannerItems);

        if (containerId) {
          const neededContainer = cloneBannerItems.find((item) => item.id === containerId);
          const neededBannerItem = neededContainer.nestedBannerItems.find((item) => item.id === bannerItemId);

          neededBannerItem.styles = result;
          setBannerItems(cloneBannerItems);
        } else {
          const neededBannerItem = cloneBannerItems.find((item) => item.id === bannerItemId);

          neededBannerItem.styles = result;
        }

      setBannerItems(cloneBannerItems);
    }

    const changeBannerItemText = (bannerItemId, newText, containerId) => {
        const cloneBannerItems = cloneDeep(bannerItems);

        if (containerId) {
          const neededContainer = cloneBannerItems.find((item) => item.id === containerId);
          const neededBannerItem = neededContainer.nestedBannerItems.find((item) => item.id === bannerItemId);

          neededBannerItem.text = newText;
          // neededBannerItem.styles['height'] = height;
        } else {
          const neededBannerItem = cloneBannerItems.find((item) => item.id === bannerItemId);

          neededBannerItem.text = newText;
          // console.log(height);
          // neededBannerItem.styles['height'] = height;
        }

      setBannerItems(cloneBannerItems);
    }

    const getNewBannerItemHeight = () => {

    };

    const handleMediaLoaded = () => {
        setIsMediaLoaded(true);
    };

    const handleZoomChange = (value) => {
        if (value >= zoomSettings.min && value <= zoomSettings.max && isMediaLoaded) {
            setZoom(value);
        }
    };

    const handleCropChange = (value) => {
        if (isMediaLoaded) {
            setCrop({
                x: value.x,
                y: value.y,
            });
        }
    };

    const handleCropComplete = (value) => {
        if (isMediaLoaded) {
            setCropComplete({
                xComplete: value.x,
                yComplete: value.y,
            });
        }
    };

    const handleSizeChange = (size) => {
        setAspect(size.width / size.height);
    };

    return (
      <div className='adCreatePreview'>
          <ClickAwayListener onClickAway={() => setSelectedBannerItem(null)}>
              <div
                className='adCreatePreview__container'
                ref={containerRef}
              >
                  <Cropper
                    ref={videoRef}
                    video={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=10,20'}
                    crop={crop}
                    zoom={zoom}
                    // cropSize={cropSize}
                    aspect={aspect}
                    onCropChange={(value) => handleCropChange(value)}
                    showGrid={false}
                    onMediaLoaded={handleMediaLoaded}
                    onCropComplete={(value) => handleCropComplete(value)}
                    onZoomChange={(value) => handleZoomChange(value)}
                    zoomWithScroll={true}
                    minZoom={zoomSettings.min}
                    maxZoom={zoomSettings.max}
                    zoomSpeed={zoomSettings.step * 10}
                    mediaProps={{
                        controls: true,
                        autoPlay: false,
                    }}
                  />

                  {!isMediaLoaded &&
                    <div className='adCreatePreview__preloader'>
                        <p className='adCreatePreview__preloader-text'>Video is preparing, please wait...</p>
                    </div>
                  }

                <ClickAwayListener onClickAway={() => setSelectedBannerItem(null)}>
                  <div>
                    {selectedBannerItem &&
                      <MoveableSettings
                        bannerItem={selectedBannerItem}
                        changeBannerItemStylesField={changeBannerItemStylesField}
                      />
                    }

                    {bannerItems.map((bannerItem, index) =>
                      <MoveableComponent
                        key={bannerItem.id}
                        bannerItem={bannerItem}
                        selectedBannerItemId={selectedBannerItem?.id}
                        setSelectedBannerItem={setSelectedBannerItem}
                        setIsDraggableForContainer={setIsDraggableForContainer}
                        changeBannerItemText={changeBannerItemText}
                        replaceBannerItemStyles={replaceBannerItemStyles}
                        changeBannerItemStylesField={changeBannerItemStylesField}
                      />
                    )}
                  </div>
                </ClickAwayListener>

              </div>
          </ClickAwayListener>

          <div className='adCreatePreview__controls'>
              <button className='button-svg-test' onClick={() => videoRef.current.videoRef.play()}>Play</button>
              <button onClick={() => videoRef.current.videoRef.pause()}>Pause</button>
          </div>

          <div className='adCreatePreview__sizes'>
              {sizesMockData.map((size, index) => (
                <p
                  key={index}
                  className='adCreatePreview__size'
                  onClick={() => handleSizeChange(size)}
                >
                    {size.width} X {size.height}
                </p>
              ))}
          </div>
      </div>
    );
}

export default AdCreatePreview;