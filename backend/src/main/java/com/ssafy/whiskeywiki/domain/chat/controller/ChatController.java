package com.ssafy.whiskeywiki.domain.chat.controller;

import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatDTO;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatMessage;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatRepository;
import com.ssafy.whiskeywiki.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    SimpUserRegistry simpUserRegistry;

    private final SimpMessageSendingOperations messageSendingOperations;
    private final ChatService chatService;
    private final ChatRepository chatRepository;

    @MessageMapping("/message") // `/pub/message`
    public void chat(ChatDTO.ChatRequest chatRequest) {
        log.info("message(message = {})", chatRequest);

        chatService.saveChat(chatRequest);
        messageSendingOperations.convertAndSend("/topic/chatroom/" + chatRequest.getChatroomId(), chatRequest.getContent());


//        int chatId = chatService.saveChat(chatRequest);
//
//        String id = accessor.getFirstNativeHeader("userId");
//        System.out.println("init .... " + id);
//
//
//        log.info("id(userId, pubId = {}, {})", userId, pubId);
//        if (userId.equals(pubId)) {
//            return;
//        }
//        ChatDTO.ChatResponse chatResponse = ChatDTO.ChatResponse.builder()
//                .chatId(chatId)
////                .myMessage()
//                .content(chatRequest.getContent())
//                .time(LocalDateTime.now())
//                .build();
//
//        messageSendingOperations.convertAndSend("/topic/chatroom/" + chatRequest.getChatroomId(), chatRequest);
    }
}