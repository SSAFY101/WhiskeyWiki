package com.ssafy.whiskeywiki.domain.cocktail.repository;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Cocktail;
import com.ssafy.whiskeywiki.domain.cocktail.domain.CocktailIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CocktailIngredientRepository extends JpaRepository<CocktailIngredient, Integer> {
    List<CocktailIngredient> findCocktailIngredientsByCocktail(Cocktail cocktail);
}
