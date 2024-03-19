package com.ssafy.whiskeywiki.domain.whiskey.controller;

import com.ssafy.whiskeywiki.domain.whiskey.service.ReviewService;
import com.ssafy.whiskeywiki.domain.whiskey.service.WhiskeyInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService reviewService;
}
