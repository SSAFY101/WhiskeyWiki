package com.ssafy.whiskeywiki.domain.chat.service;

import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatDTO;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {
    ChatRepository chatRepository;

    public void saveChat(ChatDTO.ChatRequest chatRequest) {
        chatRepository.save(Chat.builder()
                        .userChatroom(chatRequest.getChatroomId())
                        .user(chatRequest.getUserId())
                        .message(chatRequest.getContent())
                        .dateTime(LocalDateTime.now())
                        .build());
    }

    public List<ChatDTO.ChatResponse> getChatList() {
        List<ChatDTO.ChatResponse> chatResponseList = new ArrayList<>();



        return chatResponseList;
    }
}