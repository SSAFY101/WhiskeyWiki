package com.ssafy.whiskeywiki.domain.cocktail.domain;

import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

//중간테이블
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Base {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "base_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "whiskey_id")
    private Whiskey whiskey;
}
