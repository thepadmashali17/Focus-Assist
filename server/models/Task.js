import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minlength: [1, 'Task title cannot be empty']
    },
    category: {
        type: String,
        enum: ['DSA', 'ML', 'Fitness', 'Custom'],
        default: 'Custom'
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for efficient querying of user's tasks by date
taskSchema.index({ userId: 1, date: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;
