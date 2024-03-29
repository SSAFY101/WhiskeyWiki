package com.ssafy.whiskeywiki.domain.cocktail.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class BaseDTO {
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class BaseData{
        private int whiskeyId;
    }
}
