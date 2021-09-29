import React, { useEffect, useRef, useState } from "react";
import classnames from 'classnames';
import Moveable from "react-moveable";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Frame } from "scenejs";

import './MoveableComponent.scss';
import TextBlock from './TextBlock';


const MoveableComponent = ({bannerItem, selectedBannerItem, replaceBannerItemStyles, changeBannerItemText, setSelectedBannerItem}) => {

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

  const handleSelect = () => {
    setSelectedBannerItem(bannerItem);
  }

    const setTransform = (target) => {
        target.style.cssText = frameRef.current.toCSS();
    }

    const onDrag = ({ inputEvent, target, clientX, clientY, top, left}) => {
        const currentTargetId = Number(inputEvent.target.dataset.id);

      console.log(currentTargetId, inputEvent.target, bannerItem.id);

      frameRef.current.set("left", `${left}px`);
      frameRef.current.set("top", `${top}px`);

      setTransform(target);

        // if (currentTargetId === bannerItem.id) {
        //   frameRef.current.set("left", `${left}px`);
        //   frameRef.current.set("top", `${top}px`);
        //
        //   setTransform(target);
        // }
    };

    const onRotate = ({inputEvent, target, clientX, clientY, beforeDelta }) => {
        // inputEvent.stopImmediatePropagation();
        const deg = parseFloat(frameRef.current.get("transform", "rotate")) + beforeDelta;

        frameRef.current.set("transform", "rotate", `${deg}deg`);
        setTransform(target);
    };

    const onResize = ({inputEvent, target, clientX, clientY, width, height}) => {
        frameRef.current.set("width", `${width}px`);
        frameRef.current.set("height", `${height}px`);

        setTransform(target);
    };


   const handleEndAction = ({inputEvent, target, moveable}) => {
     // inputEvent.stopImmediatePropagation();
     // inputEvent.preventDefault();
     // inputEvent.stopPropagation();

      // console.log(target, inputEvent.currentTarget, moveable.props, bannerItem.id);

      if (bannerItem.type === 'nestedText') {
        // console.log(target, bannerItem.id);
        // replaceBannerItemStyles(bannerItem.id, target.style.cssText);
      } else if (bannerItem.id) {
        // replaceBannerItemStyles(bannerItem.id, target.style.cssText);
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
   } else if (bannerItem.type === 'button') {
     content = (
       <TextBlock
         bannerItem={bannerItem}
         isTextAreaActive={isTextAreaActive}
         changeBannerItemText={changeBannerItemText}
         setIsTextAreaActive={setIsTextAreaActive}
       />
     )
   } else if (bannerItem.type === 'nestedText') {
     content = bannerItem.nestedBannerItems.map((nestedBannerItem) => {
       return (
         <MoveableComponent
           key={nestedBannerItem.id}
           bannerItem={nestedBannerItem}
           selectedBannerItem={selectedBannerItem}
           setSelectedBannerItem={setSelectedBannerItem}
           changeBannerItemText={changeBannerItemText}
           replaceBannerItemStyles={replaceBannerItemStyles}
         />
       );
     })
   }

    return (
      <div
        className={classnames('moveable', {
          'selected': selectedBannerItem?.id === bannerItem.id,
        })}
      >
        <Moveable
          target={target}
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
        <div
          data-id={bannerItem.id}
          ref={moveableItemRef}
          className="moveable__item"
          onDoubleClick={handleSelect}
        >
          {content}
        </div>
      </div>
    );
}

export default MoveableComponent;