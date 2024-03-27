package com.ssafy.whiskeywiki.domain.whiskey.domain;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Base;
import com.ssafy.whiskeywiki.domain.review.domain.Review;
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

    //연관관계
    //1. 위스키와 기주는 일대다 관계
    @OneToMany(mappedBy = "whiskey")
    @Builder.Default
    private List<Base> baseList = new ArrayList<>();

    //2. 위스키와 리뷰는 일대다 관계
    @OneToMany(mappedBy = "whiskey")
    @Builder.Default
    private List<Review> reviewList = new ArrayList<>();

    //3. 위스키와 위스키보유는 일대다 관계
    @OneToMany(mappedBy = "whiskey")
    @Builder.Default
    private List<OwnWhiskey> ownWhiskeyList = new ArrayList<>();
}
