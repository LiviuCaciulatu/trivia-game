'use client'

import React, { useState, useEffect } from 'react';
import { useTimerContext } from '@/app/context/TimerContext';
import { useRouter } from "next/navigation";
import style from './style.module.scss';

const Timer: React.FC = () => {
    const { useTimer } = useTimerContext();
    const [timeLeft, setTimeLeft] = useState(60);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!useTimer) return;

        const timer = setInterval(() => {
            setTimeLeft((prev)=> {
                if (prev <= 1){
                    clearInterval(timer);
                    setError("Time's Up!");

                    setTimeout(()=>{
                        router.push("/menu");
                    }, 5000);
                }
            return prev - 1;
            })
        }, 1000);
        return ()=> clearInterval(timer);
    }, [useTimer, router]);

    const handleAlertClose = () => {
        setError(null);
        router.push("/menu")
    }

    if (!useTimer) return null;

    return (
        <div className="p-4 bg-gray-800 text-white rounded-md">
            <h2>Time Left: {timeLeft}</h2>

            {error && (
                <div
                role="alert"
                className={`${style.alert} alert alert-error mt-4`}
                onClick={handleAlertClose}
                >
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default Timer;