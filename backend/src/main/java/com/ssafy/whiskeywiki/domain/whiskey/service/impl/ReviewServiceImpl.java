package com.ssafy.whiskeywiki.domain.whiskey.service.impl;


import com.ssafy.whiskeywiki.domain.mybar.domain.OwnWhiskey;
import com.ssafy.whiskeywiki.domain.mybar.repository.OwnWhiskeyRepository;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Review;
import com.ssafy.whiskeywiki.domain.whiskey.domain.StarRating;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import com.ssafy.whiskeywiki.domain.whiskey.dto.ReviewDTO;
import com.ssafy.whiskeywiki.domain.whiskey.dto.WhiskeyDTO;
import com.ssafy.whiskeywiki.domain.whiskey.repository.ReviewRepository;
import com.ssafy.whiskeywiki.domain.whiskey.repository.WhiskeyRepository;
import com.ssafy.whiskeywiki.domain.whiskey.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final WhiskeyRepository whiskeyRepository;
    private final UserRepository userRepository;
    private final OwnWhiskeyRepository ownWhiskeyRepository;
    @Override
    public ReviewDTO.ReviewResponseData reviewList(int whiskeyId) {
        Optional<Whiskey> whiskey = whiskeyRepository.findById(whiskeyId);
        ReviewDTO.ReviewResponseData reviewResponseData = new ReviewDTO.ReviewResponseData();

        List<Review> reviewList = reviewRepository.findReviewByWhiskey(whiskeyRepository.getById(whiskeyId));
        double starRatingAvg = 0.0;
        for(Review r : reviewList){
            starRatingAvg += r.getReviewRating().getValue();
        }
        starRatingAvg = starRatingAvg / reviewList.size();
        starRatingAvg = Math.round(starRatingAvg*10)/10;

        reviewResponseData.setStarRatingAvg(starRatingAvg);

        List<ReviewDTO.ReviewData> reviewDataList = new ArrayList<>();

        if(whiskey.isPresent()){
                List<Review> reviews = reviewRepository.findReviewByWhiskey(whiskey.get());
                if(!reviews.isEmpty()){
                    for(Review r : reviews){
                        ReviewDTO.ReviewData reviewData = new ReviewDTO.ReviewData();

                        reviewData.setNickname(r.getUser().getNickname());
                        reviewData.setStarRating(r.getReviewRating().getValue());
                        reviewData.setAge(r.getUser().getAge());
                        reviewData.setGender(r.getUser().getGender());
                        reviewData.setContent(r.getContent());
                        reviewData.setCreatedDate(r.getCreatedDate());

                        reviewDataList.add(reviewData);
                }
            }
        }

        reviewResponseData.setReviewDataList(reviewDataList);

        return reviewResponseData;
    }

    @Override
    public void addReview(ReviewDTO.ReviewRequest reviewRequest, int userId) {
        Optional<User> reviewer = userRepository.findById(userId);
        Optional<Whiskey> whiskey = whiskeyRepository.findById(reviewRequest.getWhiskeyId());
        LocalDateTime nowDate = LocalDateTime.now();

        if(reviewer.isPresent()){
            if(whiskey.isPresent()){
                Review review = Review.builder()
                        .user(reviewer.get())
                        .whiskey(whiskey.get())
                        .reviewRating(StarRating.values()[reviewRequest.getStarRating()])
                        .content(reviewRequest.getContent())
                        .build();
                reviewRepository.save(review);
            }
        }
    }

    //위스키중의 리뷰중 별점 4점 이상인 리뷰 반환해주는 메소드
    @Override
    public List<Review> getOverRatingFour(int whiskeyId) {
        List<Review> resultList = new ArrayList<>();

        Optional<Whiskey> whiskey = whiskeyRepository.findById(whiskeyId);

        if(whiskey.isPresent()){
            List<Review> reviewList = reviewRepository.findReviewByWhiskey(whiskey.get());

            for(Review r : reviewList){
                if(r.getReviewRating().getValue() >= 4)
                    resultList.add(r);
            }
        }

        return resultList;
    }
}
