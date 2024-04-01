package com.ssafy.whiskeywiki.domain.whiskey.service;


import com.ssafy.whiskeywiki.domain.cocktail.dto.CocktailDTO;
import com.ssafy.whiskeywiki.domain.whiskey.dto.SearchDTO;
import com.ssafy.whiskeywiki.domain.whiskey.dto.WhiskeyDTO;

import java.util.List;

public interface WhiskeyService {
    //위스키 목록 가져오기
    List<WhiskeyDTO.WhiskeySimpleInfo> allWhiskeyList();

    //위스키 이름 검색해서 해당 이름을 포함하는 리스트로 가져오기
    List<WhiskeyDTO.WhiskeySimpleInfo> findWhiskeyNameList(String whiskeyName);

    //위스키 조건 검색
    List<WhiskeyDTO.WhiskeySimpleInfo> whiskeyListCondition(SearchDTO.SearchCondition searchCondition);

    //위스키id로 상세 정보 가져오기
    WhiskeyDTO.WhiskeyDetailInfo whiskeyDetailInfo(int whiskeyId);

    //위스키 선호도 통계 가져오기//
    WhiskeyDTO.WhiskeyStaticsData whiskeyStaticsData(int whiskeyId);

    //위스키id로 만들 수 있는 칵테일 추천해주기
    List<CocktailDTO.CocktailInfo> recommendCocktail(int whiskeyId);

    //전체 위스키 목록의 이름을 반환
    List<WhiskeyDTO.WhiskeyNameData> getAllWhikseyName();
}
