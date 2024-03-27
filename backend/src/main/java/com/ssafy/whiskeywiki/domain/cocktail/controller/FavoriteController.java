package com.ssafy.whiskeywiki.domain.cocktail.controller;

import com.oracle.svm.core.annotate.Delete;
import com.ssafy.whiskeywiki.domain.cocktail.dto.FavoriteDTO;
import com.ssafy.whiskeywiki.domain.cocktail.service.FavoriteService;
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

    //칵테일 즐겨찾기 등록
    //추후 jwt 토큰 이용시, 헤더에서 userId 꺼내올 예정. 지금은 userId를 파라미터로 받자.
    @PostMapping("/register/{cocktailId}")
    public ResponseEntity<CommonResponse> addFavorite(int userId, @PathVariable(name = "cocktailId") int cocktailId){
//        int userId = //헤더의 AccessToken에서 userId 찾기
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
    public ResponseEntity<CommonResponse> deleteFavorite(int userId, @PathVariable(name = "cocktailId") int cocktailId){
//      int userId = //헤더의 AccessToken에서 userId 찾기
        favoriteService.deleteFavorite(userId, cocktailId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("칵테일 즐겨찾기 해제")
                .data(FavoriteDTO.deleteResponse.builder().isFavorited(false).build())
                .build(), HttpStatus.OK);
    }

}
