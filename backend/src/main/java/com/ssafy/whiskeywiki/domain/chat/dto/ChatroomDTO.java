package com.ssafy.whiskeywiki.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;

public class ChatroomDTO {

    @Getter
    @Builder
    public static class ChatroomRequest {
        int from;
        int to;
    }
}
