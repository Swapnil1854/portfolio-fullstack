package com.swapnil.portfolio.service;

import com.swapnil.portfolio.model.ContactMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    @Autowired private JavaMailSender mailSender;

    @Value("${app.notification.email}")
    private String notificationEmail;

    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Sends a notification to Swapnil's email with the contact form details.
     */
    @Async
    public void sendContactNotification(ContactMessage msg) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(fromEmail);
            mail.setTo(notificationEmail);
            mail.setSubject("[Portfolio] New message: " + msg.getSubject());
            mail.setText(buildNotificationBody(msg));
            mailSender.send(mail);
            log.info("Notification email sent for message from {}", msg.getEmail());
        } catch (Exception e) {
            log.error("Failed to send notification email: {}", e.getMessage());
        }
    }

    /**
     * Sends an auto-reply to the person who contacted.
     */
    @Async
    public void sendAutoReply(ContactMessage msg) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(fromEmail);
            mail.setTo(msg.getEmail());
            mail.setSubject("Re: " + msg.getSubject() + " — Swapnil Kadam");
            mail.setText(buildAutoReplyBody(msg));
            mailSender.send(mail);
            log.info("Auto-reply sent to {}", msg.getEmail());
        } catch (Exception e) {
            log.error("Failed to send auto-reply: {}", e.getMessage());
        }
    }

    private String buildNotificationBody(ContactMessage msg) {
        return String.format(
            "New contact form submission\n" +
            "─────────────────────────────\n" +
            "Name    : %s\n" +
            "Email   : %s\n" +
            "Subject : %s\n" +
            "Date    : %s\n\n" +
            "Message:\n%s\n\n" +
            "─────────────────────────────\n" +
            "Reply directly to: %s",
            msg.getName(), msg.getEmail(), msg.getSubject(),
            msg.getCreatedAt(), msg.getMessage(), msg.getEmail()
        );
    }

    private String buildAutoReplyBody(ContactMessage msg) {
        return String.format(
            "Hi %s,\n\n" +
            "Thank you for reaching out! I've received your message and will get back to you as soon as possible.\n\n" +
            "─────────────────────────────\n" +
            "Your message:\n\"%s\"\n" +
            "─────────────────────────────\n\n" +
            "Best regards,\n" +
            "Swapnil Kadam\n" +
            "Software Engineer | Pune, India\n" +
            "GitHub: https://github.com/Swapnil1854\n" +
            "LinkedIn: https://linkedin.com/in/swapnil-kadam-18741422a",
            msg.getName(), msg.getMessage()
        );
    }
}
