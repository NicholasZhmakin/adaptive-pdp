import React, { useEffect, useRef, useState } from "react";
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import Moveable from "react-moveable";
import { Frame } from "scenejs";
import { ClickAwayListener } from '@material-ui/core';
import TextareaAutosize from 'react-textarea-autosize';

import './MoveableComponent.scss';


const MoveableComponent = ({
  bannerItem,
  containerBanner,
  containerFrameRef,
  containerRef,
  selectedBannerItem,
  setSelectedBannerItem,
  setIsDraggableForContainer,
  changeBannerItemText,
  changeBannerItemStylesField,
  replaceBannerItemStyles,
  setDirectStylesForContainerBanner,
}) => {

    const frameRef = useRef(null);
    const moveableRef = useRef(null);
    const moveableItemRef = useRef(null);
    const textareaRef = useRef(null);
    const textRef = useRef(null);

    const [isTextAreaActive, setIsTextAreaActive] = useState(false);

    useEffect(() => {
      frameRef.current = new Frame({
        ...bannerItem.styles,
      });

      moveableItemRef.current.style.cssText = frameRef.current.toCSS();
    }, [bannerItem.styles]);

    useEffect(() => {
      moveableRef.current?.updateRect();
    }, [
      bannerItem.styles['height'],
      bannerItem.styles['left'],
      bannerItem.styles['top'],
    ]);

    useEffect(() => {
      changeBannerItemStylesField('height', `${textareaRef.current?.offsetHeight}px`, bannerItem.containerId)
    }, [bannerItem.text]);

    useEffect(() => {
      changeBannerItemStylesField('height', `${textRef.current?.offsetHeight}px`, bannerItem.containerId)
    }, [
      bannerItem.styles['font-size'],
      bannerItem.styles['font-family'],
      bannerItem.styles['font-weight'],
    ]);

  useEffect(() => {
    const borderWidthNumber = parseInt(bannerItem.styles['border-width']);

    changeBannerItemStylesField('height', `${textRef.current?.offsetHeight + borderWidthNumber}px`, bannerItem.containerId)
  }, [
    bannerItem.styles['border-width']
  ]);

    const handleSelect = (event) => {
      event.stopPropagation();
      setSelectedBannerItem(bannerItem);
    }

    const setTransform = (target) => {
      target.style.cssText = frameRef.current.toCSS();
    }

    const onDrag = ({target, top, left, height, width}) => {
      if (selectedBannerItem?.id === bannerItem.id) {
        frameRef.current.set("left", `${left}px`);
        frameRef.current.set("top", `${top}px`);

        if (bannerItem.hasOwnProperty('containerId')) {
          autoResizeContainerBannerItem(top, left, height, width);
        }

        setTransform(target);
      }
    };


    const autoResizeContainerBannerItem = (top, left, height, width) => {
      const {
        top: containerTop,
        left: containerLeft,
        width: containerWidth,
        height: containerHeight,
      } = containerBanner.styles;

      const itemLastCoordinateX = left + width;
      const itemLastCoordinateY = top + height;

      const cloneNestedBannerItems = cloneDeep(containerBanner.nestedBannerItems);
      const filteredNestedBannerItems = cloneNestedBannerItems.filter((item) => item.id !== bannerItem.id);

      const maxWidthAndLeft = filteredNestedBannerItems.reduce((max, current) => {
        const positionX = parseInt(current.styles.left) + parseInt(current.styles.width);
        return positionX > max ? positionX : max;
      }, 0);

      const maxHeightAndTop = filteredNestedBannerItems.reduce((max, current) => {
        const positionY = parseInt(current.styles.top) + parseInt(current.styles.height);
        return positionY > max ? positionY : max;
      }, 0);


      if (left < 0) {
        frameRef.current.set("left", '0px');
        containerFrameRef.current.set("left", `${parseInt(containerLeft) - Math.abs(left)}px`)
        containerFrameRef.current.set("width", `${parseInt(containerWidth) + Math.abs(left)}px`)
        // if (parseInt(bannerItem.styles.left) !== 0) {
        //   containerFrameRef.current.set("width", `${maxWidthAndLeft + Math.abs(left)}px`)
        // } else {
        //   containerFrameRef.current.set("width", `${parseInt(containerWidth) + Math.abs(left)}px`)
        // }

      } else if (itemLastCoordinateX > parseInt(containerWidth)) {
        containerFrameRef.current.set("width", `${parseInt(containerWidth) + (itemLastCoordinateX - parseInt(containerWidth))}px`)
      } else {
        // if (itemLastCoordinateX > maxWidthAndLeft) {
        //   containerFrameRef.current.set("width", `${itemLastCoordinateX}px`)
        // }
      }


      if (top < 0) {
        frameRef.current.set("top", '0px');
        containerFrameRef.current.set("top", `${parseInt(containerTop) - Math.abs(top)}px`)
        containerFrameRef.current.set("height", `${parseInt(containerHeight) + Math.abs(top)}px`)
        // if (parseInt(bannerItem.styles.left) !== 0) {
        //   containerFrameRef.current.set("height", `${maxHeightAndTop + Math.abs(top)}px`)
        // } else {
        //   containerFrameRef.current.set("height", `${parseInt(containerHeight) + Math.abs(top)}px`)
        // }
      } else if (itemLastCoordinateY > parseInt(containerHeight)) {
        containerFrameRef.current.set("height", `${parseInt(containerHeight) + (itemLastCoordinateY - parseInt(containerHeight))}px`)
      } else {
        // if (itemLastCoordinateY > maxHeightAndTop) {
        //   containerFrameRef.current.set("height", `${itemLastCoordinateY}px`)
        // }
      }


      containerRef.current.style.cssText = containerFrameRef.current.toCSS();
    }

    const onRotate = ({target, beforeDelta }) => {
        const deg = parseFloat(frameRef.current.get("transform", "rotate")) + beforeDelta;

        frameRef.current.set("transform", "rotate", `${deg}deg`);
        setTransform(target);
    };

    const onResize = ({target, width, height, drag}) => {

      if (bannerItem.type === 'container') {

        const maxWidthAndLeft = bannerItem.nestedBannerItems.reduce((max, current) => {
          const positionX = parseInt(current.styles.left) + parseInt(current.styles.width);
          return positionX > max ? positionX : max;
        }, 0);


        const maxHeightAndTop = bannerItem.nestedBannerItems.reduce((max, current) => {
          const positionY = parseInt(current.styles.top) + parseInt(current.styles.height);
          return positionY > max ? positionY : max;
        }, 0);


        if (width > maxWidthAndLeft) {
          frameRef.current.set("width", `${width}px`);
        }

        if (height > maxHeightAndTop) {
          frameRef.current.set("height", `${height}px`);
        }

        frameRef.current.set("top", `${drag.top}px`);
        frameRef.current.set("left", `${drag.left}px`);

      } else {
        frameRef.current.set("width", `${width}px`);
        frameRef.current.set("height", `${height}px`);

      }




      setTransform(target);
    };

   const handleEndAction = ({target}) => {
     if (selectedBannerItem.id === bannerItem.id) {
       replaceBannerItemStyles(bannerItem.id, target.style.cssText, bannerItem.containerId);
       if (containerBanner) {
         setDirectStylesForContainerBanner(containerBanner.id, containerFrameRef?.current.properties);
       }
     }
   }

  const isNeedToDisableDraggable = () => {
     if (bannerItem.type === 'container') {
       return bannerItem.isDraggable;
     } else {
       return !isTextAreaActive;
     }
  }

  const handleTextareaActivation = (value) => {
    setIsTextAreaActive(value);

    if (bannerItem.containerId) {
      setIsDraggableForContainer(bannerItem.containerId, !value);
    }
  }

  const handleTextChange = (e) => {
    changeBannerItemText(bannerItem.id, e.target.value, bannerItem.containerId);
  }

  let content;

   if (bannerItem.type === 'image') {
    content = (
       <img
           className='moveable__image'
           src={bannerItem.image.url}
           alt={'dnd0image'}
       />
     );
   } else if (bannerItem.type === 'container') {
     content = (
       bannerItem.nestedBannerItems.map((nestedBannerItem) => {
         return (
           <MoveableComponent
             key={nestedBannerItem.id}
             bannerItem={nestedBannerItem.id === selectedBannerItem?.id ? selectedBannerItem : nestedBannerItem}
             containerBanner={bannerItem}
             containerFrameRef={frameRef}
             containerRef={moveableItemRef}
             selectedBannerItem={selectedBannerItem}
             setSelectedBannerItem={setSelectedBannerItem}
             setIsDraggableForContainer={setIsDraggableForContainer}
             changeBannerItemText={changeBannerItemText}
             changeBannerItemStylesField={changeBannerItemStylesField}
             replaceBannerItemStyles={replaceBannerItemStyles}
             setDirectStylesForContainerBanner={setDirectStylesForContainerBanner}
           />
         );
       }));
   } else {
     content = (isTextAreaActive ?
       <TextareaAutosize
         ref={textareaRef}
         className={classnames('moveable__textarea', {
           'button': bannerItem.type === 'button',
         })}
         style={{
           color: bannerItem.styles['color'],
           fontSize: bannerItem.styles['font-size'],
           fontFamily: bannerItem.styles['font-family'],
           fontWeight: bannerItem.styles['font-weight'],
           textAlign: bannerItem.styles['text-align'],
         }}
         value={bannerItem.text}
         onChange={handleTextChange}
       /> :
       <span ref={textRef}>
         {bannerItem.text}
       </span>
     )
   }

    return (
      <div
        className={classnames('moveable', {
          'selected': selectedBannerItem?.id === bannerItem.id,
        })}
        onMouseDown={handleSelect}
      >
        <Moveable
          ref={moveableRef}
          target={moveableItemRef.current}
          dragArea={false}
          container={null}
          edge={false}
          draggable={isNeedToDisableDraggable()}
          scalable={false}
          resizable={true}
          renderDirections={bannerItem.type === 'container' ? ['se'] : ["n", "nw", "ne", "s", "se", "sw", "e", "w"]}
          warpable={false}
          rotatable={true}
          origin={false}
          throttleDrag={1}
          throttleRotate={0.2}
          throttleResize={1}
          throttleScale={0.01}
          onDrag={onDrag}
          onResize={onResize}
          onRotate={onRotate}
          onDragEnd={handleEndAction}
          onResizeEnd={handleEndAction}
          onRotateEnd={handleEndAction}
        />

        <ClickAwayListener onClickAway={() => handleTextareaActivation(false)}>
          <div
            ref={moveableItemRef}
            className={classnames('moveable__item', {
              'text': bannerItem.type === 'container' || bannerItem.type === 'text',
            })}
            onDoubleClick={() => handleTextareaActivation(true)}
            style={{
              color: bannerItem.styles['color'],
              fontSize: bannerItem.styles['font-size'],
              fontWeight: bannerItem.styles['font-weight'],
              fontFamily: bannerItem.styles['font-family'],
              textAlign: bannerItem.styles['text-align'],
              borderColor: bannerItem.styles['border-color'],
              borderWidth: bannerItem.styles['border-width'],
              borderRadius: bannerItem.styles['border-radius'],
            }}
          >
            {content}
          </div>
        </ClickAwayListener>
      </div>
    );
}

export default MoveableComponent;