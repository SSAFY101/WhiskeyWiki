package com.ssafy.whiskeywiki.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class ChatDTO {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ChatRequest {
        protected String userId;
        protected int chatroomId;
        protected String content;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ChatResponse {
        protected int chatId;
        protected String userId;
        protected String content;
        protected String dateTime;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ChatlistResponseEntity {
        protected int chatId;
        protected boolean myMessage;
        protected String content;
        protected String dateTime;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ChatlistResponse {
        String userId;
        String pairId;
        List<ChatlistResponseEntity> chatResponseList;

        void updateUserId(String userId) {
            this.userId = userId;
        }

        void updatePairId(String pairId) {
            this.pairId = pairId;
        }
    }
}
