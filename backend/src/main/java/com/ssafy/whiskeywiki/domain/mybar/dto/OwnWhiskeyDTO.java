package com.ssafy.whiskeywiki.domain.mybar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class OwnWhiskeyDTO {

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class WhiskeyStatus{
        private int whiskeyId;
        private String whiskeyNameKr;
        private Boolean isEmpty;
    }
}
