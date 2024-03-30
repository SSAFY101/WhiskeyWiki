package com.ssafy.whiskeywiki.domain.chat.controller;

import com.ssafy.whiskeywiki.domain.chat.domain.Chatroom;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatroomDTO;
import com.ssafy.whiskeywiki.domain.chat.service.ChatroomService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom")
public class ChatroomController {

    private final ChatroomService chatroomService;

    @PostMapping("/create")
    public ResponseEntity<CommonResponse> create(@RequestBody ChatroomDTO.ChatroomRequest request) {

        String message;
        Chatroom chatroom = chatroomService.createChatroom(request);
        if (chatroom == null) {
            message = "create chatroom fail";
        } else {
            message = "create chatroom success";
        }

        return ResponseEntity.ok().body(CommonResponse.builder()
                                                        .message(message)
                                                        .build());
    }
}
