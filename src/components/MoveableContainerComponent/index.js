import React, { useEffect, useRef, useState } from "react";
import classnames from 'classnames';
import Moveable from "react-moveable";
import { Frame } from "scenejs";

import './MoveableComponent.scss';
import MoveableNestedComponent from '../MoveableNestedComponent';


const MoveableContainerComponent = ({
  bannerItem,
  selectedBannerItem,
  setSelectedBannerItem,
  setIsDraggableForContainer,
  changeBannerItemText,
  changeBannerItemStylesField,
  replaceBannerItemStyles,
  setDirectStylesForContainerBanner,
                                      setDirectStylesForNestedBanner,
}) => {

    const frameRef = useRef(null);
    const moveableRef = useRef(null);
    const moveableItemRef = useRef(null);

    const firstNestedFrameRef = useRef(null);
    const secondNestedFrameRef = useRef(null);
    const nestedFrameRefs = [firstNestedFrameRef, secondNestedFrameRef];

    const firstNestedMoveableRef = useRef(null);
    const secondNestedMoveableRef = useRef(null);
    const nestedMoveableRefs = [firstNestedMoveableRef, secondNestedMoveableRef];

    const firstNestedItemRef = useRef(null);
    const secondNestedItemRef = useRef(null);
    const nestedItemRefs = [firstNestedItemRef, secondNestedItemRef];


    useEffect(() => {
      frameRef.current = new Frame({
        ...bannerItem.styles,
      });

      moveableItemRef.current.style.cssText = frameRef.current.toCSS();

    }, [bannerItem.styles]);

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

        setTransform(target);
      }
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

   const handleEndAction = ({target}) => {
     if (selectedBannerItem.id === bannerItem.id) {
       replaceBannerItemStyles(bannerItem.id, frameRef.current.properties);
     }
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
          draggable={bannerItem.isDraggable}
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
          ref={moveableItemRef}
          className='moveable__item container'
        >
          {bannerItem.nestedBannerItems.map((nestedBannerItem, index) => {
            return (
              <MoveableNestedComponent
                key={nestedBannerItem.id}
                bannerItem={nestedBannerItem.id === selectedBannerItem?.id ? selectedBannerItem : nestedBannerItem}
                bannerItemIndex={index}

                frameRef={nestedFrameRefs[index]}
                moveableRef={nestedMoveableRefs[index]}
                moveableItemRef={nestedItemRefs[index]}

                container={bannerItem}
                containerFrameRef={frameRef}
                containerItemRef={moveableItemRef}
                containerMoveableRef={moveableRef}

                nestedBannerItems={bannerItem.nestedBannerItems}
                nestedFrameRefs={nestedFrameRefs}
                nestedMoveableRefs={nestedMoveableRefs}
                nestedItemRefs={nestedItemRefs}

                selectedBannerItem={selectedBannerItem}
                setSelectedBannerItem={setSelectedBannerItem}
                setIsDraggableForContainer={setIsDraggableForContainer}
                changeBannerItemText={changeBannerItemText}
                changeBannerItemStylesField={changeBannerItemStylesField}
                replaceBannerItemStyles={replaceBannerItemStyles}

                setDirectStylesForContainerBanner={setDirectStylesForContainerBanner}
              />
            );
          })}
        </div>
      </div>
    );
}

export default MoveableContainerComponent;