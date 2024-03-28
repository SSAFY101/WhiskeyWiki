package com.ssafy.whiskeywiki.domain.mybar.controller;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Favorite;
import com.ssafy.whiskeywiki.domain.cocktail.dto.FavoriteDTO;
import com.ssafy.whiskeywiki.domain.cocktail.service.FavoriteService;
import com.ssafy.whiskeywiki.domain.mybar.service.MyBarService;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mybar")
@RequiredArgsConstructor
public class MyBarController {
    private final FavoriteService favoriteService;
    private final UserService userService;
    private final MyBarService myBarService;

    //즐겨찾기한 칵테일 목록 확인
    @GetMapping("/favorite/list")
    public ResponseEntity<CommonResponse> getFavoriteList(@RequestHeader(name = "Authorization") String accessToken) {
        int userId = userService.getUserIdByAccessToken(accessToken);

        List<FavoriteDTO.FavoriteData> favoriteDataList = myBarService.userFavoriteList(userId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("즐겨찾기한 칵테일 목록 조회 성공")
                .data(favoriteDataList)
                .build(), HttpStatus.OK);

    }
}
