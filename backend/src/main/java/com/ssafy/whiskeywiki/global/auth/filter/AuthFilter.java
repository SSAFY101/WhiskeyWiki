package com.ssafy.whiskeywiki.global.auth.filter;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.global.auth.provider.JwtProvider;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class AuthFilter extends OncePerRequestFilter {

    public final JwtProvider jwtProvider;
    public final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // checking white label
        String[] noFilterLabel = new String[] {"/api/auth", };    // Filter를 접근하지 않는 URLMapping
        for (String url: noFilterLabel) {
            if (request.getRequestURI().startsWith(url)) {
                log.info("white label ...");
                filterChain.doFilter(request, response);
                return;
            }
        }

        log.info("api filter init ....");
        String accessToken = request.getHeader("Access-Token");
        try {
            Claims claims = jwtProvider.getClaims(accessToken);

            // 만료 시간 확인
            Date expiration = claims.getExpiration();
            if (expiration.before(new Date())) {
                throw new Exception();
            }

            // 유요한 토큰인지 확인
            String loginId = claims.getSubject();
            Optional<User> optionalUser = userRepository.findByLoginId(loginId);
            if (optionalUser.isEmpty()) {
                log.info("user is not present ....");
                throw new Exception();
            }
        } catch (Exception e) {

            // throw unauthorized exception
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"error\": \"Unauthorized access\"}");
            return;
        }

        filterChain.doFilter(request, response);

        /**
         * Cookie[] cookies = request.getCookies(); // 쿠키 배열 가져오기
         *
         *         if (cookies != null) {
         *             for (Cookie cookie : cookies) {
         *                 // 특정 쿠키 이름을 찾기
         *                 if ("RefreshToken".equals(cookie.getName())) {
         *                     refreshToken = cookie.getValue(); // 쿠키 값 가져오기
         *                     System.out.println("Cookie Value: " + refreshToken);
         *                     // 쿠키 값을 이용한 로직 처리
         *                 }
         *             }
         *         }
         */
    }
}
