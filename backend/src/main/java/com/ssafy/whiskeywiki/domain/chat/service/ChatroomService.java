package com.ssafy.whiskeywiki.domain.chat.service;

import com.ssafy.whiskeywiki.domain.chat.domain.Chatroom;
import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatroomDTO;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatroomRepository;
import com.ssafy.whiskeywiki.domain.chat.repository.UserChatroomRepository;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatroomService {

    private final ChatroomRepository chatroomRepository;
    private final UserRepository userRepository;
    private final UserChatroomRepository userChatroomRepository;

    public Chatroom createChatroom(ChatroomDTO.ChatroomRequest request) {

        Optional<Chatroom> optionalChatroom = userChatroomRepository.findChatroomByLoginIds(request.getFrom(), request.getTo());
        if (optionalChatroom.isPresent()) return null;

        Chatroom chatroom = new Chatroom();
        chatroomRepository.save(chatroom);

        associateUserAndChatroom(request.getFrom(), chatroom);
        associateUserAndChatroom(request.getTo(), chatroom);

        return chatroom;
    }

    private void associateUserAndChatroom(String loginId, Chatroom chatroom) {
        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            UserChatroom userChatroom = UserChatroom.builder()
                                                    .user(user)
                                                    .chatroom(chatroom)
                                                    .build();

            userChatroomRepository.save(userChatroom);
        }
    }
}
