package com.ssafy.whiskeywiki.domain.chat.repository;

import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserChatroomRepository extends JpaRepository<UserChatroom, Integer> {
}
