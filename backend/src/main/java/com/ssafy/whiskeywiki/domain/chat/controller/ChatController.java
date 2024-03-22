package com.ssafy.whiskeywiki.domain.chat.controller;

import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatDTO;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatMessage;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatRepository;
import com.ssafy.whiskeywiki.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessageSendingOperations messageSendingOperations;
    private final ChatService chatService;
    private final ChatRepository chatRepository;

    @MessageMapping("/message") // `/pub/message`
//    @SendTo("/topic/chatroom/")
    public void chat(ChatDTO.ChatRequest chatRequest, StompHeaderAccessor accessor) {
//        System.out.println("init ...");
        log.info("message(message = {})", chatRequest);
//        System.out.println("into pub/message" + chatRequest.getContent());
//        messageSendingOperations.convertAndSend("/sub/chat/room" + message.getRoomId(), message);
        int chatId = chatService.saveChat(chatRequest);

        String id = accessor.getFirstNativeHeader("userId");
        System.out.println("init .... " + id);

//        ChatDTO.ChatResponse chatResponse = ChatDTO.ChatResponse.builder()
//                .chatId(chatId)
////                .myMessage()
//                .content(chatRequest.getContent())
//                .time(LocalDateTime.now())
//                .build();

        messageSendingOperations.convertAndSend("/topic/chatroom/" + chatRequest.getChatroomId(), chatRequest);
    }
}

@MessageMapping("/message")
public void chat(ChatDTO.ChatRequest chatRequest, StompHeaderAccessor accessor) {

    String id = accessor.getFirstNativeHeader("userId");
    System.out.println("init .... " + id);

    messageSendingOperations.convertAndSend("/topic/chatroom/" + chatRequest.getChatroomId(), chatRequest);
}