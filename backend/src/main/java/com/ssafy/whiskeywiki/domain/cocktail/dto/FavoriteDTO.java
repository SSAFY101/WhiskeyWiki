package com.ssafy.whiskeywiki.domain.cocktail.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class FavoriteDTO {
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
