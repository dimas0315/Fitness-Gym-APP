import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const WorkoutControlsContext = createContext();

export const WorkoutControlsProvider = ({ children }) => {
  // Initialize states from session storage
  const initialState = {
    isPaused: JSON.parse(sessionStorage.getItem('isPaused')) || false,
    isSaving: JSON.parse(sessionStorage.getItem('isSaving')) || false,
    workoutDuration: JSON.parse(sessionStorage.getItem('workoutDuration')) || 0,
    workoutStartTime: JSON.parse(sessionStorage.getItem('workoutStartTime')) || null,
    activeWorkoutRoutine: JSON.parse(sessionStorage.getItem('activeWorkoutRoutine')) || null
  };

  const [isPaused, setIsPaused] = useState(initialState.isPaused);
  const [isSaving, setIsSaving] = useState(initialState.isSaving);
  const [workoutDuration, setWorkoutDuration] = useState(initialState.workoutDuration);
  const [workoutStartTime, setWorkoutStartTime] = useState(initialState.workoutStartTime);
  const [activeWorkoutRoutine, setActiveWorkoutRoutine] = useState(initialState.activeWorkoutRoutine);

  const intervalRef = useRef(null);

  // Update session storage on state changes
  useEffect(() => {
    sessionStorage.setItem('isPaused', JSON.stringify(isPaused));
  }, [isPaused]);

  useEffect(() => {
    sessionStorage.setItem('isSaving', JSON.stringify(isSaving));
  }, [isSaving]);

  useEffect(() => {
    sessionStorage.setItem('workoutDuration', JSON.stringify(workoutDuration));
  }, [workoutDuration]);

  useEffect(() => {
    sessionStorage.setItem('workoutStartTime', JSON.stringify(workoutStartTime));
  }, [workoutStartTime]);

  useEffect(() => {
    sessionStorage.setItem('activeWorkoutRoutine', JSON.stringify(activeWorkoutRoutine));
  }, [activeWorkoutRoutine]);

  useEffect(() => {
    const handleWorkoutTimer = () => {
      if (workoutStartTime && !isPaused) {
        setWorkoutDuration(prevDuration => prevDuration + 1);
      }
    };

    if (workoutStartTime && !isPaused) {
      intervalRef.current = setInterval(handleWorkoutTimer, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [workoutStartTime, isPaused]);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const remainingSeconds = seconds - hours * 3600 - minutes * 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const togglePause = () => {
    if (!workoutStartTime) {
      toast.success('Workout Session Started from pause!');
    } else {
      setIsPaused(prevIsPaused => !prevIsPaused);
      toast.success(isPaused ? 'Workout Resumed!' : 'Workout Paused!');
    }
  };

  const startWorkout = (workoutId) => {
    if (!workoutStartTime) {
      setWorkoutStartTime(Date.now());
      setActiveWorkoutRoutine(workoutId);
      toast.success('Workout Session Started!');
    }
  };

  return (
    <WorkoutControlsContext.Provider value={{
      // States
      isPaused, setIsPaused, 
      isSaving, setIsSaving, 
      workoutDuration, setWorkoutDuration, 
      workoutStartTime, setWorkoutStartTime,
      activeWorkoutRoutine, setActiveWorkoutRoutine,
      // Functions
      formatDuration, togglePause, startWorkout,
    }}>
      {children}
    </WorkoutControlsContext.Provider>
  );
};

export const useWorkoutControls = () => {
  const context = useContext(WorkoutControlsContext);
  if (context === undefined) {
    throw new Error('useWorkoutControls must be used within a WorkoutControlsProvider');
  }
  return context;
};
