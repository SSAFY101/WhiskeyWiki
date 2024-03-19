package com.ssafy.whiskeywiki.domain.cocktail.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Ingredient {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private int id;

    private String name;

    //연관관계
    @OneToMany(mappedBy = "ingredient")
    private List<CocktailIngredient> cocktailIngredientList = new ArrayList<>();
}
