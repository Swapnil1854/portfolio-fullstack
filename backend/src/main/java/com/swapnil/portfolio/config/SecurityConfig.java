package com.swapnil.portfolio.config;

import com.swapnil.portfolio.security.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.*;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(@Lazy JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    // BCrypt hash of "Admin@1234" (rounds=12)
    private static final String ADMIN_PASSWORD_HASH =
            "$2a$12$EccUvT0eaYOkZqlSmbi2CeHDi7kLZIM.i2jTppAVq6Rk3Jq21SXK2";

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        System.out.println(">>> Creating admin user: [" + adminUsername + "]");
        UserDetails admin = User.builder()
                .username(adminUsername)
                .password(ADMIN_PASSWORD_HASH)
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(admin);
    }

    @Bean
    public DaoAuthenticationProvider authProvider(UserDetailsService userDetailsService,
                                                  PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(DaoAuthenticationProvider authProvider) {
        return new ProviderManager(authProvider);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           DaoAuthenticationProvider authProvider) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers(HttpMethod.POST, "/api/contact").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/resume/**").permitAll()

                        // Public GET — portfolio page reads these without auth
                        .requestMatchers(HttpMethod.GET, "/api/projects/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/skills/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/experience/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/certifications/**").permitAll()

                        // Admin-only write access
                        .requestMatchers(HttpMethod.POST, "/api/projects/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/projects/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/projects/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/skills/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/skills/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/skills/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/experience/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/experience/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/experience/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/certifications/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/certifications/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/certifications/**").hasRole("ADMIN")

                        // Admin panel
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(allowedOrigins.split("\\s*,\\s*")));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}