package com.ssafy.whiskeywiki.domain.chat.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class StompMessageInterceptor implements ChannelInterceptor {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        log.info("accessor(accessor = {})", accessor);
        if (accessor.getCommand() == StompCommand.SEND) {
//            log.info("full message: {}", message);
//            log.info("auth: {}", accessor.getNativeHeader("loginId"));
//            log.info("accessor getHeader {}", accessor.getHeader("nativeHeaders").getClass());
//            Object payload = message.getPayload();
//            log.info("payload(payload = {})", payload);
//            MessageHeaders headers = message.getHeaders();
//            log.info("header(= {})", headers.get("loginId"));
//            String pubId = (String) headers.get("loginId");

            // token -> userId
            // if not, return

//            String pubId = accessor.getNativeHeader("userId");
//            accessor.setHeader("pubId", pubId);
//
//            log.info("pub id(pub = {})", pubId);
        }

        return ChannelInterceptor.super.preSend(message, channel);
    }

    @Override
    public void postSend(Message<?> message, MessageChannel channel, boolean sent) {
        ChannelInterceptor.super.postSend(message, channel, sent);

        // 메시지의 페이로드를 가져옵니다.
        Object payload = message.getPayload();
        log.info("payload(={})", payload);

        // 페이로드가 ChatRequest 타입인지 확인합니다.
        if (payload instanceof ChatDTO.ChatRequest) {
            ChatDTO.ChatRequest chatRequest = (ChatDTO.ChatRequest) payload;

            // 이제 chatRequest 객체를 사용할 수 있습니다.
            // 예를 들어, 로그를 출력할 수 있습니다.
            log.info("ChatRequest received with content: ", chatRequest.getContent());
            // 추가적인 작업을 수행할 수 있습니다.
        }
    }

    @Override
    public Message<?> postReceive(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (accessor.getCommand() == StompCommand.SEND) {
            MessageHeaders headers = message.getHeaders();
            String subId = (String) headers.get("loginId");
            String pubId = (String) headers.get("pubId");
            log.info("id(sub = {}, pub = {})", subId, pubId);
            assert subId != null;
            if (subId.equals(pubId)) return null;
        }
        return ChannelInterceptor.super.postReceive(message, channel);
    }

    //    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
////        log.info("message(message = {})", message);
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//        log.info("accessor(accessor = {})", accessor);
//
//        if (accessor.getCommand() == StompCommand.CONNECT) {
//            final String userId = "userId";
//            MessageHeaders messageHeaders = message.getHeaders();
//            log.info("userId(userId = {})", messageHeaders.get(userId));
//
//            try {
//
//                // checking valid token
//                // String auth = accessor.getFirstNativeHeader("authorization");
//                // if () { }
//
//                // object -> string
//                String payload = new String((byte[]) message.getPayload(), StandardCharsets.UTF_8);
//                log.info("payload(payload = {})", payload);
//
//                // string -> object
//                Map<String, Object> data = objectMapper.readValue(payload, Map.class);
//                log.info("mapped data(map = {})", data);
//
//                // put new value
//                data.put("chatId", accessor.getHeader(userId));
//                System.out.println("chat user ID ...." + data.get(userId));
//                String modifiedPayload = objectMapper.writeValueAsString(data);
//
//                return MessageBuilder.withPayload(modifiedPayload).copyHeadersIfAbsent(message.getHeaders()).build();
//
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//
//        return message;
//    }
}
