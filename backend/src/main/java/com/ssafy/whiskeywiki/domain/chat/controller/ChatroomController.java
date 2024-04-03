package com.ssafy.whiskeywiki.domain.chat.controller;

import com.ssafy.whiskeywiki.domain.chat.domain.Chatroom;
import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatroomDTO;
import com.ssafy.whiskeywiki.domain.chat.repository.UserChatroomRepository;
import com.ssafy.whiskeywiki.domain.chat.service.ChatroomService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import com.ssafy.whiskeywiki.global.util.Function;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom")
public class ChatroomController {

    private final ChatroomService chatroomService;
    private final UserChatroomRepository userChatroomRepository;

    @PostMapping("/create")
    public ResponseEntity<CommonResponse<ChatroomDTO.LoadChatroomResponse>> create(@RequestHeader (name = "authorization") String authToken, @RequestBody ChatroomDTO.PairIdRequest request) {
        String loginId = Function.authTokenToUserId(authToken);
        String pairId = request.getPairId();

        String message;
        HttpStatus httpStatus = HttpStatus.OK;
        ChatroomDTO.LoadChatroomResponse response = chatroomService.createChatroom(loginId, pairId);
        if (response == null) {
            message = "create chatroom fail";
//            httpStatus = 501;
            httpStatus = HttpStatus.NOT_IMPLEMENTED; // 501
        } else if (response.isExist()) {
            message = "reload chatroom success";
//            httpStatus = 201;
            httpStatus = HttpStatus.CREATED;    // 201
        } else {
            message = "create chatroom success";
//            httpStatus = 201;
            httpStatus = HttpStatus.CREATED;    // 201
        }



        return ResponseEntity.ok()
                .body(CommonResponse.<ChatroomDTO.LoadChatroomResponse>builder()
                        .message(message)
                        .status(httpStatus.value())
                        .data(response)
                        .build());
    }

    @GetMapping("/list")
    public ResponseEntity<CommonResponse<ChatroomDTO.ChatroomlistResponse>> chatroomlist(@RequestHeader(name = "Authorization") String authToken) {

        String loginId = Function.authTokenToUserId(authToken);
        List<Chatroom> chatroomList = userChatroomRepository.findChatroomsByLoginId(loginId);
        List<ChatroomDTO.ChatroomResponse> chatroomResponseList = new ArrayList<>();
        log.info("chatrooms(={})", chatroomList);
        for (Chatroom chatroom: chatroomList) {

            List<UserChatroom> userChatroomList = chatroom.getUserChatroomList();
            String pairNickname = null;
            for (UserChatroom userChatroom: userChatroomList) {
                if (!loginId.equals(userChatroom.getUser().getLoginId())) {
                    pairNickname = userChatroom.getUser().getNickname();
                }
            }

            chatroomResponseList.add(ChatroomDTO.ChatroomResponse.builder()
                            .id(chatroom.getId())
                            .pairNickname(pairNickname)
                            .lastChat(chatroom.getLastChat())
                            .editDateTime(chatroom.getEditTime())
                            .userStatus(false)
                            .pairStatus(false)
                            .build());
        }

        ChatroomDTO.ChatroomlistResponse chatroomlistResponse = ChatroomDTO.ChatroomlistResponse.builder().chatroomList(chatroomResponseList).build();
        CommonResponse<ChatroomDTO.ChatroomlistResponse> response = CommonResponse.<ChatroomDTO.ChatroomlistResponse>builder()
                .message("chatroom list")
                .data(chatroomlistResponse)
                .build();

        return ResponseEntity.ok()
                .body(response);
    }

    @DeleteMapping("/delete/{chatroomId}")
    public ResponseEntity<String> delete(@RequestHeader (name = "authorization") String authToken, @PathVariable int chatroomId) {
        String loginId = Function.authTokenToUserId(authToken);

        if (chatroomService.exitChatroom(loginId, chatroomId)) {
            return ResponseEntity.status(HttpStatus.OK).body("exit chatroom success");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("ext chatroom fail");
        }
    }
}
