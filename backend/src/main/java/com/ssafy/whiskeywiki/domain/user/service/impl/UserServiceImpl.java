package com.ssafy.whiskeywiki.domain.user.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.dto.UserDTO;
import com.ssafy.whiskeywiki.domain.user.provider.JwtProvider;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.auth.AuthenticateUser;
//import com.ssafy.whiskeywiki.global.auth.Filter.VerifyUserFilter;
import com.ssafy.whiskeywiki.global.config.jwt.Jwt;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Override
    public UserDTO.RegisterResponse registerUser(UserDTO.RegisterRequest request) {
        User user = userRepository.save(request.entity());
        return new UserDTO.RegisterResponse(user);
    }

    @Override
    public UserDTO.LoginResponse login(UserDTO.LoginRequest loginRequest) {
        Optional<User> optionalUser = userRepository.findByLoginIdAndPassword(loginRequest.getLoginId(), loginRequest.getPassword());
        try {
            if (optionalUser.isPresent()) {
                System.out.println("service impl init ?");
                User user = optionalUser.get();
                Map<String, Object> claims = new HashMap<>();

                AuthenticateUser authenticateUser = new AuthenticateUser(user.getLoginId());
                String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);
//                claims.put(VerifyUserFilter.AUTHENTICATE_USER, authenticateUserJson);
                claims.put(user.getLoginId(), authenticateUserJson);

                Jwt jwt = jwtProvider.createJwt(claims, loginRequest.getLoginId());
                System.out.println("refresh token : " + jwt.getRefreshToken());
                user.updateRefreshToken(jwt.getRefreshToken());
                userRepository.save(user);

                System.out.println("service impl out ?");
                return UserDTO.LoginResponse.builder()
                        .accessToken(jwt.getAccessToken())
                        .refreshToken(jwt.getRefreshToken())
                        .build();
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public void updateRefreshToken(String loginId, String refreshToken) {
        Optional<User> user = userRepository.findByLoginId(loginId);
        user.ifPresent(u -> u.updateRefreshToken(refreshToken));
    }

    @Override
    public Jwt refreshToken(String refreshToken) {  // 리프레시 토큰 기반 JWT 생성 로직
        try {
            jwtProvider.getClaims(refreshToken);
            Optional<User> optionalUser = userRepository.findByRefreshToken(refreshToken);
            if (optionalUser.isPresent()) { // 리프레시 토큰 유효성 체크
                User user = optionalUser.get();
                Map<String, Object> claims = new HashMap<>();

                AuthenticateUser authenticateUser = new AuthenticateUser(user.getLoginId());
                String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);
//                claims.put(VerifyUserFilter.AUTHENTICATE_USER, authenticateUserJson);
                claims.put(user.getLoginId(), authenticateUserJson);

                Jwt jwt = jwtProvider.createJwt(claims, user.getLoginId());
                updateRefreshToken(user.getLoginId(), user.getRefreshToken());

                return jwt;
            }
            return null;
        } catch (JsonProcessingException e){
            return null;
        }
    }
}
