import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendWelcomeEmail = async (userEmail, userName) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('Email credentials not set, skipping welcome email');
        return;
    }

    const mailOptions = {
        from: `"Solo-Leveler Admin" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Welcome to the System, Hunter!',
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: white; padding: 40px; border-radius: 10px;">
                <h1 style="color: #6366f1;">Welcome to Solo-Leveler, ${userName}!</h1>
                <p>Your journey to the top has just begun.</p>
                <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #a855f7;">Your Initial Stats:</h3>
                    <ul>
                        <li><b>Status:</b> Hunter (Rank E)</li>
                        <li><b>Level:</b> 1</li>
                        <li><b>Starting XP:</b> 0</li>
                    </ul>
                </div>
                <p>Complete your daily quests, maintain your streak, and Arise to your true potential.</p>
                <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" style="display: inline-block; background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">Return to Dashboard</a>
                <p style="font-size: 12px; color: #64748b; margin-top: 30px;">This is an automated message from the Solo-Leveler Productivity System.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent to:', userEmail);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

export const sendLevelUpEmail = async (userEmail, userName, newLevel) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

    const mailOptions = {
        from: `"Solo-Leveler Admin" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `👑 RANK UP: You have reached Level ${newLevel}!`,
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: white; padding: 40px; border-radius: 10px;">
                <h1 style="color: #00d4ff;">Achievement Unlocked: Level ${newLevel}!</h1>
                <p>Congratulations, Hunter <b>${userName}</b>. You are evolving.</p>
                <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #00d4ff;">
                    <p style="font-size: 1.2em; color: #00d4ff;">Current Rank: Level ${newLevel}</p>
                    <p>Continue your training to unlock even higher ranks.</p>
                </div>
                <p>Maintain your daily quests to prevent status decay.</p>
                <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" style="display: inline-block; background-color: #00d4ff; color: black; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">Arise</a>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending level up email:', error);
    }
};
