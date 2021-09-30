import React, { useEffect, useRef, useState } from "react";
import classnames from 'classnames';
import Moveable from "react-moveable";
import { Frame } from "scenejs";
import TextElement from './TextElement';

import './MoveableComponent.scss';
import { ClickAwayListener } from '@material-ui/core';


const MoveableComponent = ({
  bannerItem,
  containerItemId,
  selectedBannerItemId,
  replaceBannerItemStyles,
  setIsDraggableForContainer,
  changeBannerItemText,
  setSelectedBannerItem
}) => {

    const frameRef = useRef(null);
    const moveableItemRef = useRef(null);

    const [target, setTarget] = useState(null);
    const [isTextAreaActive, setIsTextAreaActive] = useState(false)

    useEffect(() => {
        setTarget(moveableItemRef.current);
    }, []);

    useEffect(() => {
        frameRef.current = new Frame({
            ...bannerItem.styles,
        });

      moveableItemRef.current.style.cssText = frameRef.current.toCSS();
    }, [bannerItem]);

  const handleSelect = (event) => {
    event.stopPropagation();
    setSelectedBannerItem(bannerItem);
  }

    const setTransform = (target) => {
        target.style.cssText = frameRef.current.toCSS();
    }

    const onDrag = ({target, top, left}) => {
      if (selectedBannerItemId === bannerItem.id) {
        frameRef.current.set("left", `${left}px`);
        frameRef.current.set("top", `${top}px`);

        setTransform(target);
      }
    };

    const onRotate = ({target, beforeDelta }) => {
        const deg = parseFloat(frameRef.current.get("transform", "rotate")) + beforeDelta;

        frameRef.current.set("transform", "rotate", `${deg}deg`);
        setTransform(target);
    };

    const onResize = ({target, width, height}) => {
        frameRef.current.set("width", `${width}px`);
        frameRef.current.set("height", `${height}px`);

        setTransform(target);
    };


   const handleEndAction = ({target}) => {
     if (selectedBannerItemId === bannerItem.id) {
       replaceBannerItemStyles(bannerItem.id, target.style.cssText, containerItemId);
     }
   }

   const handleTextareaActivation = (value) => {
     setIsTextAreaActive(value);

     if (containerItemId) {
       setIsDraggableForContainer(containerItemId, !value);
     }
   }

  const isNeedToDisableDraggable = () => {
     if (bannerItem.type === 'container') {
       return bannerItem.isDraggable;
     } else {
       return !isTextAreaActive;
     }
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
     content = bannerItem.nestedBannerItems.map((nestedBannerItem) => {
       return (
         <MoveableComponent
           key={nestedBannerItem.id}
           containerItemId={bannerItem.id}
           bannerItem={nestedBannerItem}
           selectedBannerItemId={selectedBannerItemId}
           setSelectedBannerItem={setSelectedBannerItem}
           setIsDraggableForContainer={setIsDraggableForContainer}
           changeBannerItemText={changeBannerItemText}
           replaceBannerItemStyles={replaceBannerItemStyles}
         />
       );
     })
   } else {
     content = (
       <TextElement
         isTextAreaActive={isTextAreaActive}
         bannerItem={bannerItem}
         containerItemId={containerItemId}
         changeBannerItemText={changeBannerItemText}
       />
     )
   }

    return (
      <div
        className={classnames('moveable', {
          'selected': selectedBannerItemId === bannerItem.id,
        })}
        onMouseDown={handleSelect}
      >
        <Moveable
          target={target}
          dragArea={false}
          container={null}
          edge={false}
          draggable={isNeedToDisableDraggable()}
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
        <ClickAwayListener onClickAway={() => {
          setSelectedBannerItem(null);
          handleTextareaActivation(false);
        }}>
          <div
            ref={moveableItemRef}
            className={classnames('moveable__item', {
              'text': bannerItem.type === 'container' || bannerItem.type === 'text',
            })}
            onDoubleClick={() => handleTextareaActivation(true)}
            style={{
              color: bannerItem.styles['color'],
              fontSize: bannerItem.styles['font-size'],
              fontFamily: bannerItem.styles['font-family'],
              textAlign: bannerItem.styles['text-align'],
            }}
          >
            {content}
          </div>
        </ClickAwayListener>
      </div>
    );
}

export default MoveableComponent;