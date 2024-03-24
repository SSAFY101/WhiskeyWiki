package com.ssafy.whiskeywiki.global.auth.controller;

import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.auth.dto.TokenRefreshDto;
import com.ssafy.whiskeywiki.global.config.jwt.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    @PostMapping("/refresh/token")
    public ResponseEntity<Jwt> tokenRefresh(@RequestBody TokenRefreshDto tokenRefreshDto) {
        Jwt jwt = userService.refreshToken(tokenRefreshDto.getRefreshToken());
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.ok(jwt);
    }
}
