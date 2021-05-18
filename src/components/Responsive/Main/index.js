import React from 'react';
import PersonCard from "../../UI/PersonCard";


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
                <div className='team'>
                    <h3>Our team</h3>
                    <div className='team-list'>
                        <PersonCard name={'Lily'} position={'CEO'} />
                        <PersonCard name={'Anabelle'} position={'Manager'} />
                        <PersonCard name={'Sam'} position={'Worker'} />
                        <PersonCard name={'Jack'} position={'Worker'} />
                    </div>

                </div>

                <div className='partners'>
                    Partners
                </div>
            </div>

        </div>
    );
}

export default Main;