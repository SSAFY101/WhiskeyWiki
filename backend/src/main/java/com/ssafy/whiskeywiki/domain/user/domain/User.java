package com.ssafy.whiskeywiki.domain.user.domain;

import com.ssafy.whiskeywiki.domain.review.domain.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@Getter
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;

    private String loginId;

    private String password;

    private String nickname;

    private String address;

    private String gender;

    private int age;

    private String refreshToken;

    private BigDecimal latitude;

    private BigDecimal longtitude;

    //연관관계 매핑//

    //1. 리뷰와 일대다
    @OneToMany(mappedBy = "reviews")
    @Builder.Default
    private List<Review> reviewList = new ArrayList<>();

    //2. 위스키 보유와 일대다

    //3. 즐겨찾기와 일대다
    @OneToMany(mappedBy = "favorites")
    @Builder.Default
    private List<Favorite> favoriteList = new ArrayList<>();

    //4. 채팅과 일대다
    @OneToMany(mappedBy = "chats")
    @Builder.Default
    private List<Chat> chatList = new ArrayList<>();

    //5. 유저 채팅방(User_ChatRooms)과 일대다
    @OneToMany(mappedBy = "userChatRooms")
    @Builder.Default
    private List<userChatRooms> userChatRoomsList = new ArrayList<>();

    //6. 거래상태와 일대다
    @OneToMany(mappedBy = "tradeStatus")
    @Builder.Default
    private List<TradeStatus> tradeStatusList = new ArrayList<>();

}
