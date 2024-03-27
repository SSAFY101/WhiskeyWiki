package com.ssafy.whiskeywiki.domain.whiskey.service;

import com.ssafy.whiskeywiki.domain.whiskey.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {
    //위스키 id로 등록된 리뷰 리스트 가져오기
    List<ReviewDTO.ReviewData> reviewList(int whiskeyId);

    //리뷰작성
    void addReview(ReviewDTO.ReviewRequest reviewRequest, int userId);
}
