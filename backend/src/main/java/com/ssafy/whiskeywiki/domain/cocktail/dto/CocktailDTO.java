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
        private String name;
        private String flavor;
        private List<BaseDTO.BaseData> whiskeyList;
        private List<IngredientDTO.IngredientName> ingredients;
    }
}