package com.ssafy.whiskeywiki.domain.cocktail.dto;

import lombok.*;

public class FavoriteDTO {
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class FavoriteData{
        private int favoriteId;
        private String cocktailName;
        private String reciepe;
        private String detail;
    }

    //즐겨찾기 응답 확인
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class addResponse {
        private Boolean isFavorited;
    }

    //즐겨찾기 삭제 확인
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class deleteResponse {
        private Boolean isFavorited;
    }
}
