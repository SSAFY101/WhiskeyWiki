package com.ssafy.whiskeywiki.global.util;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.UUID;

@Builder
@Getter
public class CommonResponse<T> {
    @Builder.Default
    private String id = UUID.randomUUID().toString();
    @Builder.Default
    private Date dateTime = new Date();
    private int status;
    private String message;
    private T data;
}
