import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const Header = ({isNavigation, setIsNavigation}) => {

    return (
        <ClickAwayListener onClickAway={() => setIsNavigation(false)}>
            <div className='header'>
                <img className='logo' src='./logo.png' alt='log' />
                <h1 className='company-name'>Native Help</h1>
                <MenuIcon
                    className='menu-icon'
                    onClick={() => setIsNavigation((prevState) => !prevState)}
                />

                <div className={isNavigation ? 'navigation active' : 'navigation'}>
                    <p className='navigation-item'>About</p>
                    <p className='navigation-item'>Info</p>
                    <p className='navigation-item'>Contact us</p>
                </div>
            </div>
        </ClickAwayListener>
    );
}

export default Header;