import React from 'react';


const Header = () => {
    return (
        <div className='header'>
            <div className='header__left'>
                <img className='logo' src='./logo.png' alt='log' />
            </div>
            <div className='header__right'>
                <h1 className='company-name'>Native Help</h1>
                <div className='navigation'>
                    <p className='navigation-item'>About</p>
                    <p className='navigation-item'>Info</p>
                    <p className='navigation-item'>Contact us</p>
                </div>
            </div>
        </div>
    );
}

export default Header;