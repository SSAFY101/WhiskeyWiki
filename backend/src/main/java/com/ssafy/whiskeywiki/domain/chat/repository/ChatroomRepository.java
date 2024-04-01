package com.ssafy.whiskeywiki.domain.chat.repository;

import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.chat.domain.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface ChatroomRepository extends JpaRepository<Chatroom, Integer> {
    Optional<Chatroom> findById(int id);
}
