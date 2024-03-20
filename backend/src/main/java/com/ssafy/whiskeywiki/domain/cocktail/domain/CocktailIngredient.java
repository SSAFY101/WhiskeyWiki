package com.ssafy.whiskeywiki.domain.cocktail.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

//중간 테이블
@Builder(toBuilder = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CocktailIngredient {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cocktail_ingredient_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingrdient_id")
    private Ingredient ingredient;

    @Builder
    CocktailIngredient(Cocktail cocktail, Ingredient ingredient){
        this.cocktail = cocktail;
        this.ingredient = ingredient;

        cocktail.getCocktailIngredientList().add(this);
    }
}
