package com.ssafy.whiskeywiki.global.config;

import com.ssafy.whiskeywiki.domain.user.filter.ApiFilter;
import com.ssafy.whiskeywiki.domain.user.provider.JwtProvider;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Bean
    FilterRegistrationBean<ApiFilter> apiFilter() {
        FilterRegistrationBean<ApiFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ApiFilter(jwtProvider, userRepository));
        registrationBean.addUrlPatterns("/user/token");

        registrationBean.setOrder(1);

        return registrationBean;
    }
}
