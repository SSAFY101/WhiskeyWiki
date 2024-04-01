package com.ssafy.whiskeywiki.domain.chat.dto;

import lombok.Data;

@Data
public class ChatMessage {
    // 메시지 타입 : 입장, 채팅
//    public enum MessageType {
//        ENTER, TALK
//    }
//    private String type; // 메시지 타입
    private String chatroomId; // 방번호
    private String sender; // 메시지 보낸사람
    private String content; // 메시지
}