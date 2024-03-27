package com.ssafy.whiskeywiki.domain.user.controller;

import com.ssafy.whiskeywiki.domain.user.dto.UserDTO;
import com.ssafy.whiskeywiki.global.auth.provider.JwtProvider;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
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

    @PostMapping("/token")
    public ResponseEntity<?> token(@RequestHeader("Access-Token") String accessToken, @RequestBody UserDTO.LoginResponse loginResponse) {

        Claims claims = jwtProvider.getClaims(accessToken);
        System.out.println("acess token ..." + claims.getSubject());

        return ResponseEntity.ok().body(claims.getSubject());
    }

    @GetMapping("/whiskey")
    public ResponseEntity<?> taste() {
        System.out.println("whiskey taste init ....");
        return ResponseEntity.ok().body("");
    }

    @GetMapping("/cocktail/taste")
    public ResponseEntity<?> ppppp() {
        System.out.println("cocktail taste init ....");
        return ResponseEntity.ok().body("");
    }

    @GetMapping("/whitelabel/taste")
    public ResponseEntity<?> ppppq() {
        System.out.println("whitelabel taste init ....");
        return ResponseEntity.ok().body("");
    }
}
