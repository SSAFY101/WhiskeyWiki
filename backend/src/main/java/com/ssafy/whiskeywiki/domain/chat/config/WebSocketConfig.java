package com.ssafy.whiskeywiki.domain.chat.config;

import com.ssafy.whiskeywiki.domain.chat.interceptor.StompMessageInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker   // activate message broker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final StompMessageInterceptor stompMessageInterceptor;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // message broker setting
        WebSocketMessageBrokerConfigurer.super.configureMessageBroker(registry);
        registry.enableSimpleBroker("/topic");   // sub address
        registry.setApplicationDestinationPrefixes("/app");        // pub address
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // endpoints cors setting
        WebSocketMessageBrokerConfigurer.super.registerStompEndpoints(registry);
        registry.addEndpoint("/ws")         // create websocket
                .setAllowedOrigins("*");
//                .setAllowedOriginPatterns("*")     // cors setting
//                .withSockJS();                     // possible to connect even with browser that do not support websocket
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        WebSocketMessageBrokerConfigurer.super.configureClientInboundChannel(registration);

        registration.interceptors(stompMessageInterceptor);
    }
}
