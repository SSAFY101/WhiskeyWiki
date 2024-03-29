package com.ssafy.whiskeywiki.domain.whiskey.controller;


import com.ssafy.whiskeywiki.domain.cocktail.dto.FavoriteDTO;
import com.ssafy.whiskeywiki.domain.whiskey.dto.WhiskeyDTO;
import com.ssafy.whiskeywiki.domain.whiskey.service.WhiskeyService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/whiskey")
public class WhiskeyController {

    private final WhiskeyService whiskeyService;

    //위스키 목록
    @GetMapping("/list")
    public ResponseEntity<CommonResponse> allWhiskeyList(){
        List<WhiskeyDTO.WhiskeySimpleInfo> whiskeyList = whiskeyService.allWhiskeyList();

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("위스키 목록 조회 성공!")
                .data(whiskeyList)
                .build(), HttpStatus.OK);
    }

    //위스키 이름 검색
    @GetMapping("/search-name")
    public ResponseEntity<CommonResponse> searchNameList(String name){
        List<WhiskeyDTO.WhiskeySimpleInfo> whiskeyList = whiskeyService.findWhiskeyNameList(name);
        if(whiskeyList != null){
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("위스키 목록 조회 성공!")
                    .data(whiskeyList)
                    .build(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.NO_CONTENT.value())
                    .message("위스키 목록 조회 실패!")
                    .data(whiskeyList)
                    .build(), HttpStatus.NO_CONTENT);
        }
    }

    //위스키 조건 검색
//    @GetMapping("/search-condition")

    //위스키 상세 정보
    @GetMapping("/info/{whiskeyId}")
    public ResponseEntity<CommonResponse> whiskeyDetailInfo(@PathVariable(name = "whiskeyId") int whiskeyId){
        WhiskeyDTO.WhiskeyDetailInfo result = whiskeyService.whiskeyDetailInfo(whiskeyId);
        if(result != null){
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("위스키 상세정보 조회 성공!")
                    .data(result)
                    .build(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.NO_CONTENT.value())
                    .message("위스키 상세정보 조회 실패")
                    .data(result)
                    .build(), HttpStatus.NO_CONTENT);
        }
    }

    //위스키 선호도 통계 가져오기
//    @GetMapping("/statistic/{whiskeyId}")

    //위스키 전체 목록 이름 조회
    @GetMapping("/list/name")
    public ResponseEntity<CommonResponse> getAllWhikseyName(){
        List<WhiskeyDTO.WhiskeyNameData> reusltList = whiskeyService.getAllWhikseyName();

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("위스키 이름 목록 조회 성공")
                .data(reusltList)
                .build(), HttpStatus.OK);
    }

}
