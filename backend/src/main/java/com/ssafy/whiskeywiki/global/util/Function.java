package com.ssafy.whiskeywiki.global.util;

import com.ssafy.whiskeywiki.global.auth.provider.JwtProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Function {

    private static JwtProvider jwtProvider = new JwtProvider();

    public static String authTokenToUserId(String authToken) {

        String accessToken = authToken.substring(7);
        Claims claims = jwtProvider.getClaims(accessToken);
        log.info("claims(={})", claims);
//        log.info("cla");
        return jwtProvider.getClaims(accessToken).getSubject();
    }
}
