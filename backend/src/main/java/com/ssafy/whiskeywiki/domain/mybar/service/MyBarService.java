package com.ssafy.whiskeywiki.domain.mybar.service;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Favorite;
import com.ssafy.whiskeywiki.domain.cocktail.dto.FavoriteDTO;
import com.ssafy.whiskeywiki.domain.map.dto.MapDTO;
import com.ssafy.whiskeywiki.domain.mybar.domain.OwnWhiskey;
import com.ssafy.whiskeywiki.domain.mybar.dto.MyBarDTO;
import com.ssafy.whiskeywiki.domain.mybar.dto.OwnWhiskeyDTO;
import com.ssafy.whiskeywiki.domain.user.domain.User;

import java.util.List;

public interface MyBarService {
    //해당 유저 id로 즐겨찾기한 리스트 가져오기
    List<FavoriteDTO.FavoriteData> userFavoriteList(int userId);

    List<OwnWhiskeyDTO.WhiskeyStatus> userOwnWhiskeyList(int userId);

    void changeWhiskeyStatus(int userId, int whiskeyId);

    List<MyBarDTO.AnotherUserMyBarDTO> lookAnotherMyBar(int userId);
}
