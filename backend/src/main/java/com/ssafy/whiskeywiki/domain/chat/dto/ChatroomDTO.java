package com.ssafy.whiskeywiki.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.*;

public class ChatroomDTO {

    @Getter
    @Builder
    public static class ChatroomRequest {
        String from;
        String to;
    }

    @Getter
    @Builder
    public static class ChatroomResponse {
        int id;
        String pairNickname;
        String lastChat;
        LocalDateTime editDateTime;
        boolean userStatus;
        boolean pairStatus;
    }

    /**
     *       “chatRoomId”: 0
     *       ”pairNickname”: “상대닉네임”,
     *       “lastMassage”: “hello whiskey”
     *       “userStatus”: false,
     *       “pairStatus”: true,
     */

    @Getter
    @Builder
    public static class ChatroomlistResponse {
        List<ChatroomResponse> chatroomList;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PairIdRequest {
        String pairId;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LoadChatroomResponse {
        int chatroomId;
        String pairNickname;
        boolean exist;
    }
}
