package com.ssafy.whiskeywiki.domain.user.controller;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.dto.UserDTO;
import com.ssafy.whiskeywiki.domain.user.provider.JwtProvider;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import io.jsonwebtoken.Claims;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.server.Cookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @PostMapping("/register")
    private ResponseEntity<UserDTO.RegisterResponse> register(@RequestBody UserDTO.RegisterRequest request) {
        return ResponseEntity.ok(userService.registerUser(request));
    }

    @PostMapping("/login")
    private ResponseEntity<?> login(@RequestBody UserDTO.LoginRequest request) {
        System.out.println("init ???");

        UserDTO.LoginResponse getToken = userService.login(UserDTO.LoginRequest.builder()
                                                    .loginId(request.getLoginId())
                                                    .password(request.getPassword())
                                                    .build());

        if (getToken == null)
            return ResponseEntity.ok().body("fail");

        CommonResponse<UserDTO.LoginResponse> response = CommonResponse.<UserDTO.LoginResponse>builder()
                .status(HttpStatus.OK.value())
                .message("success")
                .data(UserDTO.LoginResponse.builder()
                        .accessToken(getToken.getAccessToken())
                        .refreshToken(getToken.getRefreshToken())
                        .build())
                .build();

//        return ResponseEntity.ok()
////                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
////                .headers(headers)
//                .body(response);
//
        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Access-Token", getToken.getAccessToken());

        ResponseCookie refreshTokenCookie = ResponseCookie.from("Refresh-Token", getToken.getRefreshToken())
                                                    .httpOnly(true)
                                                    .secure(true)
                                                    .path("/")
                                                    .maxAge(0)
                                                    .build();

        headers.set(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .headers(headers)
                .body(response);
    }

    @PostMapping("/token")
    public ResponseEntity<?> token(@RequestHeader("Access-Token") String accessToken, @RequestBody UserDTO.LoginResponse loginResponse) {

        Claims claims = jwtProvider.getClaims(accessToken);
        System.out.println("acess token ..." + claims.getSubject());

        return ResponseEntity.ok().body(claims.getSubject());
    }
}
