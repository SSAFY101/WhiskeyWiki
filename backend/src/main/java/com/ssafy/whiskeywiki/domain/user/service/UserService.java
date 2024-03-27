package com.ssafy.whiskeywiki.domain.user.service;

import com.ssafy.whiskeywiki.domain.user.dto.UserDTO;
import com.ssafy.whiskeywiki.global.auth.jwt.Jwt;

public interface UserService {
    public UserDTO.RegisterResponse registerUser(UserDTO.RegisterRequest registerRequest);
    public UserDTO.LoginResponse login(UserDTO.LoginRequest loginRequest);
    public void updateRefreshToken(String userId, String refreshToken);
    public Jwt refreshToken(String refreshToken);
    int getUserIdByAccessToken(String accessToken);
}
