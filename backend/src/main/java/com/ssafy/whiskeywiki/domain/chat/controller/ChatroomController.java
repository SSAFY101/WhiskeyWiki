package com.ssafy.whiskeywiki.domain.chat.controller;

import com.ssafy.whiskeywiki.domain.chat.dto.ChatroomDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom")
public class ChatroomController {


    @PostMapping("/create")
    public void create(@RequestBody ChatroomDTO.ChatroomRequest request) {

    }
}
