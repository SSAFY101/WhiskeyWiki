package com.ssafy.whiskeywiki.global.auth.jwt;

import lombok.Getter;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@RedisHash(value = "RefreshToken", timeToLive = 60 * 60 * 24 * 7)
public class RedisRefreshToken {

    @Id
    private String refreshToken;

    @Indexed
    private String accessToken;

    private String loginId;

    public RedisRefreshToken(String refreshToken, String accessToken, String loginId) {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.loginId = loginId;

    }
}
