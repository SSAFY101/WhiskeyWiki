package com.ssafy.whiskeywiki.domain.chat.repository;

import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    Optional<Chat> findById(int id);
//    List<Chat> findAllByUserChatroom(UserChatroom userChatroom);
}
