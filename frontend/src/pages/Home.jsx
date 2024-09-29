import React from 'react';
import Hero from '../components/Hero';
import LatestCollections from '../components/LatestCollections';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsetterBox from '../components/NewsetterBox';

const Home = () => {
    return (
        <div>
            <Hero/>
            <LatestCollections/>
            <BestSeller/>
            <OurPolicy/>
            <NewsetterBox/>
        </div>
    );
};

export default Home;