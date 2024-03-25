package com.ssafy.whiskeywiki.domain.mybar.repository;

import com.ssafy.whiskeywiki.domain.mybar.domain.OwnWhiskey;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OwnWhiskeyRepository extends JpaRepository<OwnWhiskey, Integer> {
    List<OwnWhiskey> findByWhiskey(Whiskey whiskey);
}
