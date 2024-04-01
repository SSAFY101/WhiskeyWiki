package com.ssafy.whiskeywiki.domain.chat.service;

import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.chat.domain.Chatroom;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatDTO;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatRepository;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatroomRepository;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final ChatroomRepository chatroomRepository;
    private final ChatroomService chatroomService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    // 수신자 A, 수신자 B, 컨텐츠
    public void sendCustomMessages(String roomNumber, String userA, String userB, Object content) {

        // user ... AccessToken or loginId
        simpMessagingTemplate.convertAndSendToUser(userA, "/topic/chatroom/" + roomNumber, content);
        simpMessagingTemplate.convertAndSendToUser(userB, "/topic/chatroom/" + roomNumber, content);
    }

    public ChatDTO.ChatResponse saveChat(ChatDTO.ChatRequest chatRequest) {

        Optional<Chatroom> optionalChatroom = chatroomRepository.findById(chatRequest.getChatroomId());
        if (optionalChatroom.isEmpty()) return null;
        Chatroom chatroom = optionalChatroom.get();

        Optional<User> optionalUser = userRepository.findByLoginId(chatRequest.getUserId());
        if (optionalUser.isEmpty()) return null;
        User user = optionalUser.get();

        String content = chatRequest.getContent();
        LocalDateTime now = LocalDateTime.now();

        chatroom.updateEditTime(now);
        chatroom.updateLastChat(content);

        Chat chat = chatRepository.save(Chat.builder()
                .chatroom(chatroom)
                .user(user)
                .message(content)
                .dateTime(now)
                .build());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return ChatDTO.ChatResponse.builder()
                .chatId(chat.getId())
                .userId(chatRequest.getUserId())
                .content(chatRequest.getContent())
                .dateTime(now.format(formatter))
                .build();
    }

    public List<ChatDTO.ChatResponse> getChatList() {
        List<ChatDTO.ChatResponse> chatResponseList = new ArrayList<>();



        return chatResponseList;
    }
}