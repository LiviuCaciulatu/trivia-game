'use client';

import React, { createContext, useContext, useState } from 'react';

interface TimerContextType{
    useTimer: boolean;
    setUseTimer: (value: boolean)=> void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ( {children} ) =>{
    const [useTimer, setUseTimer] = useState<boolean>(true);

    return (
        <TimerContext.Provider value={{useTimer, setUseTimer}}>
            {children}
        </TimerContext.Provider>
    )
}

export const useTimerContext = () => {
    const context = useContext(TimerContext);
    if (!context){
        throw new Error("useTimerContext must be used within a TimerProvider");
    }
    return context;
};
