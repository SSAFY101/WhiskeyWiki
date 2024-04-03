package com.ssafy.whiskeywiki.domain.chat.service;

import com.ssafy.whiskeywiki.domain.chat.domain.Chatroom;
import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatroomDTO;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatRepository;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatroomRepository;
import com.ssafy.whiskeywiki.domain.chat.repository.UserChatroomRepository;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatroomService {

    private final ChatRepository chatRepository;
    private final ChatroomRepository chatroomRepository;
    private final UserRepository userRepository;
    private final UserChatroomRepository userChatroomRepository;

    public ChatroomDTO.LoadChatroomResponse createChatroom(String loginId, String pairId) {
        Optional<User> optionalUser1 = userRepository.findByLoginId(loginId);
        if (optionalUser1.isEmpty()) return null;
        Optional<User> optionalUser2 = userRepository.findByLoginId(pairId);
        if (optionalUser2.isEmpty()) return null;

        Chatroom chatroom = null;
        boolean exist = false;
        Optional<Chatroom> optionalChatroom = userChatroomRepository.findChatroomByLoginIds(loginId, pairId);
        if (optionalChatroom.isPresent()) {
            chatroom = optionalChatroom.get();
            exist = true;
        } else {
            chatroom = Chatroom.builder().createTime(LocalDateTime.now()).build();
            chatroomRepository.save(chatroom);

            associateUserAndChatroom(loginId, chatroom);
            associateUserAndChatroom(pairId, chatroom);
        }

        return ChatroomDTO.LoadChatroomResponse.builder()
                .chatroomId(chatroom.getId())
                .pairNickname(optionalUser2.get().getNickname())
                .exist(exist)
                .build();
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

//    public ChatroomDTO.ChatroomlistResponse chatroomlist() { return new ChatroomDTO.ChatroomlistResponse() }

    @Transactional
    public boolean exitChatroom(String loginId, int chatroomId) {

        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        if (optionalUser.isEmpty()) return false;
        User user = optionalUser.get();
        Optional<Chatroom> optionalChatroom = chatroomRepository.findById(chatroomId);
        if (optionalChatroom.isEmpty()) return false;
        Chatroom chatroom = optionalChatroom.get();

        List<UserChatroom> userChatroomList = userChatroomRepository.findAllByChatroom(chatroom);
        Optional<UserChatroom> optionalUserChatroom = userChatroomRepository.findByUserAndChatroom(user, chatroom);
        if (optionalUserChatroom.isEmpty()) return false;

        UserChatroom userChatroom = optionalUserChatroom.get();
        userChatroom.exitChatroom();

        for (UserChatroom uc: userChatroomList) {
            if (uc.getId() != userChatroom.getId() && uc.isExit()) {
                // delete chatroom
                userChatroomRepository.delete(uc);
                userChatroomRepository.delete(userChatroom);
                chatRepository.deleteAllByChatroom(chatroom);
                chatroomRepository.delete(chatroom);
                break;
            }
        }

        return true;
    }
}
