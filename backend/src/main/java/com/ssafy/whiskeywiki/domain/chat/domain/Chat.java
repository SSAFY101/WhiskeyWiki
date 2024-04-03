package com.ssafy.whiskeywiki.domain.chat.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "chats")
@Getter
public class Chat {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "chat_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroom_id")
    @JsonIgnore
    private Chatroom chatroom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    private Boolean isRead;
    private boolean chatVisible;
    private String message;

    @CreatedDate
    private LocalDateTime dateTime;
}
