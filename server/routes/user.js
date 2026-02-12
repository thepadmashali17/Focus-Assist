import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';
import { sendLevelUpEmail } from '../utils/email.js';


const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// @route   GET /api/user/profile
// @desc    Get user profile with stats
// @access  Private
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                level: user.level,
                totalXP: user.totalXP,
                streak: user.streak,
                lastActiveDate: user.lastActiveDate,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching profile',
            error: error.message
        });
    }
});

// @route   POST /api/user/focus-complete
// @desc    Award XP for completing focus session
// @access  Private
router.post('/focus-complete', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Award 30 XP for completing a focus session
        const levelBefore = user.level;
        const xpGained = 30;
        user.addXP(xpGained);

        if (user.level > levelBefore) {
            sendLevelUpEmail(user.email, user.name, user.level).catch(console.error);
        }

        await user.save();

        res.json({
            success: true,
            message: 'Focus session completed! XP awarded.',
            xpGained,
            user: {
                level: user.level,
                totalXP: user.totalXP,
                streak: user.streak
            }
        });
    } catch (error) {
        console.error('Focus complete error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while awarding focus XP',
            error: error.message
        });
    }
});

export default router;
