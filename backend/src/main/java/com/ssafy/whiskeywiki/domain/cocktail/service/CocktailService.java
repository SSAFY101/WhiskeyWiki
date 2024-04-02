package com.ssafy.whiskeywiki.domain.cocktail.service;

import com.ssafy.whiskeywiki.domain.cocktail.dto.CocktailDTO;

import java.util.List;

public interface CocktailService {
    List<CocktailDTO.CocktailInfo> recommendCocktail(int whiskeyId);
}
