import { Resend } from 'resend';
import { getWelcomeTemplate, getIssueCreatedTemplate, getProfileUpdatedTemplate } from '@/utils/emailTemplates';

export class EmailService {
  private resend: Resend;
  private fromEmail: string;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    // Use onboarding@resend.dev for testing if no domain is verified
    this.fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  }

  async sendWelcomeEmail(to: string, name: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is missing. Email sending skipped.');
        return;
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: `ApniSec <${this.fromEmail}>`,
        to: [to],
        subject: 'Welcome to ApniSec Dashboard',
        html: getWelcomeTemplate(name),
      });

      if (error) {
        console.error('Error sending welcome email:', error);
        return null;
      }

      console.log('Welcome email sent:', data?.id);
      return data;
    } catch (error) {
      console.error('Email Service Error:', error);
      return null;
    }
  }

  async sendIssueCreatedNotification(to: string, userName: string, issueTitle: string, issueType: string) {
    if (!process.env.RESEND_API_KEY) return;

    try {
      const { data, error } = await this.resend.emails.send({
        from: `ApniSec Dashboard <${this.fromEmail}>`,
        to: [to],
        subject: `[ALERT] New Issue: ${issueTitle}`,
        html: getIssueCreatedTemplate(userName, issueTitle, issueType),
      });

      if (error) {
        console.error('Error sending issue email:', error);
      }
      return data;
    } catch (error) {
      console.error('Email Service Error:', error);
    }
  }

  async sendProfileUpdatedEmail(to: string, name: string) {
    if (!process.env.RESEND_API_KEY) return;

    try {
      const { data, error } = await this.resend.emails.send({
        from: `ApniSec Security <${this.fromEmail}>`,
        to: [to],
        subject: '[SECURITY] Profile Information Updated',
        html: getProfileUpdatedTemplate(name),
      });

      if (error) {
        console.error('Error sending profile update email:', error);
      }
      return data;
    } catch (error) {
      console.error('Email Service Error:', error);
    }
  }

  async sendPasswordResetEmail(to: string, resetLink: string, name: string) {
    if (!process.env.RESEND_API_KEY) return;
    
    // Lazy import to avoid circular dependencies if any, though here it's fine
    const { getResetPasswordTemplate } = await import('@/utils/emailTemplates');

    try {
      const { data, error } = await this.resend.emails.send({
        from: `ApniSec Security <${this.fromEmail}>`,
        to: [to],
        subject: '[ACTION REQUIRED] Reset Your Credentials',
        html: getResetPasswordTemplate(name, resetLink),
      });

      if (error) {
        console.error('Error sending reset email:', error);
      }
      return data;
    } catch (error) {
      console.error('Email Service Error:', error);
    }
  }
}
