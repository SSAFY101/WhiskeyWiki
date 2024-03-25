package com.ssafy.whiskeywiki.domain.user.filter;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.provider.JwtProvider;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

//@Component
@RequiredArgsConstructor
//@WebFilter(urlPatterns = {"/user/token"})
public class ApiFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("api filter init ....");
        String accessToken = request.getHeader("Access-Token");
        System.out.println(request.getHeader("Allow"));;
        try {
            Claims claims = jwtProvider.getClaims(accessToken);
            String loginId = claims.getSubject();
            System.out.println("id : " + loginId);
            System.out.println("date : " + claims.getExpiration());

            Optional<User> optionalUser = userRepository.findByLoginId(loginId);
            if (optionalUser.isPresent()) {
                System.out.println("user is present ....");

            } else {
                throw new Exception();
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            // 응답 본문에 에러 메시지를 JSON 형태로 설정
            response.getWriter().write("{\"error\": \"Unauthorized access\"}");
            // 여기서 return을 하면, 요청 처리가 중단되고 클라이언트에게 응답이 전송됨

            return;
        }
        filterChain.doFilter(request, response);
    }
}
