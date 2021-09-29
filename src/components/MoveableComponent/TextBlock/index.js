import React, {useEffect, useState} from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import classnames from 'classnames';


const TextBlock = ({isTextAreaActive, setIsTextAreaActive, bannerItem, changeBannerItemText}) => {

  const [text, setText] = useState('text');

  useEffect(() => {
    setText(bannerItem.text);
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
    changeBannerItemText(bannerItem.id, e.target.value);
  }

  return (
    <>
      {isTextAreaActive ?
        <ClickAwayListener onClickAway={() => setIsTextAreaActive(false)}>
            <textarea
              className={classnames('moveable__textarea', {
                'button': bannerItem.type === 'button',
              })}
              style={{
                color: bannerItem.styles['color'],
                fontSize: bannerItem.styles['font-size'],
                fontFamily: bannerItem.styles['font-family'],
                textAlign: bannerItem.styles['text-align'],
              }}
              value={text}
              onChange={handleTextChange}
            />
        </ClickAwayListener> :
        <p
          className={classnames('moveable__text', {
            'button': bannerItem.type === 'button',
          })}
          onDoubleClick={() => {
            setIsTextAreaActive(true)
          }}
        >
          {text}
        </p>}
    </>
  );
}

export default TextBlock;