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
        int chatroomId;
        String pairNickname;
        String lastMassage;
        LocalDateTime editDateTime;
        boolean userStatus;
        boolean pairStatus;
    }

    @Getter
    @Builder
    public static class ChatroomlistResponse {
        List<ChatroomResponse> chatRoomList;
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
