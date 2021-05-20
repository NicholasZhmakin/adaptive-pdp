import React from 'react';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import './post.scss';


const Post = ({title}) => {
    return (
        <div className='post'>

            <div className='post__left-block'>
                <h3 className='post__title'>{title}</h3>
                <p className='post__text'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <div className='post__buttons-container'>
                    <button className='post__btn'>See more</button>
                    <button className='post__btn'>Save</button>
                </div>
            </div>

            <div className='post__right-block'>
                <img className='post__img' src={'https://picsum.photos/300/400'} alt='post-img' />
                <div className='post__note'>
                    <SpeakerNotesIcon className='post__note-icon' />
                    <p className='post__note-text'>
                        Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Post;