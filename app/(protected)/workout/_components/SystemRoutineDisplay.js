"use client";
import RoutineCards from './RoutineCards';
import {Tabs, Tab} from "@nextui-org/tabs";
import { IconJumpRope, IconStretching, IconSeeding, IconScale, IconBarbell } from '@tabler/icons-react';

export default function SystemRoutineDisplay({ systemRoutines }) {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" size='sm' color='success' variant='bordered'>
                <Tab 
                    key="strength" 
                    title={
                        <div className='flex items-center space-x-2'>
                            <IconBarbell />
                            <span className='hidden lg:block'>Strength</span>
                        </div>
                    }
                >
                    <h4 className='text-xl font-semibold mb-3 block md:hidden'>Strength</h4>
                    <RoutineCards routines={systemRoutines} isSystem={true} />
                </Tab>
                <Tab 
                    key="cardio" 
                    title={
                        <div className='flex items-center space-x-2'>
                            <IconJumpRope />
                            <span className='hidden lg:block'>Cardio</span>
                        </div>
                    }
                >
                    <h4 className='text-xl font-semibold mb-3 block md:hidden'>Cardio</h4>
                    <p>Coming soon</p>
                </Tab>
                <Tab 
                    key="flexibility" 
                    title={
                        <div className='flex items-center space-x-2'>
                            <IconStretching />
                            <span className='hidden lg:block'>Flexibility</span>
                        </div>
                    }
                >
                    <h4 className='text-xl font-semibold mb-3 block md:hidden'>Flexibility</h4>
                    <p>Coming soon</p>
                </Tab>
                <Tab 
                    key="weightLoss" 
                    title={
                        <div className='flex items-center space-x-2'>
                            <IconScale />
                            <span className='hidden lg:block'>Weight Loss</span>
                        </div>
                    }
                >
                    <h4 className='text-xl font-semibold mb-3 block md:hidden'>Weight Loss</h4>
                    <p>Coming soon</p>
                </Tab>
                <Tab 
                    key="beginner" 
                    title={
                        <div className='flex items-center space-x-2'>
                            <IconSeeding />
                            <span className='hidden lg:block'>Beginner</span>
                        </div>
                    }
                >
                    <h4 className='text-xl font-semibold mb-3 block md:hidden'>Beginner</h4>
                    <p>Coming soon</p>
                </Tab>
            </Tabs>
        </div>
    )
}
