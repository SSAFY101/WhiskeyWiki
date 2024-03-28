package com.ssafy.whiskeywiki.domain.whiskey.repository;

import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import com.ssafy.whiskeywiki.domain.whiskey.dto.WhiskeyDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WhiskeyRepository extends JpaRepository<Whiskey, Integer> {

    //입력받은 문자를 포함하는 위스키 이름을 가진 위스키의 정보 출력
    List<Whiskey> findByWhiskeyNameKrContaining(String whiskeyNameKr);

    List<Whiskey> findByWhiskeyNameEnContaining(String whiskeyNameEn);

    Whiskey findByWhiskeyNameKr(String whiskeyNameKr);
}
