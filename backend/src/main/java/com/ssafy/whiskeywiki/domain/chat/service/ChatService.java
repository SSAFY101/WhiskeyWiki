package com.ssafy.whiskeywiki.domain.chat.service;

import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatDTO;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatRepository;
import com.ssafy.whiskeywiki.domain.user.domain.User;
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
    private final ChatRepository chatRepository;

    public int saveChat(ChatDTO.ChatRequest chatRequest) {

        System.out.println("chat room id: " + chatRequest.getChatroomId());
//        System.out.println("user id: " + chatRequest.getUserId());

        Chat chat = chatRepository.save(Chat.builder()
                        .userChatroom(UserChatroom.builder().id(chatRequest.getChatroomId()).build())
                        .user(User.builder().id(chatRequest.getUserId()).build())
                        .message(chatRequest.getContent())
                        .dateTime(LocalDateTime.now())
                        .build());

        return chat.getId();
    }

    public List<ChatDTO.ChatResponse> getChatList() {
        List<ChatDTO.ChatResponse> chatResponseList = new ArrayList<>();



        return chatResponseList;
    }
}