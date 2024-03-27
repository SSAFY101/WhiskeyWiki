package com.ssafy.whiskeywiki.domain.mybar.service.impl;

import com.ssafy.whiskeywiki.domain.cocktail.dto.FavoriteDTO;
import com.ssafy.whiskeywiki.domain.cocktail.repository.CocktailRepository;
import com.ssafy.whiskeywiki.domain.cocktail.repository.FavoriteRepository;
import com.ssafy.whiskeywiki.domain.mybar.service.MyBarService;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//@Service
//@RequiredArgsConstructor
//public class MyBarServiceImpl implements MyBarService{
//    private final FavoriteRepository favoriteRepository;
//    private final UserRepository userRepository;
//    @Override
//    public List<CocktailDTO.CocktailInfo> userFavoriteList(int userId) {
//        List<CocktailDTO.CocktailInfo> cocktailInfoList =
//    }
//}
