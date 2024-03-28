package com.ssafy.whiskeywiki.domain.cocktail.repository;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Cocktail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CocktailRepository extends JpaRepository<Cocktail, Integer> {
}