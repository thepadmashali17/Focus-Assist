// Solo-Leveler Email System using Brevo (formerly Sendinblue) API
// This allows sending to any email address without a custom domain

export const sendWelcomeEmail = async (userEmail, userName) => {
    if (!process.env.BREVO_API_KEY) {
        console.log('BREVO_API_KEY not set, skipping welcome email');
        return;
    }

    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: {
                    name: "Solo-Leveler Admin",
                    email: process.env.EMAIL_USER || "vikasharshith@gmail.com"
                },
                to: [{
                    email: userEmail,
                    name: userName
                }],
                subject: 'Welcome to the System, Hunter!',
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: white; padding: 40px; border-radius: 10px;">
                        <h1 style="color: #6366f1;">Welcome to Solo-Leveler, ${userName}!</h1>
                        <p>Your journey to the top has just begun.</p>
                        <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #a855f7;">Your Initial Stats:</h3>
                            <ul style="color: #cbd5e1;">
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
            console.log('Welcome email sent successfully via Brevo:', data.messageId);
        } else {
            console.error('Brevo API Error (Welcome):', data);
        }
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

export const sendLevelUpEmail = async (userEmail, userName, newLevel) => {
    if (!process.env.BREVO_API_KEY) return;

    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: {
                    name: "Solo-Leveler Admin",
                    email: process.env.EMAIL_USER || "vikasharshith@gmail.com"
                },
                to: [{
                    email: userEmail,
                    name: userName
                }],
                subject: `👑 RANK UP: Level ${newLevel} Achieved!`,
                htmlContent: `
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
            console.log('Level-up email sent successfully via Brevo:', data.messageId);
        } else {
            console.error('Brevo API Error (Level Up):', data);
        }
    } catch (error) {
        console.error('Error sending level up email:', error);
    }
};
