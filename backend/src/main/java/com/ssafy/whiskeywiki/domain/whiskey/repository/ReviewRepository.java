package com.ssafy.whiskeywiki.domain.whiskey.repository;

import com.ssafy.whiskeywiki.domain.whiskey.domain.Review;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findReviewByWhiskey(Whiskey whiskey);
}
