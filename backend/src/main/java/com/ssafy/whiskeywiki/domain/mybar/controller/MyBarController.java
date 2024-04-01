package com.ssafy.whiskeywiki.domain.mybar.controller;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Favorite;
import com.ssafy.whiskeywiki.domain.cocktail.dto.FavoriteDTO;
import com.ssafy.whiskeywiki.domain.cocktail.service.FavoriteService;
import com.ssafy.whiskeywiki.domain.map.dto.MapDTO;
import com.ssafy.whiskeywiki.domain.mybar.dto.MyBarDTO;
import com.ssafy.whiskeywiki.domain.mybar.dto.OwnWhiskeyDTO;
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
    private final MyBarService myBarService;
    private final UserService userService;

    //즐겨찾기한 칵테일 목록 확인
    @GetMapping("/favorite/list")
    public ResponseEntity<CommonResponse> getFavoriteList(@RequestHeader(name = "Authorization") String authToken) {
        int userId = userService.getUserIdByAccessToken(authToken.substring(7));
        List<FavoriteDTO.FavoriteData> favoriteDataList = myBarService.userFavoriteList(userId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("즐겨찾기한 칵테일 목록 조회 성공")
                .data(favoriteDataList)
                .build(), HttpStatus.OK);

    }

    @GetMapping("/list")
    public ResponseEntity<CommonResponse> getOwnWhiskeyList(@RequestHeader(name = "Authorization")String authToken){
        int userId = userService.getUserIdByAccessToken(authToken.substring(7));

        List<OwnWhiskeyDTO.WhiskeyStatus> resultList = myBarService.userOwnWhiskeyList(userId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("위스키 상태 리스트 조회 성공")
                .data(resultList)
                .build(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CommonResponse> lookAnotherMyBar(@PathVariable(name = "userId") int userId){
        List<MapDTO.OwnWhiskeyStatus> resultList = myBarService.lookAnotherMyBar(userId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("다른 유저 My bar 조회 성공")
                .data(resultList)
                .build(), HttpStatus.OK);
    }

    //위스키 상태 관리
    @PostMapping("/status/{whiskeyId}")
    public ResponseEntity<CommonResponse> changeWhiskeyStatus(@RequestHeader(name = "Authorization") String authToken ,@PathVariable(name = "whiskeyId") int whiskeyId){
        int userId = userService.getUserIdByAccessToken(authToken.substring(7));
        myBarService.changeWhiskeyStatus(userId, whiskeyId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("위스키 상태 변경 성공")
                .build(), HttpStatus.OK);

    }
}
