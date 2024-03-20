package com.ssafy.whiskeywiki.domain.whiskey.controller;


import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import com.ssafy.whiskeywiki.domain.whiskey.service.WhiskeyInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/whiskeyinfo")
public class WhiskeyInfoController {

    private final WhiskeyInfoService whiskeyInfoService;


}
