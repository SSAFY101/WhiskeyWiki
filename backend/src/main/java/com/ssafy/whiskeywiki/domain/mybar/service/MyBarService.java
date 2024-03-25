package com.ssafy.whiskeywiki.domain.mybar.service;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Favorite;
import com.ssafy.whiskeywiki.domain.cocktail.dto.FavoriteDTO;

import java.util.List;

public interface MyBarService {
    //해당 유저 id로 즐겨찾기한 리스트 가져오기
    List<FavoriteDTO.FavoriteData> userFavoriteList(int userId);
}
