package com.ssafy.whiskeywiki.domain.chat.repository;

import com.ssafy.whiskeywiki.domain.chat.domain.Chatroom;
import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserChatroomRepository extends JpaRepository<UserChatroom, Integer> {

    @Query("SELECT ucr.chatroom FROM UserChatroom ucr WHERE ucr.user.loginId IN (?1, ?2) GROUP BY ucr.chatroom HAVING COUNT(ucr.chatroom) = 2")
    Optional<Chatroom> findChatroomByLoginIds(String from, String to);
}
