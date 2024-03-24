package com.ssafy.whiskeywiki.global.util;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.UUID;

@Builder
@Getter
public class CommonResponse {
    @Builder.Default
    private String id = UUID.randomUUID().toString();
    @Builder.Default
    private Date dateTime = new Date();
    private int status;
    private String message;
    private Object data;
}

