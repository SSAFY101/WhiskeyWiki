package com.ssafy.whiskeywiki.domain.whiskey.domain;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Base;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Builder(toBuilder = true)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Whiskey {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "whiskey_id")
    private int id;

    private String whiskeyNameKr;

    private String whiskeyNameEn;

    private String whiskeyFlavor;

    private double abv;

    private int price;

    private String detail;

    @OneToMany(mappedBy = "whiskey", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Review> reviewList = new ArrayList<>();
}
