import express from 'express';
import Task from '../models/Task.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';
import { sendLevelUpEmail } from '../utils/email.js';


const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', async (req, res) => {
    try {
        const { title, category } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Task title is required'
            });
        }

        const task = new Task({
            userId: req.user._id,
            title,
            category: category || 'Custom'
        });

        await task.save();

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating task',
            error: error.message
        });
    }
});

// @route   GET /api/tasks/today
// @desc    Get today's tasks for the authenticated user
// @access  Private
router.get('/today', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const tasks = await Task.find({
            userId: req.user._id,
            date: {
                $gte: today,
                $lt: tomorrow
            }
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: tasks.length,
            tasks
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching tasks',
            error: error.message
        });
    }
});

// @route   PATCH /api/tasks/:id
// @desc    Mark task as complete and award XP
// @access  Private
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find task
        const task = await Task.findOne({ _id: id, userId: req.user._id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Check if already completed
        if (task.completed) {
            return res.status(400).json({
                success: false,
                message: 'Task already completed'
            });
        }

        // Mark as completed
        task.completed = true;
        await task.save();

        // Award XP to user
        const user = await User.findById(req.user._id);
        const levelBefore = user.level;
        const xpGained = 20;
        user.addXP(xpGained);

        // Check if all tasks for today are completed for bonus XP
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const allTasks = await Task.find({
            userId: req.user._id,
            date: {
                $gte: today,
                $lt: tomorrow
            }
        });

        const allCompleted = allTasks.every(t => t.completed);
        let bonusXP = 0;

        if (allCompleted && allTasks.length > 0) {
            bonusXP = 50;
            user.addXP(bonusXP);
        }

        const levelAfter = user.level;
        if (levelAfter > levelBefore) {
            sendLevelUpEmail(user.email, user.name, levelAfter).catch(console.error);
        }

        await user.save();

        res.json({
            success: true,
            message: 'Task completed successfully',
            task,
            xpGained: xpGained + bonusXP,
            user: {
                level: user.level,
                totalXP: user.totalXP,
                streak: user.streak
            }
        });
    } catch (error) {
        console.error('Complete task error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while completing task',
            error: error.message
        });
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting task',
            error: error.message
        });
    }
});

export default router;
