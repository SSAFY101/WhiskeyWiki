package com.ssafy.whiskeywiki.domain.chat.repository;

import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.chat.domain.Chatroom;
import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserChatroomRepository extends JpaRepository<UserChatroom, Integer> {

    @Query("SELECT uc.chatroom FROM UserChatroom uc WHERE uc.user.loginId IN (?1, ?2) GROUP BY uc.chatroom HAVING COUNT(uc.chatroom) = 2")
    Optional<Chatroom> findChatroomByLoginIds(String from, String to);

    @Query("select ucr.chatroom from UserChatroom ucr where ucr.user.loginId in (?1)")
    List<Chatroom> findChatroomsByLoginId(String loginId);

    Optional<UserChatroom> findByUserAndChatroom(User user, Chatroom chatroom);
    List<UserChatroom> findAllByChatroom(Chatroom chatroom);
}
