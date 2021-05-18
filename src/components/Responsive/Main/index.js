import React from 'react';
import PersonCard from "../../UI/PersonCard";
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';


const Main = () => {
    return (
        <div className='responsive__main'>

            <div className='examples'>
                Examples
            </div>

            <div className='content'>
                Content
            </div>

            <div className='network'>
                <div className='partners'>
                    <div className='partners-header'>
                        <h3 className='partners-title'>Our partners</h3>
                        <FavoriteIcon className='partners-icon' />
                    </div>
                    <div className='partners-list'>
                        <img className='partners-list__img' src='./partners/partner-1.png' alt='partner'/>
                        <img className='partners-list__img' src='./partners/partner-2.jpeg' alt='partner'/>
                        <img className='partners-list__img' src='./partners/partner-3.jpeg' alt='partner'/>
                        <img className='partners-list__img' src='./partners/partner-4.png' alt='partner'/>
                        <img className='partners-list__img' src='./partners/partner-5.png' alt='partner'/>
                        <img className='partners-list__img' src='./partners/partner-6.jpg' alt='partner'/>
                        <img className='partners-list__img' src='./partners/partner-7.jpeg' alt='partner'/>
                        <img className='partners-list__img' src='./partners/partner-8.jpg' alt='partner'/>
                    </div>
                </div>

                <div className='team'>
                    <div className='team-header'>
                        <h3 className='team-title'>Our team</h3>
                        <PeopleIcon className='team-icon' />
                    </div>
                    <div className='team-list'>
                        <PersonCard name={'Lily'} position={'CEO'} />
                        <PersonCard name={'Anabelle'} position={'Manager'} />
                        <PersonCard name={'Sam'} position={'Worker'} />
                        <PersonCard name={'Jack'} position={'Worker'} />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Main;