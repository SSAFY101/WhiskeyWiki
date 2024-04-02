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
public class Cocktail {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cocktail_id")
    private int id;

    private String recipe;

    private String cocktailName;

    private String cocktailNameEn;

    private String detail;

    //연관관계

    //1.칵테일 재료와 일대다 매핑
    @OneToMany(mappedBy = "cocktail")
    @Builder.Default
    private List<CocktailIngredient> cocktailIngredientList = new ArrayList<>();

    //2. 기주와 일대다 매핑
    @OneToMany(mappedBy = "cocktail")
    @Builder.Default
    private List<Base> baseList = new ArrayList<>();

    //3, 즐겨찾기와 일대다 매핑
    @OneToMany(mappedBy = "cocktail")
    @Builder.Default
    private List<Favorite> favoriteList = new ArrayList<>();
}
