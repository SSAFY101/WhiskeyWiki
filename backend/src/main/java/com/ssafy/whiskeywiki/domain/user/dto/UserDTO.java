package com.ssafy.whiskeywiki.domain.user.dto;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;

public class UserDTO {

    @Getter
    @Builder
    public static class LoginRequest {
        private String loginId;
        private String password;
    }

    @Getter
    @Builder
    public static class LoginResponse {
        private String accessToken;
        private String refreshToken;
    }

    @Getter
    @Builder
    public static class RegisterRequest {
        private String loginId;
        private String password;
        private String nickName;

        public User entity() {
            return User.builder()
                    .loginId(loginId)
                    .password(password)
                    .nickname(nickName)
                    .build();
        }
    }

    @Getter
    public static class RegisterResponse {
        private final String userId;
        private final String nickName;

        public RegisterResponse(User user){
            this.userId = user.getLoginId();
            this.nickName = user.getNickname();
        }
    }
}
