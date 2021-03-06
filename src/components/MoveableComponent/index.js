import React, { useEffect, useRef, useState } from "react";
import classnames from 'classnames';
import Moveable from "react-moveable";
import { Frame } from "scenejs";
import { ClickAwayListener } from '@material-ui/core';
import TextareaAutosize from 'react-textarea-autosize';

import './MoveableComponent.scss';


const MoveableComponent = ({
  bannerItem,
  selectedBannerItem,
  setSelectedBannerItem,
  changeBannerItemText,
  changeBannerItemStylesField,
  replaceBannerItemStyles,
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
      changeBannerItemStylesField('height', `${textareaRef.current?.offsetHeight}px`)
    }, [bannerItem.text]);

    useEffect(() => {
      changeBannerItemStylesField('height', `${textRef.current?.offsetHeight}px`)
    }, [
      bannerItem.styles['font-size'],
      bannerItem.styles['font-family'],
      bannerItem.styles['font-weight'],
    ]);

  useEffect(() => {
    const borderWidthNumber = parseInt(bannerItem.styles['border-width']);

    changeBannerItemStylesField('height', `${textRef.current?.offsetHeight + borderWidthNumber}px`)
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

    const onDrag = ({target, top, left}) => {
      frameRef.current.set("left", `${left}px`);
      frameRef.current.set("top", `${top}px`);

      setTransform(target);
    };

    const onRotate = ({target, beforeDelta }) => {
      const deg = parseFloat(frameRef.current.get("transform", "rotate")) + beforeDelta;

      frameRef.current.set("transform", "rotate", `${deg}deg`);
      setTransform(target);
    };

    const onResize = ({target, width, height, drag}) => {
      frameRef.current.set("width", `${width}px`);
      frameRef.current.set("height", `${height}px`);
      frameRef.current.set("top", `${drag.top}px`);
      frameRef.current.set("left", `${drag.left}px`);

      setTransform(target);
    };

   const handleEndAction = () => {
     replaceBannerItemStyles(bannerItem.id, frameRef.current.properties);
   }

  const handleTextareaActivation = (value) => {
    setIsTextAreaActive(value);
  }

  const handleTextChange = (e) => {
    changeBannerItemText(bannerItem.id, e.target.value);
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
          target={moveableItemRef.current}
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

export default MoveableComponent;