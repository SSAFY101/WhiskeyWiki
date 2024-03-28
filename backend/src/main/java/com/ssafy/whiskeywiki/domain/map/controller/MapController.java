package com.ssafy.whiskeywiki.domain.map.controller;

import com.ssafy.whiskeywiki.domain.map.dto.MapDTO;
import com.ssafy.whiskeywiki.domain.map.service.MapService;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/map")
public class MapController {
    private final MapService mapService;
    private final UserService userService;

    @GetMapping("/location")
    public ResponseEntity<CommonResponse> getUserLocation(@RequestHeader(name = "Authorization") String accessToken){
        int userId = userService.getUserIdByAccessToken(accessToken);
        MapDTO.ResponseUserLocation userLocation = mapService.getUserLocation(userId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("유저의 My Bar 위치 조회 성공")
                .data(userLocation)
                .build(), HttpStatus.OK);
    }

    @GetMapping("/search-condition")
    public ResponseEntity<CommonResponse> searchCondition(@RequestParam List<String> condition){
        List<MapDTO.ResponseAnotherMyBar> resultList = mapService.userList(condition);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("다른 유저의 My Bar 리스트 조회 성공")
                .data(resultList)
                .build(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CommonResponse> lookAnotherMyBar(@PathVariable int userId){
        List<MapDTO.OwnWhiskeyStatus> resultList = mapService.lookAnotherMyBar(userId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("다른 유저 My bar 조회 성공")
                .data(resultList)
                .build(), HttpStatus.OK);
    }
}
