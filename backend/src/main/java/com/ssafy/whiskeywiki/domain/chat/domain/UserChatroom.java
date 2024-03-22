package com.ssafy.whiskeywiki.domain.chat.domain;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;

@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_chatrooms")
@Getter
public class UserChatroom {

    @Id @GeneratedValue
    @Column(name = "user_chatroom_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroom_id")
    private Chatroom chatroom;

    @OneToMany(mappedBy = "userChatroom", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<Chat> chatList = new ArrayList<>();

//    @OneToMany(mappedBy = "userChatroom")
//    private List<Chat> chatList = new ArrayList<>();

    @Builder.Default
    private boolean tradeIntention = false;
}