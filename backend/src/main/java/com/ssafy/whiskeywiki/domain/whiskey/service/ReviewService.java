package com.ssafy.whiskeywiki.domain.whiskey.service;

import com.ssafy.whiskeywiki.domain.whiskey.domain.Review;
import com.ssafy.whiskeywiki.domain.whiskey.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {
    //위스키 id로 등록된 리뷰 리스트 가져오기
    ReviewDTO.ReviewResponseData reviewList(int whiskeyId);

    //리뷰작성
    void addReview(ReviewDTO.ReviewRequest reviewRequest, int userId);

    //별점 4점인 이상인 리뷰 반환하기
    List<Review> getOverRatingFour(int whiskeyId);
}
