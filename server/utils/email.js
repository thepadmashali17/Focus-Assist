// Solo-Leveler Email System using Resend API
// This avoids SMTP port blocking on cloud providers like Render

export const sendWelcomeEmail = async (userEmail, userName) => {
    if (!process.env.RESEND_API_KEY) {
        console.log('RESEND_API_KEY not set, skipping welcome email');
        return;
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: 'Solo-Leveler <onboarding@resend.dev>', // Default free domain verified by Resend
                to: userEmail,
                subject: 'Welcome to the System, Hunter!',
                html: `
                    <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: white; padding: 40px; border-radius: 10px;">
                        <h1 style="color: #6366f1;">Welcome to Solo-Leveler, ${userName}!</h1>
                        <p>Your journey to the top has just begun.</p>
                        <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #a855f7;">Your Initial Stats:</h3>
                            <ul>
                                <li><b>Rank:</b> Rank E</li>
                                <li><b>Level:</b> 1</li>
                                <li><b>Class:</b> Hunter</li>
                            </ul>
                        </div>
                        <p>Complete your daily quests, maintain your streak, and <b>Arise</b> to your true potential.</p>
                        <p style="font-size: 12px; color: #64748b; margin-top: 30px;">This is an automated message from the Solo-Leveler System.</p>
                    </div>
                `
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Welcome email sent successfully via Resend:', data.id);
        } else {
            console.error('Resend API Error (Welcome):', data);
        }
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

export const sendLevelUpEmail = async (userEmail, userName, newLevel) => {
    if (!process.env.RESEND_API_KEY) return;

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: 'Solo-Leveler <onboarding@resend.dev>',
                to: userEmail,
                subject: `👑 RANK UP: Level ${newLevel} Achieved!`,
                html: `
                    <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: white; padding: 40px; border-radius: 10px;">
                        <h1 style="color: #00d4ff;">New Rank Attained: Level ${newLevel}!</h1>
                        <p>Congratulations, Hunter <b>${userName}</b>. Your power is increasing.</p>
                        <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #00d4ff;">
                            <p style="font-size: 1.2em; color: #00d4ff;">Current Level: ${newLevel}</p>
                            <p>Continue your training to unlock even higher ranks.</p>
                        </div>
                        <p><b>Arise.</b></p>
                    </div>
                `
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Level-up email sent successfully via Resend:', data.id);
        } else {
            console.error('Resend API Error (Level Up):', data);
        }
    } catch (error) {
        console.error('Error sending level up email:', error);
    }
};
