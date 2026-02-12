import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tasksAPI } from '../services/api';

const Dashboard = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskCategory, setNewTaskCategory] = useState('Custom');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await tasksAPI.getTodayTasks();
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        setLoading(true);
        try {
            const response = await tasksAPI.create({
                title: newTaskTitle,
                category: newTaskCategory
            });

            setTasks([response.data.task, ...tasks]);
            setNewTaskTitle('');
            setNewTaskCategory('Custom');
            showMessage('Quest added! 🎯');
        } catch (error) {
            showMessage('Failed to add quest', true);
        }
        setLoading(false);
    };

    const handleCompleteTask = async (taskId) => {
        try {
            const response = await tasksAPI.complete(taskId);

            // Update task in list
            setTasks(tasks.map(task =>
                task._id === taskId ? { ...task, completed: true } : task
            ));

            // Update user stats
            updateUser(response.data.user);

            showMessage(`+${response.data.xpGained} XP! 🎉`);
        } catch (error) {
            showMessage('Failed to complete quest', true);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await tasksAPI.delete(taskId);
            setTasks(tasks.filter(task => task._id !== taskId));
            showMessage('Quest removed');
        } catch (error) {
            showMessage('Failed to delete quest', true);
        }
    };

    const showMessage = (msg, isError = false) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000);
    };

    const xpForNextLevel = (user?.level || 1) * 100;
    const xpProgress = ((user?.totalXP || 0) % 100);
    const progressPercentage = (xpProgress / 100) * 100;

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;

    return (
        <div className="min-h-screen bg-slate-900 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-light to-neon-purple bg-clip-text text-transparent">
                            Solo-Leveler
                        </h1>
                        <button
                            onClick={logout}
                            className="text-slate-400 hover:text-white transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
                {/* Message Toast */}
                {message && (
                    <div className="fixed top-4 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in z-50">
                        {message}
                    </div>
                )}

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Welcome, {user?.name}!</h2>
                            <p className="text-slate-400">Continue your journey</p>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-bold text-primary">Lv. {user?.level}</div>
                            <div className="text-sm text-slate-400">Hunter</div>
                        </div>
                    </div>

                    {/* XP Progress */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                            <span>XP Progress</span>
                            <span>{xpProgress} / 100</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-neon-purple progress-fill transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="bg-slate-700/50 rounded-xl p-4 text-center border border-slate-600">
                            <div className="text-2xl font-bold text-neon-blue">{user?.totalXP}</div>
                            <div className="text-xs text-slate-400 mt-1">Total XP</div>
                        </div>
                        <div className="bg-slate-700/50 rounded-xl p-4 text-center border border-slate-600">
                            <div className="text-2xl font-bold text-neon-purple">{user?.streak}</div>
                            <div className="text-xs text-slate-400 mt-1">Day Streak 🔥</div>
                        </div>
                        <div className="bg-slate-700/50 rounded-xl p-4 text-center border border-slate-600">
                            <div className="text-2xl font-bold text-neon-pink">{completedTasks}/{totalTasks}</div>
                            <div className="text-xs text-slate-400 mt-1">Quests Done</div>
                        </div>
                    </div>
                </div>

                {/* Add Task Form */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4">Add Daily Quest</h3>
                    <form onSubmit={handleAddTask} className="space-y-4">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                placeholder="Enter quest title..."
                                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                            <select
                                value={newTaskCategory}
                                onChange={(e) => setNewTaskCategory(e.target.value)}
                                className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary transition"
                            >
                                <option value="DSA">DSA</option>
                                <option value="ML">ML</option>
                                <option value="Fitness">Fitness</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all btn-glow disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : '+ Add Quest'}
                        </button>
                    </form>
                </div>

                {/* Tasks List */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4">Today's Quests</h3>

                    {tasks.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            <p className="text-lg">No quests yet</p>
                            <p className="text-sm mt-2">Add your first quest to start leveling up!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {tasks.map((task) => (
                                <div
                                    key={task._id}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${task.completed
                                            ? 'bg-slate-700/30 border-slate-600'
                                            : 'bg-slate-700/50 border-slate-600 hover:border-primary'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => !task.completed && handleCompleteTask(task._id)}
                                        className="w-5 h-5 rounded border-slate-500 text-primary focus:ring-primary cursor-pointer"
                                        disabled={task.completed}
                                    />
                                    <div className="flex-1">
                                        <p className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                                            {task.title}
                                        </p>
                                        <span className="text-xs text-slate-400">{task.category}</span>
                                    </div>
                                    {task.completed && (
                                        <span className="text-green-400 text-sm font-semibold">+20 XP</span>
                                    )}
                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="text-red-400 hover:text-red-300 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Focus Mode Button */}
                <button
                    onClick={() => navigate('/focus')}
                    className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-neon-purple/50 transition-all btn-glow"
                >
                    🎯 Enter Focus Mode
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
