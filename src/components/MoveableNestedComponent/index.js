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


    const maxTopRef = useRef(null);

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
      [
        x + width/2 + width/-2 * Math.cos(radians) - height/-2 * Math.sin(radians),
        x + width/2 + width/2 * Math.cos(radians) - height/-2 * Math.sin(radians),
        x + width/2 + width/2 * Math.cos(radians) - height/2 * Math.sin(radians),
        x + width/2 + width/-2 * Math.cos(radians) - height/2 * Math.sin(radians)
      ],
      [
        y + height/2 + width/-2 * Math.sin(radians) + height/-2 * Math.cos(radians),
        y + height/2 + width/2 * Math.sin(radians) + height/-2 * Math.cos(radians),
        y + height/2 + width/2 * Math.sin(radians) + height/2 * Math.cos(radians),
        y + height/2 + width/-2 * Math.sin(radians) + height/2 * Math.cos(radians)
      ]
    ];
  }


    const onDrag = ({target, top, left, height, width, beforeDelta}) => {
      frameRef.current.set("left", `${left}px`);
      frameRef.current.set("top", `${top}px`);

      const deg = parseFloat(frameRef.current.get("transform", "rotate")) + beforeDelta;


      autoResizeContainerBannerItem(top, left, height, width, deg);

      setTransform(target);

    };


    const autoResizeContainerBannerItem = (top, left, height, width, deg) => {
      const {
        top: containerTop,
        left: containerLeft,
        width: containerWidth,
        height: containerHeight,
      } = container.styles;

      const maxUpperPoint = Math.min(...getPixelsByAngle(left, top, width, height, parseInt(deg))[1]);
      const minUpperPoint = Math.max(...getPixelsByAngle(left, top, width, height, parseInt(deg))[1]);

      if (maxUpperPoint < 0 && !maxTopRef.current) {
        maxTopRef.current = top;
      }

      if (maxTopRef.current) {
        frameRef.current.set("top", `${parseInt(maxTopRef.current)}px`);


        nestedFrameRefs.forEach((frame, index) => {
          if (index !== bannerItemIndex) {
            frame.current.set("top", `${parseInt(nestedBannerItems[index].styles.top) + Math.abs(maxUpperPoint)}px`)
          }
        })

        containerFrameRef.current.set("top", `${parseInt(containerTop) - Math.abs(maxUpperPoint)}px`)
        containerFrameRef.current.set("height", `${parseInt(containerHeight) + Math.abs(maxUpperPoint)}px`)
      }

      if (maxUpperPoint >= 0) {
        maxTopRef.current = null;
      }

      if (minUpperPoint > parseInt(containerHeight)) {
        containerFrameRef.current.set("height", `${parseInt(containerHeight) + Math.abs(parseInt(containerHeight) - minUpperPoint)}px`)
      }


      nestedMoveableRefs.forEach((item, index) => {
        if (index !== bannerItemIndex) {
          item.current?.updateRect();
        }
      })

      containerItemRef.current.style.cssText = containerFrameRef.current.toCSS();

      nestedItemRefs.forEach((item, index) => {
        if (index !== bannerItemIndex) {
          item.current.style.cssText = nestedFrameRefs[index].current.toCSS();
        }
      })

    }

    const onRotate = ({target, drag, beforeDelta}) => {
      const deg = parseFloat(frameRef.current.get("transform", "rotate")) + beforeDelta;
      frameRef.current.set("transform", "rotate", `${deg}deg`);
      const {left, top, width, height} = drag;

      const {
        top: containerTop,
        left: containerLeft,
        width: containerWidth,
        height: containerHeight,
      } = container.styles;

      const maxUpperPoint = Math.min(...getPixelsByAngle(left, top, width, height, parseInt(deg))[1]);
      const minUpperPoint = Math.max(...getPixelsByAngle(left, top, width, height, parseInt(deg))[1]);


      if (maxUpperPoint < 0) {
        frameRef.current.set("top", `${top + Math.abs(maxUpperPoint)}px`);
        containerFrameRef.current.set("top", `${parseInt(containerTop) - Math.abs(maxUpperPoint)}px`)
        containerFrameRef.current.set("height", `${parseInt(containerHeight) + Math.abs(maxUpperPoint)}px`)
      }

      if (minUpperPoint > parseInt(containerHeight)) {
        containerFrameRef.current.set("height", `${parseInt(containerHeight) + Math.abs(parseInt(containerHeight) - minUpperPoint)}px`)
      }


      containerMoveableRef.current?.updateRect();
      containerItemRef.current.style.cssText = containerFrameRef.current.toCSS();
      setTransform(target);
    };

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