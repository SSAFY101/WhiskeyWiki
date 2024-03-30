package com.ssafy.whiskeywiki.domain.chat.service;

import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatDTO;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatRepository;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    // 수신자 A, 수신자 B, 컨텐츠
    public void sendCustomMessages(String roomNumber, String userA, String userB, Object content) {

        // user ... AccessToken or loginId
        simpMessagingTemplate.convertAndSendToUser(userA, "/topic/chatroom/" + roomNumber, content);
        simpMessagingTemplate.convertAndSendToUser(userB, "/topic/chatroom/" + roomNumber, content);
    }

    public int saveChat(ChatDTO.ChatRequest chatRequest) {

        System.out.println("chat room id: " + chatRequest.getChatroomId());
//        System.out.println("user id: " + chatRequest.getUserId());

        Chat chat = chatRepository.save(Chat.builder()
                        .userChatroom(UserChatroom.builder().id(chatRequest.getChatroomId()).build())
                        .user(User.builder().id(chatRequest.getLoginId()).build())
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