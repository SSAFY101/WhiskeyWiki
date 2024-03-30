package com.ssafy.whiskeywiki.domain.chat.service;

import com.ssafy.whiskeywiki.domain.chat.repository.ChatroomRepository;
import com.ssafy.whiskeywiki.domain.chat.repository.UserChatroomRepository;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatroomService {

    private final ChatroomRepository chatroomRepository;
    private final UserRepository userRepository;
    private final UserChatroomRepository userChatroomRepository;

    public String
}
