import React from 'react';
import Hero from '../components/Hero';
import LatestCollections from '../components/LatestCollections';
import Discount from '../components/Discount';
import BestSeller from '../components/BestSeller';
import Features from '../components/Features';
import Offers from '../components/Offers';
import NewsetterBox from '../components/NewsetterBox';

const Home = () => {
    return (
        <div>
            <Hero/>
            <LatestCollections/>
            <Discount/>
            <BestSeller/>
            <Features/>
            <Offers/>
            <NewsetterBox/>
        </div>
    );
};

export default Home;