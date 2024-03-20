package com.ssafy.whiskeywiki.domain.chat.controller;

import com.ssafy.whiskeywiki.domain.chat.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor
public class ChatController {

    private static SimpMessageSendingOperations messageSendingOperations;

    @MessageMapping("chat/message")
    public void chat(ChatMessage message) {
        log.info("message(message = {})", message);
        messageSendingOperations.convertAndSend("/sub/chat/room" + message.getRoomId(), message);
    }
}
