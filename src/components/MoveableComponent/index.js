import React, { useEffect, useRef, useState } from "react";
import classnames from 'classnames';
import Moveable from "react-moveable";
import { Frame } from "scenejs";

import './MoveableComponent.scss';
import { ClickAwayListener } from '@material-ui/core';
import TextareaAutosize from 'react-textarea-autosize';


const MoveableComponent = ({
  bannerItem,
  containerItemId,
  selectedBannerItemId,
  replaceBannerItemStyles,
  setIsDraggableForContainer,
  changeBannerItemText,
  setSelectedBannerItem,
  changeBannerItemStylesField,
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
      moveableRef.current?.updateRect( );
    }, [bannerItem.styles['height']]);

    useEffect(() => {
      changeBannerItemStylesField(bannerItem.id, 'height', `${textareaRef.current?.offsetHeight}px`);
    }, [bannerItem.text]);

    useEffect(() => {
      changeBannerItemStylesField(bannerItem.id, 'height', `${textRef.current?.offsetHeight}px`);
    }, [bannerItem.styles['font-size'], bannerItem.styles['font-family'], bannerItem.styles['font-weight']]);

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

  const isNeedToDisableDraggable = () => {
     if (bannerItem.type === 'container') {
       return bannerItem.isDraggable;
     } else {
       return !isTextAreaActive;
     }
  }

  const handleTextareaActivation = (value) => {
    setIsTextAreaActive(value);

    if (containerItemId) {
      setIsDraggableForContainer(containerItemId, !value);
    }
  }

  const handleTextChange = (e) => {
    changeBannerItemText(bannerItem.id, e.target.value, containerItemId);
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
          'selected': selectedBannerItemId === bannerItem.id,
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