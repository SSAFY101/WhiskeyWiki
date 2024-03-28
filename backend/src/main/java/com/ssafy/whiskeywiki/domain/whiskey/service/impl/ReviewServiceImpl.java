package com.ssafy.whiskeywiki.domain.whiskey.service.impl;


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
    @Override
    public List<ReviewDTO.ReviewData> reviewList(int whiskeyId) {
        Optional<Whiskey> whiskey = whiskeyRepository.findById(whiskeyId);
        List<ReviewDTO.ReviewData> resultList = new ArrayList<>();

        if(whiskey.isPresent()){
                List<Review> reviewDataList = reviewRepository.findByWhiskey(whiskey.get());
                if(!reviewDataList.isEmpty()){
                    for(Review r : reviewDataList){
                        ReviewDTO.ReviewData reviewData = new ReviewDTO.ReviewData();

                        reviewData.setNickname(r.getUser().getNickname());
                        reviewData.setReviewRating(r.getReviewRating().getValue());
                        reviewData.setAge(r.getUser().getAge());
                        reviewData.setGender(r.getUser().getGender());
                        reviewData.setContent(r.getContent());
                        reviewData.setCreatedDate(r.getCreatedDate());

                        resultList.add(reviewData);
                }
            }
        }
        return resultList;
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
                        .reviewRating(StarRating.values()[reviewRequest.getReviewRating()])
                        .content(reviewRequest.getContent())
                        .build();
                reviewRepository.save(review);
            }
        }
    }
}
