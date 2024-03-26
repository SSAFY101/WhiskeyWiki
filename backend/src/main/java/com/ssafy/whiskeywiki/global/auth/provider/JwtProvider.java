package com.ssafy.whiskeywiki.global.auth.provider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Key;

import com.ssafy.whiskeywiki.global.auth.jwt.Jwt;

import java.util.*;

@Service
@RequiredArgsConstructor
public class JwtProvider {
    public static final byte[] secret = "JaeYoungSecretKeyJaeYoungSecretKeyJaeYoungSecretKey".getBytes();   // secret key
    private final Key key = Keys.hmacShaKeyFor(secret); // encryption secret key, HMAC-SHA algorithm
    // cf. if secret is under 32byte, throws WeakKeyException

    public String createToken(Map<String, Object> claims, String loginId, Date expireDate) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(loginId)
                .setExpiration(expireDate)
                .signWith(key)
                .compact(); // header, payload, signature encode with Base64URL
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()    // get jwt parser
                .parseClaimsJws(token)
                .getBody();
    }

    // create jwt with access token, refresh token
    public Jwt createJwt(Map<String, Object> claims, String loginId) {
        String accessToken = createToken(claims, loginId, getExpireDateForAccessToken());
        String refreshToken = createToken(claims, loginId, getExpireDateForRefreshToken());

        return Jwt.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public Date getExpireDateForAccessToken() {
        long expireTimeMills = 1000 * 60 * 60;
        return new Date(System.currentTimeMillis() + expireTimeMills);
    }

    public Date getExpireDateForRefreshToken() {
        long expireTimeMills = 1000 * 60 * 60 * 24 * 7;
        return new Date(System.currentTimeMillis() + expireTimeMills);
    }
}
