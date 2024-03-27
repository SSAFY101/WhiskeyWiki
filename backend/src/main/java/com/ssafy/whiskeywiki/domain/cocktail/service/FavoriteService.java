package com.ssafy.whiskeywiki.domain.cocktail.service;

import com.ssafy.whiskeywiki.domain.user.domain.User;

public interface FavoriteService {
    //즐겨찾기 등록
    void addFavorite(int userId, int cocktailId);
    //즐겨찾기 해제
    void deleteFavorite(int userId, int cocktailId);
}
