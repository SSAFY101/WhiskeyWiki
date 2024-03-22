package com.ssafy.whiskeywiki.domain.chat.domain;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Getter
public class Chat {
    @Id @GeneratedValue
    @Column(name = "chat_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_chatroom_id")
    private UserChatroom userChatroom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

//    private boolean read;
//    private boolean chatVisible;
    private String message;

    @CreatedDate
    private LocalDateTime dateTime;
}
