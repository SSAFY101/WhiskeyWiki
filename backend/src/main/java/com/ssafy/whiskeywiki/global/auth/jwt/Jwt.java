package com.ssafy.whiskeywiki.global.auth.jwt;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Jwt {

    private String accessToken;
    private String refreshToken;
    private String loginId;

    @Builder
    public Jwt(String accessToken, String refreshToken, String loginId) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.loginId = loginId;
    }
}
