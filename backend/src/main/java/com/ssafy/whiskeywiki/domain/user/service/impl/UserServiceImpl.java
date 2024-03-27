package com.ssafy.whiskeywiki.domain.user.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.dto.UserDTO;
import com.ssafy.whiskeywiki.global.auth.provider.JwtProvider;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.auth.dto.AuthenticateUser;
//import com.ssafy.whiskeywiki.global.auth.Filter.VerifyUserFilter;
import com.ssafy.whiskeywiki.global.auth.jwt.Jwt;
import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.Optional;

@Slf4j
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
                log.info("service impl init ?");
                User user = optionalUser.get();
                Map<String, Object> claims = new HashMap<>();

                AuthenticateUser authenticateUser = new AuthenticateUser(user.getLoginId());
                String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);
                claims.put(user.getLoginId(), authenticateUserJson);

                Jwt jwt = jwtProvider.createJwt(claims, user.getLoginId());
                log.info("refresh token : " + jwt.getRefreshToken());
                user.updateRefreshToken(jwt.getRefreshToken());
                userRepository.save(user);

                log.info("service impl out ?");
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
            Claims jwtClaims = jwtProvider.getClaims(refreshToken);
            Date expiration = jwtClaims.getExpiration();
            if (expiration.before(new Date())) {
                return null;
            }

            Optional<User> optionalUser = userRepository.findByRefreshToken(refreshToken);
            if (optionalUser.isPresent()) { // 리프레시 토큰 유효성 체크
                User user = optionalUser.get();
                Map<String, Object> claims = new HashMap<>();



                AuthenticateUser authenticateUser = new AuthenticateUser(user.getLoginId());
                String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);

                claims.put(user.getLoginId(), authenticateUserJson);

                Jwt jwt = jwtProvider.createJwt(claims, user.getLoginId());
                updateRefreshToken(user.getLoginId(), user.getRefreshToken());

                return jwt;
            }
            return null;
        } catch (Exception e){
            return null;
        }
    }
}
