package com.ssafy.whiskeywiki.domain.user.controller;

import com.ssafy.whiskeywiki.domain.user.dto.UserDTO;
import com.ssafy.whiskeywiki.domain.user.provider.JwtProvider;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import io.jsonwebtoken.Claims;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
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

//        // Refresh-Token을 쿠키에 설정
//        ResponseCookie refreshCookie = ResponseCookie.from("Refresh-Token", getToken.getRefreshToken())
//                .httpOnly(true) // JavaScript를 통한 접근 방지
//                .secure(true) // HTTPS 통신에서만 쿠키 전송
//                .path("/") // 쿠키가 전송될 경로
//                // 필요에 따라 maxAge, domain 등의 추가 설정 가능
//                .build();
//
//        // Set-Cookie 헤더에 추가
//        headers.add(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        ResponseCookie refreshTokenCookie = ResponseCookie.from("RefreshToken", getToken.getRefreshToken())
                                                    .httpOnly(true)
                                                    .secure(true)
                                                    .path("/")
                                                    .maxAge(60 * 60 * 24 * 2)
                                                    .build();

        headers.set(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .headers(headers)
                .body(response);
    }

    @GetMapping("/token")
    public ResponseEntity<?> token(@RequestBody UserDTO.LoginResponse loginResponse) {

        Claims atClaims = jwtProvider.getClaims(loginResponse.getAccessToken());
        System.out.println("acess token ..." + atClaims.getSubject());

        Claims rtClaims = jwtProvider.getClaims(loginResponse.getRefreshToken());
        System.out.println("refresh token ..." + rtClaims.getSubject());

        return ResponseEntity.ok().body(rtClaims.getSubject());
    }
}
