package com.ssafy.whiskeywiki.domain.cocktail.controller;

import com.ssafy.whiskeywiki.domain.cocktail.dto.CocktailDTO;
import com.ssafy.whiskeywiki.domain.cocktail.service.CocktailService;
import com.ssafy.whiskeywiki.global.util.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cocktail")
public class CocktailController {

    private final CocktailService cocktailService;
    @GetMapping("/recommend/{whiskeyId}")
    public ResponseEntity<CommonResponse> cocktailList(@PathVariable(name = "whiskeyId") int whiskeyId){
        List<CocktailDTO.CocktailInfo> result = cocktailService.recommendCocktail(whiskeyId);

        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("칵테일 추천 조회 성공")
                .data(result)
                .build(), HttpStatus.OK);
    }
}
