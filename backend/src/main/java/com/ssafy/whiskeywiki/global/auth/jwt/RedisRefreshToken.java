package com.ssafy.whiskeywiki.global.auth.jwt;

import lombok.Getter;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@RedisHash(value = "RefreshToken", timeToLive = 60 * 60 * 24 * 3)
public class RedisRefreshToken {

    @Id
    private String refreshToken;

    @Indexed
    private String accessToken;

    @Indexed
    private String nickName;

    public RedisRefreshToken(String refreshToken, String accessToken, String nickName) {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.nickName = nickName;
    }
}