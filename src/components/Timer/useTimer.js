import { useEffect, useState } from "react";

const useTimer = (initialValue = 0) => {
    const [time, setTime] = useState(initialValue);
    const [isRunning, setIsRunning] = useState(false);
    
    useEffect(() => {
        let lastTimeStamp;
        let requestId;
        
        const updateTimer = (currentTime) => {
            if (isRunning) {
                if (lastTimeStamp) {
                    
                    const deltaTime = Math.floor((currentTime - lastTimeStamp) / 1000);                   
                    if (deltaTime >= 1) {
                        setTime(prevTime => prevTime + deltaTime);
                        lastTimeStamp = currentTime;
                    }
                } else {                  
                    lastTimeStamp = currentTime;
                }                     
                requestId = requestAnimationFrame(updateTimer);
            }
        };
        
        if (isRunning) {
            requestId = requestAnimationFrame(updateTimer);
        }
        
        // Cleanup function
        return () => {
            if (requestId) {
                cancelAnimationFrame(requestId);
            }
        };
    }, [isRunning]);

    const startTimer = () => {
        setIsRunning(true);
    };
    
    const stopTimer = () => {
        setIsRunning(false);
    };
    
    const resetTimer = () => {
        setTime(initialValue);
    };

    const formatTime = () => {
        const min = Math.floor(time / 60);
        const secs = time % 60;
        return `${min}:${secs < 10 ? '0' : ''}${secs}`;
    };
    
    return {
        time, 
        setTime, 
        isRunning, 
        setIsRunning, 
        startTimer, 
        stopTimer, 
        resetTimer, 
        formatTime
    };
};

export default useTimer;