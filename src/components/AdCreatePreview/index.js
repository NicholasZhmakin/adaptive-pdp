import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { arrayDnd, sizesMockData } from "./mockData";
import Cropper from 'react-easy-crop';
import cloneDeep from 'lodash/cloneDeep';
import useDebounce from '../useDebounce';
import { useLayerFunctions } from '../CustomHooks/LayerFunctions';
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
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [cropComplete, setCropComplete] = useState({ xComplete: 0, yComplete: 0 });
    const [zoom, setZoom] = useState(1);

    const [cropAreaDimensionAndPosition, setCropAreaDimensionAndPosition] = useState({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    const debounceSelectedBannerItem = useDebounce(selectedBannerItem, 200)

    useEffect(() => {
      const containerDimension = videoRef.current.containerRect;
      const cropAreaDimension = videoRef.current.state.cropSize;

      if (containerDimension && cropAreaDimension) {
        setCropAreaDimensionAndPosition({
          x: (containerDimension.width - cropAreaDimension.width) / 2,
          y: (containerDimension.height - cropAreaDimension.height) / 2,
          width: cropAreaDimension.width,
          height: cropAreaDimension.height,
        });
      }
    }, [videoRef.current?.state.cropSize]);

    useEffect(() => {
        setBannerItems(cloneDeep(arrayDnd));
    }, []);

  useEffect(() => {
    if (debounceSelectedBannerItem) {
      const cloneBannerItems = cloneDeep(bannerItems);

      if (debounceSelectedBannerItem.hasOwnProperty('containerId')) {
        const neededContainer = cloneBannerItems.find((item) => item.id === debounceSelectedBannerItem.containerId);
        const neededBannerItem = neededContainer.nestedBannerItems.find((item) => item.id === debounceSelectedBannerItem.id);

        neededBannerItem.styles = debounceSelectedBannerItem.styles;
        neededBannerItem.text = debounceSelectedBannerItem.text;
      } else {
        const neededBannerItem = cloneBannerItems.find((item) => item.id === debounceSelectedBannerItem.id);

        neededBannerItem.styles = debounceSelectedBannerItem.styles;
        neededBannerItem.text = debounceSelectedBannerItem.text;
      }

      console.log(cloneBannerItems);
      setBannerItems(cloneBannerItems);
    }
  }, [debounceSelectedBannerItem]);

  const setIsDraggableForContainer = (containerId, value) => {
    const cloneBannerItems = cloneDeep(bannerItems);
    const neededContainer = cloneBannerItems.find((item) => item.id === containerId);

    neededContainer.isDraggable = value;
    setBannerItems(cloneBannerItems);
  };

  const changeBannerItemStylesField = (fieldName, fieldValue, containerId) => {
    if (selectedBannerItem) {

      if (containerId) {
        setSelectedBannerItem({
          ...selectedBannerItem,
          containerId,
          styles: {
            ...selectedBannerItem.styles,
            [fieldName]: fieldValue,
          }
        });
      } else {
        setSelectedBannerItem({
          ...selectedBannerItem,
          styles: {
            ...selectedBannerItem.styles,
            [fieldName]: fieldValue,
          }
        });
      }

    }
  };

  const [changeBannerItemLayerOrder, changeNestedBannerItemLayerOrder] = useLayerFunctions(bannerItems, changeBannerItemStylesField, setBannerItems);

  const handleBannerItemLayerOrder = (bannerItem, value) => {
    if (bannerItem.hasOwnProperty('containerId')) {
      changeNestedBannerItemLayerOrder(bannerItem, value)
    } else {
      changeBannerItemLayerOrder(bannerItem, value);
    }
  }

    const replaceBannerItemStyles = (bannerItemId, newStylesString, containerId) => {
      const result = {};
      const attributes = newStylesString.trim().split(';');

      for (let i = 0; i < attributes.length; i++) {
          let entry = attributes[i].split(':');
          result[entry.splice(0,1)[0].trim()] = entry.join(':').trim();
      }

      if (containerId) {
        setSelectedBannerItem({
          ...selectedBannerItem,
          containerId,
          styles: result,
        });
      } else {
        setSelectedBannerItem({
          ...selectedBannerItem,
          styles: result,
        });
      }
    }

    const changeBannerItemText = (bannerItemId, newText, containerId) => {
      if (containerId) {
        setSelectedBannerItem({
          ...selectedBannerItem,
          containerId,
          text: newText,
        });
      } else {
        setSelectedBannerItem({
          ...selectedBannerItem,
          text: newText,
        });
      }
    }

  const duplicateBannerItem = (bannerItem, deleteContainer) => {
    let cloneBannerItems = cloneDeep(bannerItems);
    const cloneBannerItem = cloneDeep(bannerItem);
    const lastIndexZ = cloneBannerItems.reduce((max, current) => (current.styles['z-index'] > max ? current.styles['z-index'] : max), 0);

    if (bannerItem.type === 'container') {
      const newContainerId = uuidv4();

      setBannerItems([
        ...cloneBannerItems,
        {
          ...cloneBannerItem,
          id: newContainerId,
          nestedBannerItems: cloneBannerItem.nestedBannerItems.map((nestedBannerItem) => ({
            ...nestedBannerItem,
            id: uuidv4(),
            containerId: newContainerId,
          })),
          styles: {
            ...cloneBannerItem.styles,
            'top': `${parseInt(cloneBannerItem.styles.top) + 10}px`,
            'z-index': Number(lastIndexZ) + 1,
          }
        }
      ]);
    } else {

      let positionTop = `${parseInt(cloneBannerItem.styles.top) + 10}px`;
      let positionLeft = cloneBannerItem.styles.left;
      let neededContainer;

      if (cloneBannerItem.hasOwnProperty('containerId')) {
        neededContainer = cloneBannerItems.find((item) => item.id === cloneBannerItem.containerId);

        positionTop = `${parseInt(cloneBannerItem.styles.top) + parseInt(neededContainer.styles.top) + 10}px`;
        positionLeft = `${parseInt(cloneBannerItem.styles.left) + parseInt(neededContainer.styles.left)}px`;

        delete cloneBannerItem.containerId;
      }

      setBannerItems([
        ...
          deleteContainer ?
           cloneBannerItems.filter((bannerItem) => bannerItem.id !== neededContainer.id) :
           cloneBannerItems,
        {
          ...cloneBannerItem,
          id: uuidv4(),
          styles: {
            ...cloneBannerItem.styles,
            top: positionTop,
            left: positionLeft,
            'z-index': deleteContainer ? neededContainer.styles['z-index'] : Number(lastIndexZ) + 1,
          }
        }
      ]);
    }

    setSelectedBannerItem(null);
  }

    const deleteBannerItem = (bannerItemId, bannerItemIndexZ, containerId) => {
      const cloneBannerItems = cloneDeep(bannerItems);

      if (containerId) {
        const neededContainer = cloneBannerItems.find((item) => item.id === containerId);
        neededContainer.nestedBannerItems = neededContainer.nestedBannerItems.filter((bannerItem) => bannerItem.id !== bannerItemId);
        setBannerItems(cloneBannerItems);

        if (neededContainer.nestedBannerItems.length <= 1) {
          console.log("ONE")
          duplicateBannerItem(neededContainer.nestedBannerItems[0], 'delete');
        }



      } else {
        cloneBannerItems.forEach((bannerItem) => {
          if (Number(bannerItem.styles['z-index']) > bannerItemIndexZ) {
            bannerItem.styles['z-index'] = Number(bannerItem.styles['z-index']) - 1;
          }
        })

        setBannerItems(cloneBannerItems.filter((bannerItem) => bannerItem.id !== bannerItemId));
      }

      setSelectedBannerItem(null);
    }

    const findBannerContainerItem = () => {
      if (selectedBannerItem?.hasOwnProperty('containerId')) {
        const cloneBannerItems = cloneDeep(bannerItems);

        return cloneBannerItems.find((item) => item.id === selectedBannerItem.containerId);
      } else {
        return undefined;
      }
    }
    
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
          <div
            className='adCreatePreview__container'
            ref={containerRef}
          >
              <Cropper
                ref={videoRef}
                video={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=10,20'}
                crop={crop}
                zoom={zoom}
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
                    controls: false,
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
                    bannerContainerItem={findBannerContainerItem()}
                    lastIndexZ={bannerItems.length}
                    cropAreaDimensionAndPosition={cropAreaDimensionAndPosition}
                    changeBannerItemStylesField={changeBannerItemStylesField}
                    handleBannerItemLayerOrder={handleBannerItemLayerOrder}
                    duplicateBannerItem={duplicateBannerItem}
                    deleteBannerItem={deleteBannerItem}
                  />
                }

                {bannerItems.map((bannerItem, index) =>
                  <MoveableComponent
                    key={bannerItem.id}
                    bannerItem={bannerItem.id === selectedBannerItem?.id ? selectedBannerItem : bannerItem}
                    selectedBannerItem={selectedBannerItem}
                    setSelectedBannerItem={setSelectedBannerItem}
                    setIsDraggableForContainer={setIsDraggableForContainer}
                    changeBannerItemText={changeBannerItemText}
                    changeBannerItemStylesField={changeBannerItemStylesField}
                    replaceBannerItemStyles={replaceBannerItemStyles}
                  />
                )}
              </div>
            </ClickAwayListener>

          </div>

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