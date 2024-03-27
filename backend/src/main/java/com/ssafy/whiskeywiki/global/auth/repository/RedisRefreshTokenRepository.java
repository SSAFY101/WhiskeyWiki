package com.ssafy.whiskeywiki.global.auth.repository;

import com.ssafy.whiskeywiki.global.auth.jwt.RedisRefreshToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RedisRefreshTokenRepository extends CrudRepository<RedisRefreshToken, String> {
    Optional<RedisRefreshToken> findByAccessToken(String accessToken);
}
