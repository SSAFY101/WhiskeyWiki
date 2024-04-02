package com.ssafy.whiskeywiki.domain.whiskey.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class SearchDTO {
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class SearchCondition{
        private String flavor;
        private int abv;
        private int price;
    }
}
