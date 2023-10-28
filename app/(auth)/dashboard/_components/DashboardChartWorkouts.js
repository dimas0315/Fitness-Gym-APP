"use client";
import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";

// Register ChartJS plugins
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
};

const generateDummyData = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'
    ];

    const exercisesData = [100, 120, 105, 160, 140, 200, 210, 240]; // Green line
    const workoutsData = [80, 90, 85, 110, 120, 105, 130, 150]; // Red line

    const dummyData = months.map((month, index) => {
        return {
            month,
            exercisesCompleted: exercisesData[index],
            workoutsCompleted: workoutsData[index],
        };
    });

    return dummyData;
};



const DashboardChartWorkout = () => {
    const [chartData, setChartData] = useState(null);
    const [visibility, setVisibility] = useState({ exercises: true, workouts: true });

    // Load the chart data
    useEffect(() => {
        const dummyData = generateDummyData();

        const labels = dummyData.map((data) => data.month);
        const dataset1Data = dummyData.map((data) => data.exercisesCompleted);
        const dataset2Data = dummyData.map((data) => data.workoutsCompleted);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Exercises Completed',
                    data: dataset1Data,
                    borderColor: '#a6ff00',
                    backgroundColor: 'rgba(166, 255, 0, 0.5)',
                    hidden: !visibility.exercises,
                },
                {
                    label: 'Workouts Completed',
                    data: dataset2Data,
                    borderColor: '#f9266b',
                    backgroundColor: 'rgba(249, 38, 107, 0.5)',
                    hidden: !visibility.workouts,
                },
            ],
        });

    }, [visibility]);

    const handleCheckboxChange = (value) => {
        setVisibility({
            ...visibility,
            [value]: !visibility[value],
        });
    };

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <Card shadow="none" className="shadow-md">
            <CardBody className='h-64 pb-2'>
                <Line options={options} data={chartData} className='max-w-full' />
            </CardBody>
            <CardFooter className='pt-0'>
                <CheckboxGroup 
                    orientation="horizontal"
                    defaultValue={["exercises", "workouts"]}
                >
                    <Checkbox 
                        color='success' 
                        value="exercises"
                        checked={visibility.exercises}
                        onChange={() => handleCheckboxChange('exercises')}
                    >
                        Exercises
                    </Checkbox>
                    <Checkbox 
                        color='danger' 
                        value="workouts"
                        checked={visibility.workouts}
                        onChange={() => handleCheckboxChange('workouts')}
                    >
                        Workouts
                    </Checkbox>
                </CheckboxGroup>
            </CardFooter>
        </Card>
    );
};

export default DashboardChartWorkout;
