import React, { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Frame } from "scenejs";
import './MoveableComponent.scss';


const MoveableComponent = ({item, previewRef}) => {

    const frameRef = useRef(null);
    const moveableItemRef = useRef(null);

    const [target, setTarget] = useState(null);
    const [isTextAreaActive, setIsTextAreaActive] = useState(false)
    const [text, setText] = useState('text');

    useEffect(() => {
        setTarget(moveableItemRef.current);
    }, []);

    useEffect(() => {
        frameRef.current = new Frame({
            ...item.styles,
        });

        moveableItemRef.current.style.cssText = frameRef.current.toCSS();
    }, [item]);

    const setTransform = (target) => {
        console.log(target);
        target.style.cssText = frameRef.current.toCSS();
    }

    const onDrag = ({ target, clientX, clientY, top, left }) => {
        frameRef.current.set("left", `${left}px`);
        frameRef.current.set("top", `${top}px`);

        setTransform(target);
    };

    const onRotate = ({ target, clientX, clientY, beforeDelta }) => {
        const deg = parseFloat(frameRef.current.get("transform", "rotate")) + beforeDelta;

        frameRef.current.set("transform", "rotate", `${deg}deg`);
        setTransform(target);
    };

    const onResize = ({ target, clientX, clientY, width, height }) => {
        frameRef.current.set("width", `${width}px`);
        frameRef.current.set("height", `${height}px`);

        setTransform(target);
    };

   const handleTextChange = (e) => {
       setText(e.target.value);
   }

   let content;

   if (item.type === 'image') {
      content = (
           <img
               className='moveable__image'
               src={item.image.url}
               alt={'dnd0image'}
           />
       );
   } else {
      content = isTextAreaActive ?
          <ClickAwayListener onClickAway={() => setIsTextAreaActive(false)}>
            <textarea
                className='moveable__textarea'
                style={{
                    color: item.styles['color'],
                    fontSize: item.styles['font-size'],
                    fontFamily: item.styles['font-family'],
                    textAlign: item.styles['text-align'],
                }}
                value={text}
                onChange={handleTextChange}
            />
          </ClickAwayListener> :
          <p
              className="moveable__text"
              onDoubleClick={() => {
                  setIsTextAreaActive(true)
              }}
          >
              {text}
          </p>
   }

    return (
        <div className="moveable">
            <Moveable
                target={target}
                // container={previewRef.current}
                container={null}
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
            />

            <div className="moveable__container">

                <div ref={moveableItemRef} className="moveable__item">
                    {content}
                </div>

            </div>
        </div>
    );
}

export default MoveableComponent;