package com.ssafy.whiskeywiki.domain.cocktail.repository;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Base;
import com.ssafy.whiskeywiki.domain.cocktail.domain.Cocktail;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BaseRepository extends JpaRepository<Base, Integer> {
    List<Base> findBaseByWhiskey(Whiskey whiskey);

    List<Base> findBaseByCocktail(Cocktail cocktail);
}
