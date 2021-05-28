import React from 'react';
import ExampleCard from '../../UI/ExampleCard';
import PersonCard from '../../UI/PersonCard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';
import CodeIcon from '@material-ui/icons/Code';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TitleWithIcon from "../../UI/TitleWithIcon/TitleWithIcon";
import VisionCard from "../../UI/VisionCard";
import Post from "../../UI/Post";
import Indicator from "../../UI/Indicator";


const Main = () => {
    return (
        <div className='main'>

            <div className='examples'>
                <TitleWithIcon
                    text={'Examples of work'}
                    icon={<PeopleIcon className='examples-icon' />}
                />

                <div className='examples-list'>
                    <ExampleCard name={'Marvelous staff'} />
                    <ExampleCard name={'Splendid staff'} />
                    <ExampleCard name={'Outstanding staff'} />
                    <ExampleCard name={'Gorgeous staff'} />
                    <ExampleCard name={'Magnificent staff'} />
                    <ExampleCard name={'Amazing staff'} />
                    <ExampleCard name={'Stunning staff'} />
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
                </div>

                <div className='indicators'>
                    <Indicator
                        name={'LINES OF CODE'}
                        icon={<CodeIcon />}
                        value={'402 123'}
                    />
                    <Indicator
                        name={'CUPS OF COFFEE'}
                        icon={<LocalCafeIcon />}
                        value={'3 723'}
                    />
                    <Indicator
                        name={'FINISHED PROJECTS'}
                        icon={<DoneAllIcon />}
                        value={'371'}
                    />
                    <Indicator
                        name={'SATISFIED CLIENTS'}
                        icon={<EmojiPeopleIcon />}
                        value={'5 123'}
                    />
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
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Main;