import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";


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

                    <div className='visit'>
                        <p className='visit__link'>About</p>
                        <p className='visit__link'>Info</p>
                        <p className='visit__link'>Contact us</p>
                    </div>

                    <div className='support'>
                        <h4 className='support__title'>Support</h4>
                        <div className='support__links-container'>
                            <p className='support__link'>FAQ</p>
                            <p className='support__link'>Downloads</p>
                            <p className='support__link'>Spare parts</p>
                            <p className='support__link'>registration</p>
                        </div>
                    </div>

                    <div className='explore'>
                        <h4 className='explore__title'>Explore properties</h4>
                        <div className='explore__links-container'>
                            <p className='explore__link'>Fandom</p>
                            <p className='explore__link'>D&D Beyond</p>
                            <p className='explore__link'>Muthhead</p>
                            <p className='explore__link'>Cortex</p>
                        </div>
                    </div>


                    <div className='follow'>
                        <h4 className='follow__title'>Follow</h4>
                        <div className='follow__icons-container'>
                            <FacebookIcon className='follow__icon' />
                            <InstagramIcon className='follow__icon' />
                            <TwitterIcon className='follow__icon' />
                            <YouTubeIcon className='follow__icon' />
                        </div>
                    </div>

                </div>
            </div>
        </ClickAwayListener>
    );
}

export default Header;