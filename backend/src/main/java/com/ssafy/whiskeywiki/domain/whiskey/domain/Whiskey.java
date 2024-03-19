package com.ssafy.whiskeywiki.domain.whiskey.domain;

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

    //연관관계
    //1. 위스키와 기주는 일대다 관계
    @OneToMany(mappedBy = "whiskey")
    @Builder.Default
    private List<Base> baseList = new ArrayList<>();

    //2. 위스키와 리뷰는 일대다 관계, 위스키가 삭제되면 리뷰도 삭제
    @OneToMany(mappedBy = "whiskey", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Review> reviewList = new ArrayList<>();

    //3. 위스키와 위스키보유는 일대다 관계, 위스키가 삭제되면 위스키 보유도 삭제
    @OneToMany(mappedBy = "whiskey", cascade = CascadeType.ALL)
    @Builder.Default
    private List<OwnWhiskey> ownWhiskeyList = new ArrayList<>();
}
