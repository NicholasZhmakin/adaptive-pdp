import React from 'react';


const Header = () => {
    return (
        <div className='responsive__header'>
            <div className='responsive__header--left'>
                <img className='logo' src='./logo.png' alt='log' />
            </div>
            <div className='responsive__header--right'>
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