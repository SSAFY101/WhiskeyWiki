package com.ssafy.whiskeywiki.global.auth;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthenticateUser {
    public String loginId;

    public AuthenticateUser(String loginId) {
        this.loginId = loginId;
    }
}
