package com.ssafy.whiskeywiki.domain.mybar.domain;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class OwnWhiskey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "own_whiskey_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "whiskey_id")
    private Whiskey whiskey;

    @Builder.Default
    private boolean isEmpty = false;

    //status 상태 변경
    public void updateStatus(){
        this.isEmpty = !this.isEmpty;
    }



}
