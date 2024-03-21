package com.ssafy.whiskeywiki.domain.chat.repository;

import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import static org.assertj.core.api.Assertions.*;


//@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@SpringBootTest
@Rollback(value = false)
class ChatRepositoryTest {

    @Autowired
    ChatRepository chatRepository;
    @Autowired
    EntityManager em;

    @Transactional
    @Test
    public void chatSaveFind() throws Exception {

        // given
        Random random = new Random();

        User user = User.builder().build();
        UserChatroom userChatroom = UserChatroom.builder().build();

        Chat chat = Chat.builder()
                .user(user)
                .userChatroom(userChatroom)
//                .chatVisible(false)
                .message("message")
                .dateTime(LocalDateTime.now())
                .build();

        // do
        em.persist(user);
        em.persist(userChatroom);
        chatRepository.save(chat);

        em.flush();
        em.clear();

        // then
        Optional<Chat> findChat = chatRepository.findById(chat.getId());
        assertThat(chat.getId()).isEqualTo(findChat.get().getId());
    }
}