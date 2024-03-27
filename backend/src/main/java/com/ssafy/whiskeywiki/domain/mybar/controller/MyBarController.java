package com.ssafy.whiskeywiki.domain.mybar.controller;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Favorite;
import com.ssafy.whiskeywiki.domain.cocktail.dto.FavoriteDTO;
import com.ssafy.whiskeywiki.domain.cocktail.service.FavoriteService;
import com.ssafy.whiskeywiki.domain.mybar.service.MyBarService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mybar")
@RequiredArgsConstructor
public class MyBarController {
    private FavoriteService favoriteService;
    private MyBarService myBarService;

    //즐겨찾기한 칵테일 목록 확인
    @GetMapping("/favorite/list")
    public ResponseEntity<CommonResponse> getFavoriteList(int userId) {
        List<FavoriteDTO.FavoriteData> favoriteDataList = myBarService.userFavoriteList(userId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("즐겨찾기한 칵테일 목록 조회 성공")
                .data(favoriteDataList)
                .build(), HttpStatus.OK);

    }
}
