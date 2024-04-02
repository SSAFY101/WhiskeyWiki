package com.ssafy.whiskeywiki.domain.cocktail.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class CocktailDTO {
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class CocktailInfo{
        private String cocktailName;
        private String cocktailNameEn;
        private String recipe;
        private String detail;
        private List<String> whiskeyList;
        private List<String> ingredients;
    }

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class rememberRecommended{
        private List<String> recommendedList;
    }
}
