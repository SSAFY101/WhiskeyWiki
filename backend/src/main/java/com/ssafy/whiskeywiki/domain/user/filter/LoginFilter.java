package com.ssafy.whiskeywiki.domain.user.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@RequiredArgsConstructor
public class LoginFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        System.out.println("filter init ...");

        String accessToken = request.getHeader("Access-Token");
        String refreshToken = "";
        System.out.println("access token " + accessToken);

        Cookie[] cookies = request.getCookies(); // 쿠키 배열 가져오기

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                // 특정 쿠키 이름을 찾기
                if ("RefreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue(); // 쿠키 값 가져오기
                    System.out.println("Cookie Value: " + refreshToken);
                    // 쿠키 값을 이용한 로직 처리
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
