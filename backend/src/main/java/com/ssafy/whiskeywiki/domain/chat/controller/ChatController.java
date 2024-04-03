package com.ssafy.whiskeywiki.domain.chat.controller;

import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.chat.domain.Chatroom;
import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatDTO;
import com.ssafy.whiskeywiki.domain.chat.dto.ChatMessage;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatRepository;
import com.ssafy.whiskeywiki.domain.chat.repository.ChatroomRepository;
import com.ssafy.whiskeywiki.domain.chat.repository.UserChatroomRepository;
import com.ssafy.whiskeywiki.domain.chat.service.ChatService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import com.ssafy.whiskeywiki.global.util.Function;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    SimpUserRegistry simpUserRegistry;

    private final SimpMessageSendingOperations messageSendingOperations;
    private final UserChatroomRepository userChatroomRepository;
    private final ChatService chatService;
    private final ChatRepository chatRepository;
    private final ChatroomRepository chatroomRepository;

    @MessageMapping("/message") // `/pub/message`
    public void chat(ChatDTO.ChatRequest chatRequest) {
        log.info("message(message = {})", chatRequest);

        ChatDTO.ChatResponse response = chatService.saveChat(chatRequest);
        messageSendingOperations.convertAndSend("/topic/chatroom/" + chatRequest.getChatroomId(), response);
    }

    @GetMapping("/chat/list/{chatroomId}")
    public ResponseEntity<CommonResponse<ChatDTO.ChatlistResponse>> chatlist(@RequestHeader (name = "authorization") String authToken, @PathVariable int chatroomId) {
        String loginId = Function.authTokenToUserId(authToken);
        Optional<Chatroom> optionalChatroom = chatroomRepository.findById(chatroomId);
        if (optionalChatroom.isEmpty()) return null;
        Chatroom chatroom = optionalChatroom.get();

        // 결과를 "yyyy-MM-dd HH:mm" 형식으로 출력
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        List<Chat> chatList = chatRepository.findAllByChatroom(chatroom);
        List<ChatDTO.ChatlistResponseEntity> chatResponseList = new ArrayList<>();
        for(Chat chat: chatList) {
            boolean myMessage = false;
            if (loginId.equals(chat.getUser().getLoginId())) {
                myMessage = true;
            }
            ChatDTO.ChatlistResponseEntity chatResponse = ChatDTO.ChatlistResponseEntity.builder()
                    .chatId(chat.getId())
                    .myMessage(myMessage)
                    .content(chat.getMessage())
                    .dateTime(chat.getDateTime().format(formatter))
                    .build();

            chatResponseList.add(chatResponse);
        }

        List<UserChatroom> userChatroomList = userChatroomRepository.findAllByChatroom(chatroom);
        int pairKey = 0;
        int userKey = 0;

        for (UserChatroom uc: userChatroomList) {
            if (!uc.getUser().getLoginId().equals(loginId)) {
                pairKey = uc.getUser().getId();
            } else {
                userKey = uc.getUser().getId();
            }
        }

        ChatDTO.ChatlistResponse chatlistResponse = ChatDTO.ChatlistResponse.builder()
                .userId(userKey)
                .pairId(pairKey)
                .chatResponseList(chatResponseList).build();

        return ResponseEntity.ok().body(CommonResponse.<ChatDTO.ChatlistResponse>builder().data(chatlistResponse).build());
    }
}