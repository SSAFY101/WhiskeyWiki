package com.ssafy.whiskeywiki.domain.cocktail.repository;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
}
