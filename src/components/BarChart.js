import React, {useEffect, useRef} from 'react';
import * as echarts from "echarts";

const BarChart = ({title}) => {
    const chartDiv = useRef();
    useEffect(() => {
        const myChart = echarts.init(chartDiv.current);
        let option;

        option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['Angular', 'React', 'Vue']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [80, 85, 83],
                    type: 'bar'
                }
            ]
        };
        option && myChart.setOption(option);
    }, []);
    return (
        <div>
            <div ref={chartDiv} style={{width: '500px', height: '300px'}}></div>
        </div>
    );
};

export default BarChart;
