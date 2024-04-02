package com.ssafy.whiskeywiki.domain.mybar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class MyBarDTO {

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class AnotherUserMyBarDTO {
        private int whiskeyId;
        private String whiskeyNameKr;
        private String whiskeyNameEn;
        private Boolean isEmpty;
    }

}
