package com.ssafy.whiskeywiki.global.auth.repository;

import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.global.auth.jwt.Jwt;
import com.ssafy.whiskeywiki.global.auth.jwt.RedisRefreshToken;
import com.ssafy.whiskeywiki.global.auth.provider.JwtProvider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

@SpringBootTest
class RefreshTokenRepositoryTest {

    @Autowired
    JwtProvider jwtProvider;
    @Autowired
    RedisRefreshTokenRepository redisRefreshTokenRepository;
    @Autowired
    UserRepository userRepository;



    @Test
    @DisplayName("save refresh token")
    void saveRefreshToken() {

        Map<String, Object> claims = new HashMap<>();
        claims.put("x", "x");

        Jwt jwt = jwtProvider.createJwt(claims, "shl");
        RedisRefreshToken redis = new RedisRefreshToken(jwt.getRefreshToken(), jwt.getAccessToken(), "1");
        redisRefreshTokenRepository.save(redis);
//        setTokenResponse(response, accessToken, refreshToken);
    }

    @Test
    @DisplayName("get refresh token")
    void getRefreshToken() {
        Optional<RedisRefreshToken> optionalRedisRefreshToken = redisRefreshTokenRepository.findByAccessToken("eyJhbGciOiJIUzM4NCJ9.eyJ4IjoieCIsInN1YiI6InNobCIsImV4cCI6MTcxMTM5MTkyOX0.vZPc6i_4HlCbhpNbqfKm1fAx2-iSTduoaPnMbHo3iFg0WS__-o4kYyI12S0VlwBe");

        if (optionalRedisRefreshToken.isPresent()) {
            RedisRefreshToken redisRefreshToken = optionalRedisRefreshToken.get();
            System.out.println(redisRefreshToken.getAccessToken());
            System.out.println(redisRefreshToken.getRefreshToken());
            System.out.println(redisRefreshToken.getLoginId());
        }
    }
}