package com.ssafy.whiskeywiki.global.auth.controller;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.dto.UserDTO;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.auth.dto.TokenRefreshDto;
import com.ssafy.whiskeywiki.global.auth.jwt.Jwt;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Access-Token, Refresh-Token")
public class AuthController {
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    private ResponseEntity<?> login(@RequestBody UserDTO.LoginRequest request) {
        log.info("login init");

        UserDTO.LoginResponse loginResponse = userService.login(UserDTO.LoginRequest.builder()
                .loginId(request.getLoginId())
                .password(request.getPassword())
                .build());

        if (loginResponse == null)
            return ResponseEntity.ok().body("fail");

        CommonResponse<UserDTO.LoginResponse> response = CommonResponse.<UserDTO.LoginResponse>builder()
                .status(HttpStatus.OK.value())
                .message("success")
                .data(loginResponse)
                .build();

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Access-Token", loginResponse.getAccessToken());
        headers.set("Refresh-Token", loginResponse.getRefreshToken());

        ResponseCookie refreshTokenCookie = ResponseCookie.from("Refresh-Token", loginResponse.getRefreshToken())
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
    public ResponseEntity<?> logout(@RequestHeader(name = "Refresh-Token") String refreshToken) {

        Optional<User> optionalUser = userRepository.findByRefreshToken(refreshToken);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.updateRefreshToken(null);
            userRepository.save(user);
        }

        CommonResponse<?> response = CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("logout success")
                .build();

        return ResponseEntity.ok()
                .body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Jwt> tokenRefresh(@RequestHeader(name = "Refresh-Token") String refreshToken) {
        log.info("init ...");
        Jwt jwt = userService.refreshToken(refreshToken);
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Access-Token", jwt.getAccessToken());
        httpHeaders.set("Refresh-Token", jwt.getRefreshToken());

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
}
