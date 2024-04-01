package com.ssafy.whiskeywiki.domain.map.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

public class MapDTO {
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class RequestSearchList{
        private List<String> checkedWhiskeyList;
    }

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class ResponseAnotherMyBar{
        private int userId;
        private String nickname;
        private BigDecimal latitude;
        private BigDecimal longitude;
    }

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class ResponseUserLocation{
        private BigDecimal latitude;
        private BigDecimal longitude;
    }

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class OwnWhiskeyStatus{
        private int whiskeyId;
        private Boolean isEmpty;
    }
}
