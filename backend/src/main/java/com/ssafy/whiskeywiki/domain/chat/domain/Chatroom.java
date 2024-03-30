package com.ssafy.whiskeywiki.domain.chat.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chatrooms")
@Getter
public class Chatroom {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatroom_id")
    private int id;

    @OneToMany(mappedBy = "chatroom", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<UserChatroom> userChatroomList = new ArrayList<>();

    @CreatedDate
    private LocalDateTime createTime;

    @CreatedDate
    private LocalDateTime editTime;

    private String lastChat;
}
