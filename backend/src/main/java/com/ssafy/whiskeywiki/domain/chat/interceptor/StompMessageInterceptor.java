package com.ssafy.whiskeywiki.domain.chat.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Component
@RequiredArgsConstructor
public class StompMessageInterceptor implements ChannelInterceptor {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        System.out.println(message.toString());
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (accessor.getCommand() == StompCommand.CONNECT) {
            MessageHeaders messageHeaders = message.getHeaders();
            System.out.println("get first vative header: " + messageHeaders.get("userId"));
            try {
                // object -> string
                String payload = new String((byte[]) message.getPayload(), StandardCharsets.UTF_8);
                // string -> object
                Map<String, Object> data = objectMapper.readValue(payload, Map.class);
                // put new value
                data.put("chatId", accessor.getHeader("userId"));
                System.out.println("chat user ID ...." + data.get("userId"));
                String modifiedPayload = objectMapper.writeValueAsString(data);

                return MessageBuilder.withPayload(modifiedPayload).copyHeadersIfAbsent(message.getHeaders()).build();

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return message;
    }


}
