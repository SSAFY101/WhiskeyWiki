package com.ssafy.whiskeywiki.domain.cocktail.repository;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Base;
import com.ssafy.whiskeywiki.domain.cocktail.domain.Cocktail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface CocktailRepository extends JpaRepository<Cocktail, Integer> {
}