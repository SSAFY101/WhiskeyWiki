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
        private int whiskeyId;
        private String whiskeyNameKr;
        private String whiskeyNameEn;
        private String whiskeyFlavor;
        private double abv;
        private int price;
        private double starRating;
        private double starOriginRating;
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

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class WhiskeyNameData{
        private String whiskeyNameKr;
        private String whiskeyNameEn;
    }

}
