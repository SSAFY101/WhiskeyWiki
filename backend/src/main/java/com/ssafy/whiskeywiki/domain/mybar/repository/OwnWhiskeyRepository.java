package com.ssafy.whiskeywiki.domain.mybar.repository;

import com.ssafy.whiskeywiki.domain.mybar.domain.OwnWhiskey;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OwnWhiskeyRepository extends JpaRepository<OwnWhiskey, Integer> {
    List<OwnWhiskey> findOwnWhiskeyListByWhiskey(Whiskey whiskey);

    OwnWhiskey findByWhiskey(Whiskey whiskey);
    List<OwnWhiskey> findByUser(User user);
}
