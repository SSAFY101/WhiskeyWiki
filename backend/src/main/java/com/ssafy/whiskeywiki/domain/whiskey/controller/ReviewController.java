package com.ssafy.whiskeywiki.domain.whiskey.controller;

import com.ssafy.whiskeywiki.domain.user.service.UserService;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Review;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import com.ssafy.whiskeywiki.domain.whiskey.dto.ReviewDTO;
import com.ssafy.whiskeywiki.domain.whiskey.service.ReviewService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/whiskey/review")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;

    //위스키 id로 해당 위스키에 대한 리뷰 리스트 가져오기
    @GetMapping("/{whiskeyId}")
    public ResponseEntity<CommonResponse> reviewList(@PathVariable(name = "whiskeyId") int whiskeyId){
        ReviewDTO.ReviewResponseData reviewResponseData = reviewService.reviewList(whiskeyId);
        if(reviewResponseData != null){
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("위스키 리뷰 리스트 조회 성공")
                    .data(reviewResponseData)
                    .build(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.NO_CONTENT.value())
                    .message("해당 위스키에 대한 리뷰가 없습니다")
                    .data(reviewResponseData)
                    .build(), HttpStatus.NO_CONTENT);
        }
    }


    //위스키 리뷰 작성
    @PostMapping("/register")
    public ResponseEntity<CommonResponse> addReview(@RequestHeader(name = "Authorization") String authToken ,@RequestBody ReviewDTO.ReviewRequest reviewRequest){
        int userId = userService.getUserIdByAccessToken(authToken.substring(7));

        reviewService.addReview(reviewRequest, userId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("리뷰 등록 성공")
                .data(reviewRequest)
                .build(), HttpStatus.CREATED);
    }

}
