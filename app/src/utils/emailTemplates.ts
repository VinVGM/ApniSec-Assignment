export const getWelcomeTemplate = (name: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Courier New', monospace; background-color: #000; color: #fff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; }
        .header { border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
        .logo { color: #00ff00; font-weight: bold; font-size: 24px; }
        .content { line-height: 1.6; color: #ccc; }
        .button { display: inline-block; padding: 10px 20px; background-color: #00ff00; color: #000; text-decoration: none; font-weight: bold; margin-top: 20px; }
        .footer { margin-top: 40px; border-top: 1px solid #333; padding-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="vertical-align: middle; padding-right: 10px;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00ff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                            </svg>
                        </td>
                        <td style="vertical-align: middle; font-family: 'Courier New', monospace; font-size: 24px; font-weight: bold; color: #000000ff;">
                            CYBER<span style="color: #00ff00;">-GM</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="content">
            <h1>WELCOME ${name}</h1>
            <p>Your account has been created.</p>
            <p>You now have access to the CYBER-GM Dashboard. Use your dashboard to report vulnerabilities, track threats, and collaborate with the team.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" class="button">ACCESS DASHBOARD</a>
        </div>
        <div class="footer">
            <p>SECURE TRANSMISSION // END OF LINE</p>
            <p>&copy; ${new Date().getFullYear()} CYBER-GM Inc.</p>
        </div>
    </div>
</body>
</html>
`;

export const getIssueCreatedTemplate = (userName: string, issueTitle: string, issueType: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Courier New', monospace; background-color: #000; color: #fff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; }
        .header { border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
        .logo { color: #00ff00; font-weight: bold; font-size: 24px; }
        .alert { color: #ff0000; font-weight: bold; }
        .content { line-height: 1.6; color: #ccc; }
        .button { display: inline-block; padding: 10px 20px; background-color: #333; color: #fff; border: 1px solid #00ff00; text-decoration: none; font-weight: bold; margin-top: 20px; }
        .footer { margin-top: 40px; border-top: 1px solid #333; padding-top: 20px; font-size: 12px; color: #666; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table td { padding: 10px; border: 1px solid #333; }
        .label { color: #666; width: 120px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="vertical-align: middle; padding-right: 10px;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00ff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                            </svg>
                        </td>
                        <td style="vertical-align: middle; font-family: 'Courier New', monospace; font-size: 24px; font-weight: bold; color: #000000ff;">
                            CYBER<span style="color: #00ff00;">-GM</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="content">
            <h1>NEW ISSUE REPORTED</h1>
            <p><strong>${name}</strong> has filed a new report.</p>
            
            <table class="table">
                <tr>
                    <td class="label">TYPE</td>
                    <td style="color: #00ff00;">${issueType.toUpperCase()}</td>
                </tr>
                <tr>
                    <td class="label">TITLE</td>
                    <td>${issueTitle}</td>
                </tr>
                <tr>
                    <td class="label">STATUS</td>
                    <td>OPEN</td>
                </tr>
            </table>

            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/issues" class="button">VIEW REPORT</a>
        </div>
        <div class="footer">
            <p>SECURE TRANSMISSION // END OF LINE</p>
        </div>
    </div>
</body>
</html>
`;

export const getProfileUpdatedTemplate = (name: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Courier New', monospace; background-color: #000; color: #fff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; }
        .header { border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
        .logo { color: #00ff00; font-weight: bold; font-size: 24px; }
        .content { line-height: 1.6; color: #ccc; }
        .button { display: inline-block; padding: 10px 20px; background-color: #333; color: #fff; border: 1px solid #00ff00; text-decoration: none; font-weight: bold; margin-top: 20px; }
        .footer { margin-top: 40px; border-top: 1px solid #333; padding-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="vertical-align: middle; padding-right: 10px;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00ff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                            </svg>
                        </td>
                        <td style="vertical-align: middle; font-family: 'Courier New', monospace; font-size: 24px; font-weight: bold; color: #000000ff;">
                            CYBER<span style="color: #00ff00;">-GM</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="content">
            <h1>PROFILE UPDATED</h1>
            <p>Attention <strong>${name}</strong>,</p>
            <p>Your profile has been modified. If you did not authorize this change, please contact security immediately.</p>
            
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile" class="button">REVIEW PROFILE</a>
        </div>
        <div class="footer">
            <p>SECURE TRANSMISSION // END OF LINE</p>
        </div>
    </div>
</body>
</html>
`;

export const getResetPasswordTemplate = (name: string, resetLink: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Courier New', monospace; background-color: #000; color: #fff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; }
        .header { border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
        .logo { color: #00ff00; font-weight: bold; font-size: 24px; }
        .content { line-height: 1.6; color: #ccc; }
        .button { display: inline-block; padding: 10px 20px; background-color: #333; color: #fff; border: 1px solid #00ff00; text-decoration: none; font-weight: bold; margin-top: 20px; }
        .footer { margin-top: 40px; border-top: 1px solid #333; padding-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="vertical-align: middle; padding-right: 10px;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00ff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                            </svg>
                        </td>
                        <td style="vertical-align: middle; font-family: 'Courier New', monospace; font-size: 24px; font-weight: bold; color: #000000ff;">
                            CYBER<span style="color: #00ff00;">-GM</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="content">
            <h1>PASSWORD RESET REQUEST</h1>
            <p>Agent <strong>${name}</strong>,</p>
            <p>A request has been received to reset your secure credentials.</p>
            <p>If this was you, please click the link below to verify your identity and set a new password. This link expires in 15 minutes.</p>
            
            <a href="${resetLink}" class="button">RESET PASSWORD</a>

            <p style="margin-top: 30px; font-size: 12px; color: #666;">If you did not request this, please disregard this transmission.</p>
        </div>
        <div class="footer">
            <p>SECURE TRANSMISSION // END OF LINE</p>
        </div>
    </div>
</body>
</html>
`;
