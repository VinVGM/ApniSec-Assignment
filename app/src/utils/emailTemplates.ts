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
            <div class="logo">APNISEC</div>
        </div>
        <div class="content">
            <h1>WELCOME AGENT ${name.toUpperCase()}</h1>
            <p>Your secure channel has been established.</p>
            <p>You now have access to the ApniSec command center. Use your dashboard to report vulnerabilities, track threats, and collaborate with the community.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" class="button">ACCESS DASHBOARD</a>
        </div>
        <div class="footer">
            <p>SECURE TRANSMISSION // END OF LINE</p>
            <p>&copy; ${new Date().getFullYear()} ApniSec Inc.</p>
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
            <div class="logo">APNISEC // ALERT</div>
        </div>
        <div class="content">
            <h1>NEW VULNERABILITY REPORTED</h1>
            <p>Agent <strong>${userName}</strong> has filed a new report.</p>
            
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
            <div class="logo">APNISEC // SYSTEM NOTIFICATION</div>
        </div>
        <div class="content">
            <h1>PROFILE UPDATED</h1>
            <p>Attention Agent <strong>${name.toUpperCase()}</strong>,</p>
            <p>Your personnel file has been modified. If you did not authorize this change, please contact security immediately.</p>
            
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile" class="button">REVIEW PROFILE</a>
        </div>
        <div class="footer">
            <p>SECURE TRANSMISSION // END OF LINE</p>
        </div>
    </div>
</body>
</html>
`;
