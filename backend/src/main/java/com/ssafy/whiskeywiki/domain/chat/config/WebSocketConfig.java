package com.ssafy.whiskeywiki.domain.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker   // activate message broker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // message broker setting
        WebSocketMessageBrokerConfigurer.super.configureMessageBroker(registry);
        registry.enableSimpleBroker("/sub");    // sub address
        registry.setApplicationDestinationPrefixes("/pub");      // pub address
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // endpoints cors setting
        WebSocketMessageBrokerConfigurer.super.registerStompEndpoints(registry);
        registry.addEndpoint("/ws")   // create websocket
                .setAllowedOriginPatterns("*")     // cors setting
                .withSockJS();                     // possible to connect even with browser that do not support websocket
    }
}
