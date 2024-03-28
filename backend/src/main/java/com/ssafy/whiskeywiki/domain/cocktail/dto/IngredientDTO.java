package com.ssafy.whiskeywiki.domain.cocktail.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class IngredientDTO {
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class IngredientName {
        private int name;
    }
}
