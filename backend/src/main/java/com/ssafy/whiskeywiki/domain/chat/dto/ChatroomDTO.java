package com.ssafy.whiskeywiki.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

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
        LocalDateTime createDate;
        String from;
        String to;
    }
}
