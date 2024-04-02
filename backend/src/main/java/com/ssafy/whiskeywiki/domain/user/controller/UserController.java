package com.ssafy.whiskeywiki.domain.user.controller;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.dto.UserDTO;
import com.ssafy.whiskeywiki.domain.user.function.Address;
import com.ssafy.whiskeywiki.global.auth.provider.JwtProvider;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import com.ssafy.whiskeywiki.global.util.Function;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    @GetMapping("/id/{loginId}")
    private ResponseEntity<?> checkId(@PathVariable String loginId) {

        CommonResponse<Boolean> response;
        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        if (optionalUser.isPresent()) {
            response = CommonResponse.<Boolean>builder()
                    .status(HttpStatus.OK.value())
                    .message("id not exist")
                    .data(true)
                    .build();
        } else {
            response = CommonResponse.<Boolean>builder()
                    .status(HttpStatus.OK.value())
                    .message("id exist")
                    .data(false)
                    .build();
        }
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/nickname/{nickname}")
    private ResponseEntity<?> nickname(@PathVariable String nickname) {

        CommonResponse<Boolean> response;
        Optional<User> optionalUser = userRepository.findByNickname(nickname);
        if (optionalUser.isPresent()) {
            response = CommonResponse.<Boolean>builder()
                    .status(HttpStatus.OK.value())
                    .message("not exist nickname")
                    .data(true)
                    .build();
        } else {
            response = CommonResponse.<Boolean>builder()
                    .status(HttpStatus.OK.value())
                    .message("exist nickname")
                    .data(false)
                    .build();
        }
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/register")
    private ResponseEntity<String> register(@RequestBody UserDTO.RegisterRequest request) {

        Optional<User> optionalUser1 = userRepository.findByLoginId(request.getLoginId());
        if (optionalUser1.isPresent()) return ResponseEntity.ok().body("already exist account");

        Optional<User> optionalUser2 = userRepository.findByNickname(request.getNickname());
        if (optionalUser2.isPresent()) return ResponseEntity.ok().body("already exist account");

        String[] answer = Address.getKakaoApiFromAddress(request.getAddress());
        User user = User.builder()
                .loginId(request.getLoginId())
                .password(request.getPassword())
                .nickname(request.getNickname())
                .address(request.getAddress())
                .gender(request.getGender())
                .age(request.getAge())
                .longitude(new BigDecimal(answer[0]))
                .latitude(new BigDecimal(answer[1]))
                .region(answer[2])
                .city(answer[3])
                .village(answer[4])
                .build();

        log.info("user(= {})", user);
        User saved = userRepository.save(user);

        if (saved != null) {
            return ResponseEntity.ok().body("success");
        } else {
            return ResponseEntity.ok().body("fail");
        }
    }

    @GetMapping("/info")
    public ResponseEntity<CommonResponse<UserDTO.FindResponse>> find(@RequestHeader(name = "authorization") String authToken) {

        String loginId = Function.authTokenToUserId(authToken);

        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        if (optionalUser.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        User user = optionalUser.get();

        UserDTO.FindResponse response = UserDTO.FindResponse.builder()
                .loginId(user.getLoginId())
                .nickname(user.getNickname())
                .age(user.getAge())
                .gender(user.getGender())
                .address(user.getAddress())
                .build();

        return ResponseEntity.ok().body(CommonResponse.<UserDTO.FindResponse>builder()
                                                                            .status(200)
                                                                            .message("find success")
                                                                            .data(response)
                                                                            .build());
    }

    @DeleteMapping("/edit/delete")
    public ResponseEntity<?> delete(@RequestHeader(name = "authorization") String authToken) {
        String accessToken = authToken.substring(7);
        log.info("access token(= {})", accessToken);
        Claims claims = jwtProvider.getClaims(accessToken);
        log.info("claims (={})", claims.getExpiration());
        log.info("current time (={})", System.currentTimeMillis());
        if (claims.getExpiration().after(new Date())) {
            String loginId = claims.getSubject();
            log.info("login id (={})", loginId);
            userRepository.findByLoginId(loginId).ifPresent(
                    userRepository::delete);
            return ResponseEntity.ok().body("delete success");
        } else {
            return ResponseEntity.ok().body("delete fail");
        }
    }

    @PostMapping("/modify/password/{password}")
    public ResponseEntity<?> modifyPassword(@PathVariable String password, @RequestHeader(name = "authorization") String authToken) {

        String accessToken = authToAccess(authToken);
        Claims claims = jwtProvider.getClaims(accessToken);
        if (claims.getExpiration().after(new Date())) {

            String loginId = claims.getSubject();
            Optional<User> optionalUser = userRepository.findByLoginId(loginId);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.updatePassword(password);

                userRepository.save(user);

                return ResponseEntity.ok().body("success");
            }
        }

        return ResponseEntity.ok().body("fail");
    }

    @PostMapping("/modify/nickname/{nickname}")
    public ResponseEntity<?> modifyNickname(@PathVariable String nickname, @RequestHeader(name = "authorization") String authToken) {

        String accessToken = authToAccess(authToken);
        Claims claims = jwtProvider.getClaims(accessToken);
        if (claims.getExpiration().after(new Date())) {

            String loginId = claims.getSubject();
            Optional<User> optionalUser = userRepository.findByLoginId(loginId);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.updateNickname(nickname);

                userRepository.save(user);

                return ResponseEntity.ok().body("success");
            }
        }

        return ResponseEntity.ok().body("fail");
    }

    @PostMapping("/modify/address/{address}")
    public ResponseEntity<?> modifyAddress(@PathVariable String address, @RequestHeader(name = "authorization") String authToken) {

        String accessToken = authToAccess(authToken);
        Claims claims = jwtProvider.getClaims(accessToken);
        if (claims.getExpiration().after(new Date())) {

            String loginId = claims.getSubject();
            Optional<User> optionalUser = userRepository.findByLoginId(loginId);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.updateAddress(address);

                userRepository.save(user);

                return ResponseEntity.ok().body("success");
            }
        }

        return ResponseEntity.ok().body("fail");
    }

    private static String authToAccess(String authToken) {
        return authToken.substring(7);
    }
}
