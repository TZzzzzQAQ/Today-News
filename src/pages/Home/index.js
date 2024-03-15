import React from 'react';
import BarChart from "@/components/BarChart";

const Home = () => {
    return <div>
        <BarChart title={'Satisfaction level with three major front-end frameworks'}/>
        <BarChart title={'Satisfaction level with three major back-end frameworks'}/>
    </div>
};

export default Home;
