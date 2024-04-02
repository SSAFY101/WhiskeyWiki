package com.ssafy.whiskeywiki.domain.user.dto;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

public class UserDTO {

    @Getter
    @Builder
    public static class RegisterRequest {
        private String loginId;
        private String password;
        private String nickname;
        private String address;
        private String gender;
        private int age;
    }

    @Getter
    public static class RegisterResponse {
        private final String userId;
        private final String nickname;

        public RegisterResponse(User user){
            this.userId = user.getLoginId();
            this.nickname = user.getNickname();
        }
    }

    @Getter
    @Builder
    public static class LoginRequest {
        private String loginId;
        private String password;
    }

    @Getter
    @Builder
    public static class LoginResponse {
        private String nickname;
    }

    @Getter
    @Builder
    public static class LoginServiceToController {
        private String accessToken;
        private String refreshToken;
        private String nickname;
    }

    @Getter
    @Builder
    public static class FindResponse {
        private String loginId;
        private String nickname;
        private int age;
        private String gender;
        private String address;
    }
}
