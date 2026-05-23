package com.swapnil.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
public class AsyncConfig {
    // Enables @Async on EmailService methods so emails don't block API responses
}
