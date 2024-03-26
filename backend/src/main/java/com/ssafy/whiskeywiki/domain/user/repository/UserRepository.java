package com.ssafy.whiskeywiki.domain.user.repository;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByLoginId(String loginId);
    Optional<User> findByLoginIdAndPassword(String loginId, String password);
    Optional<User> findByRefreshToken(String refreshToken);
}
