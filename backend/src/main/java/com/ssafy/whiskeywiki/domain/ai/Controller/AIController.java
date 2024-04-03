package com.ssafy.whiskeywiki.domain.ai.Controller;

import com.ssafy.whiskeywiki.domain.ai.Service.AIService;
import com.ssafy.whiskeywiki.domain.ai.dto.AIDTO;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping
public class AIController {

    private final AIService aiService;
    @PostMapping("/detection")
    public ResponseEntity<AIDTO.JsonResponse> whiskeyDetect(MultipartFile file) {

        return ResponseEntity.ok()
                .body(aiService.whiskeyDetection(file));
    }

    @PostMapping("/object-to-img")
    public ResponseEntity<AIDTO.JSONAndImg> noDetect(MultipartFile file) {

//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.add("Content-Type", "multipart/form-data");
//        httpHeaders.add("Content-Type", "image/jpeg");

        AIDTO.JSONAndImg response = AIDTO.JSONAndImg.builder()
                .name("whiskey")
                .img(aiService.noDetect(file).getBody())
                .build();

        return ResponseEntity.ok()
                .body(response);
    }
}
