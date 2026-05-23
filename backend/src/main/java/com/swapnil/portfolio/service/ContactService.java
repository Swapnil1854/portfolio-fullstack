package com.swapnil.portfolio.service;

import com.swapnil.portfolio.dto.ContactRequest;
import com.swapnil.portfolio.model.ContactMessage;
import com.swapnil.portfolio.repository.ContactMessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ContactService {

    @Autowired private ContactMessageRepository repository;
    @Autowired private EmailService emailService;

    public ContactMessage saveMessage(ContactRequest request) {
        ContactMessage message = new ContactMessage();
        message.setName(request.getName());
        message.setEmail(request.getEmail());
        message.setSubject(request.getSubject());
        message.setMessage(request.getMessage());

        ContactMessage saved = repository.save(message);
        log.info("Contact message saved with id={} from {}", saved.getId(), saved.getEmail());

        // Send emails asynchronously (won't block the API response)
        emailService.sendContactNotification(saved);
        emailService.sendAutoReply(saved);

        return saved;
    }

    public List<ContactMessage> getAllMessages() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public void deleteMessage(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Message not found with id: " + id);
        }
        repository.deleteById(id);
        log.info("Deleted contact message id={}", id);
    }
}
