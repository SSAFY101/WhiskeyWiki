package com.ssafy.whiskeywiki.domain.whiskey.dto;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Base;
import com.ssafy.whiskeywiki.domain.cocktail.domain.Ingredient;
import com.ssafy.whiskeywiki.domain.cocktail.dto.BaseDTO;
import com.ssafy.whiskeywiki.domain.cocktail.dto.IngredientDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class WhiskeyDTO {
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class WhiskeySimpleInfo{
        private String whiskeyNameKr;
        private String whiskeyNameEn;
        private String whiskeyFlavor;
        private double abv;
        private int price;
    }

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class WhiskeyDetailInfo{
        private String whiskeyNameKr;
        private String whiskeyNameEn;
        private String detail;
        private String whiskeyFlavor;
        private double abv;
        private int price;
    }
}
