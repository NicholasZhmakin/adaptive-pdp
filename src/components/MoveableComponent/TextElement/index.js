import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classnames from 'classnames';


const TextElement = ({
   isTextAreaActive,
   bannerItem,
   containerItemId,
   changeBannerItemText
}) => {

  const [text, setText] = useState('text');

  useEffect(() => {
    setText(bannerItem.text);
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
    changeBannerItemText(bannerItem.id, e.target.value, containerItemId);
  }

  return (
    <>
      {isTextAreaActive ?
        <TextareaAutosize
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
          value={text}
          onChange={handleTextChange}
        /> :
        text
      }
    </>
  );
}

export default TextElement;