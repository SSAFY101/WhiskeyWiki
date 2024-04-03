package com.ssafy.whiskeywiki.domain.whiskey.controller;


import com.ssafy.whiskeywiki.domain.cocktail.dto.FavoriteDTO;
import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Review;
import com.ssafy.whiskeywiki.domain.whiskey.dto.WhiskeyDTO;
import com.ssafy.whiskeywiki.domain.whiskey.service.ReviewService;
import com.ssafy.whiskeywiki.domain.whiskey.service.WhiskeyService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/whiskey")
public class WhiskeyController {

    private final WhiskeyService whiskeyService;
    private final ReviewService reviewService;
    private final UserService userService;

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
    @GetMapping("/statistic/{whiskeyId}")
    public ResponseEntity<CommonResponse> getWhiskeyStastics(@PathVariable(name = "whiskeyId") int whiskeyId){

        List<Review> reviews = reviewService.getOverRatingFour(whiskeyId);

        WhiskeyDTO.WhiskeyStaticsData result = whiskeyService.whiskeyStaticsData(reviews);
        System.out.println(result.toString());

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("위스키 선호도 통계 조회 성공")
                .data(result)
                .build(), HttpStatus.OK);
    }


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

    @PostMapping("/info/detection")
    public ResponseEntity<CommonResponse> getDetectedWhiskeyInfo(@RequestHeader(name = "Authorization") String authToken ,@RequestBody WhiskeyDTO.DetectionWhiskeyList detectionWhiskeyList){
        int userId = userService.getUserIdByAccessToken(authToken.substring(7));
        WhiskeyDTO.DetectionWhiskeyInfoData whiskeyResList = whiskeyService.getDetectionWhikseyInfo(userId, detectionWhiskeyList);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("위스키 인식 정보 반환")
                .data(whiskeyResList)
                .build(), HttpStatus.OK);
    }

    @PostMapping("/ownwhiskey/register")
    public ResponseEntity<CommonResponse> registMybarDetectedWhiskey(@RequestHeader(name = "Authorization") String authToken ,@RequestBody WhiskeyDTO.DetectionWhiskeyList detectionWhiskeyList){
        int userId = userService.getUserIdByAccessToken(authToken.substring(7));
        whiskeyService.registMybarDetectedWhiskey(userId,detectionWhiskeyList);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("위스키 My Bar 등록 성공")
                .data("")
                .build(), HttpStatus.CREATED);
    }
}

