import React, { useState } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import ExampleCard from '../../../UI/ExampleCard';
import PersonCard from '../../../UI/PersonCard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';
import CodeIcon from '@material-ui/icons/Code';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TitleWithIcon from "../../../UI/TitleWithIcon/TitleWithIcon";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import VisionCard from "../../../UI/VisionCard";
import Post from "../../../UI/Post";
import Indicator from "../../../UI/Indicator";


const Main = () => {

    const [activeTab, setActiveTab] = useState('Service');

    const [partnersExtend, setPartnersExtend] = useState(false);
    const [teamExtend, setTeamExtend] = useState(false);

    return (
        <div className='main'>



            <div className='content'>

                <div className='vision'>

                    <div className='vision-tabs'>
                        <div
                            className={activeTab === 'Service' ? 'vision-tab active' : 'vision-tab'}
                            onClick={() => setActiveTab('Service')}
                        >
                            <img className='vision-tab__img' src={process.env.PUBLIC_URL + '/vision/service.png'} alt='vision-icon' />
                        </div>
                        <div
                            className={activeTab === 'Goal' ? 'vision-tab active' : 'vision-tab'}
                            onClick={() => setActiveTab('Goal')}
                        >
                            <img className='vision-tab__img' src={process.env.PUBLIC_URL + '/vision/goal.png'} alt='vision-icon' />
                        </div>
                        <div
                            className={activeTab === 'Design' ? 'vision-tab active' : 'vision-tab'}
                            onClick={() => setActiveTab('Design')}
                        >
                            <img className='vision-tab__img' src={process.env.PUBLIC_URL + '/vision/design.png'} alt='vision-icon' />
                        </div>
                    </div>

                    <div className='vision-tab-content'>
                        <h4 className='vision-tab-content__title'>{activeTab}</h4>

                        {activeTab === 'Service' &&
                            <p className='vision-tab-content__text'>
                                Consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                a pariatur.
                            </p>
                        }
                        {activeTab === 'Goal' &&
                            <p className='vision-tab-content__text'>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                        }
                        {activeTab === 'Design' &&
                            <p className='vision-tab-content__text'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        }
                    </div>
                </div>


                <div className='partners'>
                    <TitleWithIcon
                        text={'Our partners'}
                        icon={partnersExtend ?
                            <KeyboardArrowUpIcon className='partners-icon' /> :
                            <KeyboardArrowDownIcon className='partners-icon' />
                        }
                        handleClick={() => setPartnersExtend((prevValue) => !prevValue)}
                    />

                    <div
                        className={partnersExtend ? 'partners-list extend' : 'partners-list'}
                    >
                        <img className='partners-list__img' src={process.env.PUBLIC_URL + '/partners/partner-1.png'} alt='partner'/>
                        <img className='partners-list__img' src={process.env.PUBLIC_URL + '/partners/partner-2.jpeg'} alt='partner'/>
                        <img className='partners-list__img' src={process.env.PUBLIC_URL + '/partners/partner-3.jpeg'} alt='partner'/>
                        <img className='partners-list__img' src={process.env.PUBLIC_URL + '/partners/partner-4.png'} alt='partner'/>
                        <img className='partners-list__img' src={process.env.PUBLIC_URL + '/partners/partner-5.png'} alt='partner'/>
                        <img className='partners-list__img' src={process.env.PUBLIC_URL + '/partners/partner-6.jpg'} alt='partner'/>
                        <img className='partners-list__img' src={process.env.PUBLIC_URL + '/partners/partner-7.jpeg'} alt='partner'/>
                    </div>
                </div>


                <div className='team'>
                    <TitleWithIcon
                        text={'Our team'}
                        icon={teamExtend ?
                            <KeyboardArrowUpIcon className='partners-icon' /> :
                            <KeyboardArrowDownIcon className='partners-icon' />
                        }
                        handleClick={() => setTeamExtend((prevValue) => !prevValue)}
                    />
                    <div
                        className={teamExtend ? 'team-list extend' : 'team-list'}
                    >
                        <PersonCard name={'Lily'} position={'CEO'} />
                        <PersonCard name={'Anabelle'} position={'Manager'} />
                        <PersonCard name={'Sam'} position={'Worker'} />
                    </div>
                </div>

                {/*<div className='posts'>*/}
                {/*    <Post title={'Helping today. Helping tomorrow'} />*/}
                {/*    <Post title={'New day - new life'} />*/}
                {/*</div>*/}

                {/*<div className='indicators'>*/}
                {/*    <Indicator*/}
                {/*        name={'LINES OF CODE'}*/}
                {/*        icon={<CodeIcon />}*/}
                {/*        value={'402 123'}*/}
                {/*    />*/}
                {/*    <Indicator*/}
                {/*        name={'CUPS OF COFFEE'}*/}
                {/*        icon={<LocalCafeIcon />}*/}
                {/*        value={'3 723'}*/}
                {/*    />*/}
                {/*    <Indicator*/}
                {/*        name={'FINISHED PROJECTS'}*/}
                {/*        icon={<DoneAllIcon />}*/}
                {/*        value={'371'}*/}
                {/*    />*/}
                {/*    <Indicator*/}
                {/*        name={'SATISFIED CLIENTS'}*/}
                {/*        icon={<EmojiPeopleIcon />}*/}
                {/*        value={'5 123'}*/}
                {/*    />*/}
                {/*</div>*/}


                <div className='examples'>
                    <Carousel plugins={['arrows']}>
                        <ExampleCard name={'Marvelous staff'} />
                        <ExampleCard name={'Splendid staff'} />
                        <ExampleCard name={'Outstanding staff'} />
                        <ExampleCard name={'Gorgeous staff'} />
                        <ExampleCard name={'Magnificent staff'} />
                        <ExampleCard name={'Amazing staff'} />
                        <ExampleCard name={'Stunning staff'} />
                    </Carousel>
                </div>

            </div>


        </div>
    );
}

export default Main;