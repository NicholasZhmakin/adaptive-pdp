import React, { useEffect, useRef, useState } from "react";
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import Moveable from "react-moveable";
import { Frame } from "scenejs";
import { ClickAwayListener } from '@material-ui/core';
import TextareaAutosize from 'react-textarea-autosize';

import './MoveableComponent.scss';


const MoveableNestedComponent = ({
  bannerItem,
                                   bannerItemIndex,
                                   frameRef,
                                   moveableRef,
                                   moveableItemRef,

                                   container,
                                   containerFrameRef,
                                   containerItemRef,
                                   containerMoveableRef,

                                   nestedBannerItems,
                                   nestedFrameRefs,
                                   nestedMoveableRefs,
                                   nestedItemRefs,
  selectedBannerItem,
  setSelectedBannerItem,
  setIsDraggableForContainer,
  changeBannerItemText,
  changeBannerItemStylesField,
  replaceBannerItemStyles,
                                   setDirectStylesForContainerBanner,
}) => {


    const staticTopValueForDragRef = useRef(null);
    const staticLeftValueForDragRef = useRef(null);

    const maxTopRotateRef = useRef(null);

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

    const getPixelsByAngle = (x, y, width, height, angle) => {
      const radians = angle * Math.PI / 180;

      return [
        Math.min(
          y + height/2 + width/-2 * Math.sin(radians) + height/-2 * Math.cos(radians),
          y + height/2 + width/2 * Math.sin(radians) + height/-2 * Math.cos(radians),
          y + height/2 + width/2 * Math.sin(radians) + height/2 * Math.cos(radians),
          y + height/2 + width/-2 * Math.sin(radians) + height/2 * Math.cos(radians)
        ),
        Math.max(
          y + height/2 + width/-2 * Math.sin(radians) + height/-2 * Math.cos(radians),
          y + height/2 + width/2 * Math.sin(radians) + height/-2 * Math.cos(radians),
          y + height/2 + width/2 * Math.sin(radians) + height/2 * Math.cos(radians),
          y + height/2 + width/-2 * Math.sin(radians) + height/2 * Math.cos(radians)
        ),
        Math.min(
          x + width/2 + width/-2 * Math.cos(radians) - height/-2 * Math.sin(radians),
          x + width/2 + width/2 * Math.cos(radians) - height/-2 * Math.sin(radians),
          x + width/2 + width/2 * Math.cos(radians) - height/2 * Math.sin(radians),
          x + width/2 + width/-2 * Math.cos(radians) - height/2 * Math.sin(radians)
        ),
        Math.max(
          x + width/2 + width/-2 * Math.cos(radians) - height/-2 * Math.sin(radians),
          x + width/2 + width/2 * Math.cos(radians) - height/-2 * Math.sin(radians),
          x + width/2 + width/2 * Math.cos(radians) - height/2 * Math.sin(radians),
          x + width/2 + width/-2 * Math.cos(radians) - height/2 * Math.sin(radians)
        ),
      ];
    }

    const onDrag = ({target, top, left, height, width, beforeDelta}) => {
      frameRef.current.set("left", `${left}px`);
      frameRef.current.set("top", `${top}px`);
      const deg = parseFloat(frameRef.current.get("transform", "rotate")) + beforeDelta;

      autoResizeWhenDrag(top, left, height, width, deg);

      setTransform(target);
    };


    const autoResizeWhenDrag = (top, left, height, width, deg) => {
      const {
        top: containerTop,
        left: containerLeft,
        width: containerWidth,
        height: containerHeight,
      } = container.styles;

      const [
        maxTopPoint,
        maxBottomPoint,
        maxLeftPoint,
        maxRightPoint
      ] = getPixelsByAngle(left, top, width, height, parseInt(deg));

      // Top
      if (maxTopPoint < 0 && !staticTopValueForDragRef.current) {
        staticTopValueForDragRef.current = top;
      }

      if (staticTopValueForDragRef.current) {
        frameRef.current.set("top", `${parseInt(staticTopValueForDragRef.current)}px`);
        updateSiblings('top', maxTopPoint);
        containerFrameRef.current.set("top", `${parseInt(containerTop) - Math.abs(maxTopPoint)}px`)
        containerFrameRef.current.set("height", `${parseInt(containerHeight) + Math.abs(maxTopPoint)}px`)
      }

      if (maxTopPoint >= 0) {
        staticTopValueForDragRef.current = null;
      }

      //Left
      if (maxLeftPoint < 0 && !staticLeftValueForDragRef.current) {
        staticLeftValueForDragRef.current = left;
      }

      if (staticLeftValueForDragRef.current) {
        frameRef.current.set("left", `${parseInt(staticLeftValueForDragRef.current)}px`);
        updateSiblings('left', maxLeftPoint);
        containerFrameRef.current.set("left", `${parseInt(containerLeft) - Math.abs(maxLeftPoint)}px`)
        containerFrameRef.current.set("width", `${parseInt(containerWidth) + Math.abs(maxLeftPoint)}px`)
      }

      if (maxLeftPoint >= 0) {
        staticLeftValueForDragRef.current = null;
      }

      // Bottom
      if (maxBottomPoint > parseInt(containerHeight)) {
        containerFrameRef.current.set("height", `${parseInt(containerHeight) + Math.abs(parseInt(containerHeight) - maxBottomPoint)}px`)
      }

      // Right
      if (maxRightPoint > parseInt(containerWidth)) {
        containerFrameRef.current.set("width", `${parseInt(containerWidth) + Math.abs(parseInt(containerWidth) - maxRightPoint)}px`)
      }

      containerItemRef.current.style.cssText = containerFrameRef.current.toCSS();
    }

    const onRotate = ({target, drag, beforeDelta}) => {
      const deg = parseFloat(frameRef.current.get("transform", "rotate")) + beforeDelta;
      frameRef.current.set("transform", "rotate", `${deg}deg`);
      const {left, top, width, height} = drag;

      autoResizeWhenRotate(top, left, height, width, deg);

      setTransform(target);
    };

  const autoResizeWhenRotate = (top, left, height, width, deg) => {
    const {
      top: containerTop,
      left: containerLeft,
      width: containerWidth,
      height: containerHeight,
    } = container.styles;

    const [
      maxTopPoint,
      maxBottomPoint,
      maxLeftPoint,
      maxRightPoint
    ] = getPixelsByAngle(left, top, width, height, parseInt(deg));

    // Top
    if (maxTopPoint < 0) {
      frameRef.current.set("top", `${top + Math.abs(maxTopPoint)}px`);
      updateSiblings('top', maxTopPoint);
      containerFrameRef.current.set("top", `${parseInt(containerTop) - Math.abs(maxTopPoint)}px`)
      containerFrameRef.current.set("height", `${parseInt(containerHeight) + Math.abs(maxTopPoint)}px`)
    }

    // Left
    if (maxLeftPoint < 0) {
      frameRef.current.set("left", `${left + Math.abs(maxLeftPoint)}px`);
      updateSiblings('left', maxLeftPoint);
      containerFrameRef.current.set("left", `${parseInt(containerLeft) - Math.abs(maxLeftPoint)}px`)
      containerFrameRef.current.set("width", `${parseInt(containerWidth) + Math.abs(maxLeftPoint)}px`)
    }

    // Bottom
    if (maxBottomPoint > parseInt(containerHeight)) {
      containerFrameRef.current.set("height", `${parseInt(containerHeight) + Math.abs(parseInt(containerHeight) - maxBottomPoint)}px`)
    }

    // Right
    if (maxRightPoint > parseInt(containerWidth)) {
      containerFrameRef.current.set("width", `${parseInt(containerWidth) + Math.abs(parseInt(containerWidth) - maxRightPoint)}px`)
    }

    containerMoveableRef.current?.updateRect();
    containerItemRef.current.style.cssText = containerFrameRef.current.toCSS();
  }

    const onResize = ({target, width, height, drag}) => {
      frameRef.current.set("width", `${width}px`);
      frameRef.current.set("height", `${height}px`);
      frameRef.current.set("top", `${drag.top}px`);
      frameRef.current.set("left", `${drag.left}px`);
      
      setTransform(target);
    };

   const handleEndAction = ({target}) => {

     const nestedResult = nestedBannerItems.map((item, itemIndex) => {
         return ({
           id: item.id,
           styles: nestedFrameRefs[itemIndex]?.current.properties
         })
       })

     const containerResult = {
       id: bannerItem.containerId,
       styles: containerFrameRef?.current.properties
     }

     replaceBannerItemStyles(bannerItem.id, frameRef.current.properties, bannerItem.containerId);
     setDirectStylesForContainerBanner(containerResult, nestedResult);
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

  const updateSiblings = (fieldName, value) => {
    nestedFrameRefs.forEach((frame, index) => {
      if (index !== bannerItemIndex) {
        frame.current.set(fieldName, `${parseInt(nestedBannerItems[index].styles[fieldName]) + Math.abs(value)}px`)
      }
    })

    nestedMoveableRefs.forEach((item, index) => {
      if (index !== bannerItemIndex) {
        item.current?.updateRect();
      }
    })

    nestedItemRefs.forEach((item, index) => {
      if (index !== bannerItemIndex) {
        item.current.style.cssText = nestedFrameRefs[index].current.toCSS();
      }
    })
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
          target={moveableItemRef?.current}
          dragArea={false}
          container={null}
          edge={false}
          draggable={!isTextAreaActive}
          scalable={false}
          resizable={true}
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
            className='moveable__item'
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

export default MoveableNestedComponent;