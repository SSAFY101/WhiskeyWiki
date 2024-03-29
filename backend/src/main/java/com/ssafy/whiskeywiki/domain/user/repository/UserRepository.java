package com.ssafy.whiskeywiki.domain.user.repository;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByLoginId(String loginId);
    Optional<User> findByNickname(String nickname);
    Optional<User> findByLoginIdAndPassword(String loginId, String password);
}
