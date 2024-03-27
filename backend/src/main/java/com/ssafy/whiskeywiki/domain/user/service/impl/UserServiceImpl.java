package com.ssafy.whiskeywiki.domain.user.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.dto.UserDTO;
import com.ssafy.whiskeywiki.global.auth.jwt.RedisRefreshToken;
import com.ssafy.whiskeywiki.global.auth.provider.JwtProvider;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.auth.dto.AuthenticateUser;
import com.ssafy.whiskeywiki.global.auth.jwt.Jwt;
import com.ssafy.whiskeywiki.global.auth.repository.RedisRefreshTokenRepository;
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
    private final RedisRefreshTokenRepository redisRefreshTokenRepository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Override
    public UserDTO.RegisterResponse registerUser(UserDTO.RegisterRequest request) {
        User user = userRepository.save(request.entity());
        return new UserDTO.RegisterResponse(user);
    }

    @Override
    public UserDTO.LoginServiceToController login(UserDTO.LoginRequest loginRequest) {
        Optional<User> optionalUser = userRepository.findByLoginIdAndPassword(loginRequest.getLoginId(), loginRequest.getPassword());
        try {
            if (optionalUser.isPresent()) {
                System.out.println("user exist ...");
                User user = optionalUser.get();
                Map<String, Object> claims = new HashMap<>();

                AuthenticateUser authenticateUser = new AuthenticateUser(user.getLoginId());
                String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);
                claims.put(user.getLoginId(), authenticateUserJson);

                Jwt jwt = jwtProvider.createJwt(claims, user.getLoginId());
                saveRefreshToken(jwt, user.getLoginId());
//                log.info("refresh token : " + jwt.getRefreshToken());
//                user.updateRefreshToken(jwt.getRefreshToken());
//                userRepository.save(user);

                System.out.println("jwt exist ..?" + jwt.getRefreshToken());
                return UserDTO.LoginServiceToController.builder()
                        .accessToken(jwt.getAccessToken())
                        .refreshToken(jwt.getRefreshToken())
                        .nickName(user.getNickname())
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

            // 리프레시 토큰 만료기간 확인
            Date expiration = jwtClaims.getExpiration();
            if (expiration.before(new Date())) {
                return null;
            }

            Optional<User> optionalUser = userRepository.findByLoginId(jwtClaims.getSubject());
            if (optionalUser.isPresent()) { // 리프레시 토큰 유효성 체크
                User user = optionalUser.get();
                Map<String, Object> claims = new HashMap<>();

                AuthenticateUser authenticateUser = new AuthenticateUser(user.getLoginId());
                String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);

                claims.put(user.getLoginId(), authenticateUserJson);

                Jwt jwt = jwtProvider.createJwt(claims, user.getLoginId());
                updateRefreshToken(user.getLoginId(), jwt.getRefreshToken());

                return jwt;
            }
            return null;
        } catch (Exception e){
            return null;
        }
    }

//    private void tokenValidCheck(String refreshToken) throws Exception {
//        try {
//            Claims claims = jwtProvider.getClaims(refreshToken);
//
//            // 만료기간 확인
//            if (claims.getExpiration().before(new Date())) {
//                throw new Exception();
//            }
//
//            // get user with refresh token & setting access token, refresh token
//            Optional<User> optionalUser = userRepository.findByRefreshToken(refreshToken);
//            if (optionalUser.isPresent()) {
//                User user = optionalUser.get();
//
//
//            }
//        }
//    }

    private void saveRefreshToken(Jwt jwt, String loginId) {
        RedisRefreshToken redisRefreshToken = new RedisRefreshToken(jwt.getRefreshToken(), jwt.getAccessToken(), loginId);
        redisRefreshTokenRepository.save(redisRefreshToken);
    }
}
