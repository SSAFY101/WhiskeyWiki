package com.ssafy.whiskeywiki.domain.cocktail.controller;

import com.ssafy.whiskeywiki.domain.cocktail.dto.FavoriteDTO;
import com.ssafy.whiskeywiki.domain.cocktail.service.FavoriteService;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cocktail/favorite")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final UserService userService;

    @PostMapping("/register/{cocktailId}")
    public ResponseEntity<CommonResponse> addFavorite(@RequestHeader(name = "Authorization") String accessToken, @PathVariable(name = "cocktailId") int cocktailId){
        int userId = userService.getUserIdByAccessToken(accessToken);

        favoriteService.addFavorite(userId, cocktailId);

        //userId에 해당하는 favoriteList를 가져와야함

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("칵테일 즐겨찾기 성공")
                .data(FavoriteDTO.addResponse.builder().isFavorited(true).build())
                .build(), HttpStatus.OK);
    }

    //칵테일 즐겨찾기 해제
    @DeleteMapping("/delete/{cocktailId}")
    public ResponseEntity<CommonResponse> deleteFavorite(@RequestHeader(name = "Authorization") String accessToken, @PathVariable(name = "cocktailId") int cocktailId){

        int userId = userService.getUserIdByAccessToken(accessToken);
        favoriteService.deleteFavorite(userId, cocktailId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("칵테일 즐겨찾기 해제")
                .data(FavoriteDTO.deleteResponse.builder().isFavorited(false).build())
                .build(), HttpStatus.OK);
    }

}
