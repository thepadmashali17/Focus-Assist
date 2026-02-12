import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const SUCCESS_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3';
const TIMER_COMPLETE_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';


const Focus = () => {
    const navigate = useNavigate();
    const { updateUser } = useAuth();
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft]);

    const handleComplete = async () => {
        setIsRunning(false);
        setIsCompleted(true);

        try {
            // Play timer completion sound immediately
            const timerAudio = new Audio(TIMER_COMPLETE_SOUND_URL);
            timerAudio.play().catch(e => console.log('Audio play failed:', e));

            const response = await userAPI.completeFocus();
            updateUser(response.data.user);

            // Play success sound after API call
            setTimeout(() => {
                const successAudio = new Audio(SUCCESS_SOUND_URL);
                successAudio.play().catch(e => console.log('Audio play failed:', e));
            }, 500);
        } catch (error) {
            console.error('Error completing focus session:', error);
        }
    };

    const handleStart = () => {
        setIsRunning(true);
        setIsCompleted(false);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(25 * 60);
        setIsCompleted(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            {/* Header */}
            <div className="bg-slate-800 border-b border-slate-700 px-4 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-slate-400 hover:text-white transition"
                    >
                        ← Back
                    </button>
                    <h1 className="text-xl font-bold text-white">Focus Mode</h1>
                    <div className="w-16"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Timer Circle */}
                    <div className="relative">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                            {/* Background circle */}
                            <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="#334155"
                                strokeWidth="8"
                            />
                            {/* Progress circle */}
                            <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 90}`}
                                strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                                className="transition-all duration-1000"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Timer Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl font-bold text-white mb-2">
                                    {formatTime(timeLeft)}
                                </div>
                                <div className="text-slate-400 text-sm">
                                    {isRunning ? 'Stay focused...' : isCompleted ? 'Session complete!' : 'Ready to focus?'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Completion Message */}
                    {isCompleted && (
                        <div className="bg-gradient-to-r from-primary to-neon-purple rounded-2xl p-6 text-center animate-slide-in">
                            <div className="text-4xl mb-2">🎉</div>
                            <h3 className="text-2xl font-bold text-white mb-2">Great Work!</h3>
                            <p className="text-white/90 mb-3">You've earned +30 XP</p>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="bg-white text-primary font-semibold px-6 py-2 rounded-lg hover:bg-slate-100 transition"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    )}

                    {/* Controls */}
                    {!isCompleted && (
                        <div className="flex gap-4 justify-center">
                            {!isRunning ? (
                                <button
                                    onClick={handleStart}
                                    className="bg-gradient-to-r from-primary to-primary-dark text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all btn-glow"
                                >
                                    {timeLeft === 25 * 60 ? 'Start' : 'Resume'}
                                </button>
                            ) : (
                                <button
                                    onClick={handlePause}
                                    className="bg-slate-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-600 transition-all"
                                >
                                    Pause
                                </button>
                            )}

                            <button
                                onClick={handleReset}
                                className="bg-slate-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-600 transition-all"
                            >
                                Reset
                            </button>
                        </div>
                    )}

                    {/* Info */}
                    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                        <h3 className="text-lg font-bold text-white mb-3">Pomodoro Technique</h3>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li>✓ Focus for 25 minutes</li>
                            <li>✓ Eliminate all distractions</li>
                            <li>✓ Earn +30 XP on completion</li>
                            <li>✓ Take a break after</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Focus;
