import React from 'react';
import ExampleCard from '../../UI/ExampleCard';
import PersonCard from '../../UI/PersonCard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import TitleWithIcon from "../../UI/TitleWithIcon/TitleWithIcon";
import VisionCard from "../../UI/VisionCard";
import Post from "../../UI/Post";


const Main = () => {
    return (
        <div className='responsive__main'>

            <div className='examples'>
                <TitleWithIcon
                    text={'Examples of work'}
                    icon={<PeopleIcon className='examples-icon' />}
                />

                <div className='examples-list'>
                    <ExampleCard name={'Marvelous staff'} />
                    <ExampleCard name={'Splendid staff'} />
                    <ExampleCard name={'Outstanding staff'} />
                </div>
            </div>

            <div className='content'>

                <div className='vision'>
                    <VisionCard name={'Service'} imgSrc={'./vision/service.png'} />
                    <VisionCard name={'Goal'} imgSrc={'./vision/goal.png'} />
                    <VisionCard name={'Design'} imgSrc={'./vision/design.png'} />
                </div>

                <div className='posts'>
                    <Post title={'Helping today. Helping tomorrow'} />
                    <Post title={'New day - new life'} />
                    <Post title={'Hold up'} />
                </div>




            </div>

            <div className='network'>
                <div className='partners'>
                    <TitleWithIcon
                        text={'Our partners'}
                        icon={<FavoriteIcon className='partners-icon' />}
                    />
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
                    <TitleWithIcon
                        text={'Our team'}
                        icon={<PeopleIcon className='examples-icon' />}
                    />
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