package com.ssafy.whiskeywiki.domain.map.service;

import com.ssafy.whiskeywiki.domain.map.dto.MapDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface MapService {
    //유저의 가입한 주소의 위도,경도 반환
    MapDTO.ResponseUserLocation getUserLocation (int userId);

    //String 리스트로 위스키 검색 조건이 들어오면, 해당 위스키를 가진 유저의 아이디,닉네임,위도,경도를 반환한다.
    List<MapDTO.ResponseAnotherMyBar> userList(List<String> condition);
}
