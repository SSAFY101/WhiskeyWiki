package com.ssafy.whiskeywiki.global.auth.controller;

import com.ssafy.whiskeywiki.domain.user.dto.UserDTO;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.auth.jwt.Jwt;
import com.ssafy.whiskeywiki.global.auth.jwt.RedisRefreshToken;
import com.ssafy.whiskeywiki.global.auth.repository.RedisRefreshTokenRepository;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
//    private final UserRepository userRepository;
    private final RedisRefreshTokenRepository redisRefreshTokenRepository;

    @PostMapping("/login")
    private ResponseEntity<?> login(@RequestBody UserDTO.LoginRequest request) {
        log.info("login init");
        System.out.println(request.getLoginId() + " " + request.getPassword());
        UserDTO.LoginServiceToController jwtAndNickName = userService.login(UserDTO.LoginRequest.builder()
                .loginId(request.getLoginId())
                .password(request.getPassword())
                .build());

        if (jwtAndNickName == null)
            return ResponseEntity.ok().body("login fail");

        String nickName = jwtAndNickName.getNickName();
        log.info("nickname(= {})", nickName);
        redisRefreshTokenRepository.findByNickName(nickName)
                .ifPresent(redisRefreshTokenRepository::delete);

        UserDTO.LoginResponse loginResponse = UserDTO.LoginResponse.builder().nickName(jwtAndNickName.getNickName()).build();
        CommonResponse<UserDTO.LoginResponse> response = CommonResponse.<UserDTO.LoginResponse>builder()
                .status(HttpStatus.OK.value())
                .message("login success")
                .data(loginResponse)
                .build();

        // HTTP 헤더 설정 (access token, refresh token)
        HttpHeaders headers = new HttpHeaders();
//        headers.set("Access-Token", jwtAndNickName.getAccessToken());
//        headers.set("Refresh-Token", jwtAndNickName.getRefreshToken());
        headers.set("Authorization", "Bearer " + jwtAndNickName.getAccessToken());

        // COOKIE 설정 (refresh token)
        ResponseCookie refreshTokenCookie = ResponseCookie.from("Refresh-Token", jwtAndNickName.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(1000 * 60 * 60 * 24 * 7)
                .build();

        headers.set(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        return ResponseEntity.ok()
                .headers(headers)
                .body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(name = "Authorization") String authToken) {

        // delete refresh token in mysql
//        Optional<User> optionalUser = userRepository.findByRefreshToken(refreshToken);
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//            user.updateRefreshToken(null);
//            userRepository.save(user);
//        }

        String accessToken = authToAccessToken(authToken);

        // delete refresh token in redis
        redisRefreshTokenRepository.findByAccessToken(accessToken)
                .ifPresent(redisRefreshTokenRepository::delete);

        CommonResponse<?> response = CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("logout success")
                .build();

        return ResponseEntity.ok()
                .body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Jwt> tokenRefresh(/*@RequestHeader(name = "Refresh-Token") String refreshToken*/
    HttpServletRequest request) {

        String refreshToken = "";
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("Refresh-Token".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    log.info("refresh token(= {})", refreshToken);


                }
            }
        }
        if (refreshToken != null) {
            log.info("refresh token is not null");
            redisRefreshTokenRepository.findByRefreshToken(refreshToken)
                    .ifPresent(redisRefreshTokenRepository::delete);
        }


        Jwt jwt = userService.refreshToken(refreshToken);
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }


        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("authorization", "bearer " + jwt.getAccessToken());

        ResponseCookie responseCookie = ResponseCookie.from("Refresh-Token", jwt.getRefreshToken())
                                                        .httpOnly(true)
                                                        .secure(true)
                                                        .path("/")
                                                        .maxAge(1000 * 60 * 60 * 24 * 7)
                                                        .build();

        httpHeaders.set(HttpHeaders.SET_COOKIE, responseCookie.toString());

        return ResponseEntity.ok()
                .headers(httpHeaders)
                .body(jwt);
    }

    private static String authToAccessToken(String authorization) {
        return authorization.substring(7);
    }
}
