import React from 'react';
import LeftSide from '../../components/LeftSide/LeftSide';
import './Home.css'

const Home = () => {
    return (
        <div className='home grid grid-cols-1 md:grid-cols-2'>
            <div>
            <LeftSide></LeftSide>
            </div>
            <div>
                <h2>Home</h2>
            </div>
        </div>
    );
};

export default Home;