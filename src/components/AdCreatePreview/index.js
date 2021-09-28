import React, { useState, useEffect, useRef } from 'react';
import { arrayDnd, sizesMockData } from "./mockData";
import Cropper from 'react-easy-crop';
import cloneDeep from 'lodash/cloneDeep';
import MoveableComponent from "../MoveableComponent";
import MoveableSettings from "../MoveableSettings";
import { SVG } from '@svgdotjs/svg.js'


import './AdCreatePreview.scss';
import {ClickAwayListener} from '@material-ui/core';
import {addFontFace, splitGradientString} from '../helpers';

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

    const changeBannerItemStylesField = (bannerItemId, fieldName, fieldValue) => {
        const cloneBannerItems = cloneDeep(bannerItems);
        const neededBannerItem = cloneBannerItems.find((item) => item.id === bannerItemId);

        neededBannerItem.styles[fieldName] = fieldValue;
        setSelectedBannerItem(neededBannerItem);
        setBannerItems(cloneBannerItems);
    };

    const replaceBannerItemStyles = (bannerItemId, newStylesString) => {
        const result = {};
        const attributes = newStylesString.trim().split(';');

        for (let i = 0; i < attributes.length; i++) {
            let entry = attributes[i].split(':');
            result[entry.splice(0,1)[0].trim()] = entry.join(':').trim();
        }

        const cloneBannerItems = cloneDeep(bannerItems);
        const neededBannerItem = cloneBannerItems.find((item) => item.id === bannerItemId);

        neededBannerItem.styles = result;
        setBannerItems(cloneBannerItems);
    }

    const changeBannerItemText = (bannerItemId, newText) => {
        const cloneBannerItems = cloneDeep(bannerItems);
        const neededBannerItem = cloneBannerItems.find((item) => item.id === bannerItemId);

        neededBannerItem.text = newText;
        setBannerItems(cloneBannerItems);
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


    const drawSVG = () => {
        drawSVGButton(bannerItems[0]);
        drawSVGOverlay(bannerItems[1]);
    }

    const drawSVGOverlay = (element) => {
        const styles = element.styles;
        const svg = SVG().addTo('.adCreatePreview__svgs').size(parseInt(styles.width) + 10, parseInt(styles.height) + 10);
        const rotate = parseInt(styles.transform.substring(styles.transform.indexOf('(') + 1));

        svg
          .image(element.image.url)
          .size(styles.width, styles.height)
          .move(5, 5)
          .transform({
              rotate: rotate,
          })
    }

    const drawSVGButton = (element) => {
        const styles = element.styles;
        const svg = SVG().addTo('.adCreatePreview__svgs').size(parseInt(styles.width) + 10, parseInt(styles.height) + 10);

        const elementBackground = getElementBackground(svg, styles['background'], parseInt(styles.width), parseInt(styles.height));

        svg
          .rect()
          .size(styles.width, styles.height)
          .radius(styles['border-radius'])
          .move(5, 5)
          .fill({ color: elementBackground, opacity: 1 })
          .stroke({ color: styles['border-color'], opacity: styles['border-opacity'], width: styles['border-width']})

        svg
          .style(`@import url(${element.font.url})`)

        svg
          .text(element.text)
          .move(parseInt(styles.width) / 2, 10)
          .fill(styles.color)
          .font({
              family: styles['font-family'],
              size: styles['font-size'],
              weight: styles['font-weight'],
              anchor: 'middle'
          })
    }

    const getElementBackground = (svg, background, width, height) => {
        if (background.includes('gradient')) {
            const [gradientType, gradientAnglePoint, gradientPalettes] = splitGradientString(background);

            const gradient = svg
              .gradient(gradientType, (add) => {
                    gradientPalettes.forEach((palette) => {
                        add.stop((palette.position / 100), palette.color);
                    });
                })
              .attr({
                gradientTransform: `rotate(${parseInt(gradientAnglePoint)})`,
                })
              .from(0, 0)
              .to(0, 0);

            return gradient;
        } else {
            return background;
        }
    }

    return (
      <div className='adCreatePreview'>
          <ClickAwayListener onClickAway={() => setSelectedBannerItem(null)}>
              <div
                className='adCreatePreview__container'
                ref={containerRef}
              >
                  <Cropper
                    ref={videoRef}
                    video={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
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
                      selectedBannerItem={selectedBannerItem}
                      handleSelectBannerItem={setSelectedBannerItem}
                      changeBannerItemText={changeBannerItemText}
                      replaceBannerItemStyles={replaceBannerItemStyles}
                    />
                  )}
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

          <button className='adCreatePreview__draw-btn' onClick={drawSVG}>Draw</button>

          <div className='adCreatePreview__svgs'>

          </div>
      </div>
    );
}

export default AdCreatePreview;