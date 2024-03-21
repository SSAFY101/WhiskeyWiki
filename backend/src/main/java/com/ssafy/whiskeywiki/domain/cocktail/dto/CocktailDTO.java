package com.ssafy.whiskeywiki.domain.cocktail.dto;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Cocktail;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CocktailDTO {
    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FavoriteData{
        private String cocktailName;
        private String reciepe;
        private String detail;
    }
}
