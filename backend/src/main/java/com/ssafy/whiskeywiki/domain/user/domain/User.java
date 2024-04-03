package com.ssafy.whiskeywiki.domain.user.domain;

import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import com.ssafy.whiskeywiki.domain.cocktail.domain.Favorite;
//import com.ssafy.whiskeywiki.domain.trade.domain.TradeStatus;
import com.ssafy.whiskeywiki.domain.chat.domain.Chat;
import com.ssafy.whiskeywiki.domain.cocktail.domain.Favorite;
import com.ssafy.whiskeywiki.domain.mybar.domain.OwnWhiskey;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Review;
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
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private int id;

    private String loginId;

    private String password;

    @Builder.Default
    private String nickname = "";

    @Builder.Default
    private String address = "";

    @Builder.Default
    private String gender = "";

    @Builder.Default
    private int age = 0;

    @Column(precision = 13, scale = 10)
    private BigDecimal latitude;

    @Column(precision = 13, scale = 10)
    private BigDecimal longitude;

    private String region;
    private String city;
    private String village;


    //연관관계 매핑//
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<Review> reviewList = new ArrayList<>();

    //2. 위스키 보유와 일대다
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<OwnWhiskey> ownWhiskeyList = new ArrayList<>();

    //3. 즐겨찾기와 일대다
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<Favorite> favoriteList = new ArrayList<>();

    //4. 채팅과 일대다
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<Chat> chatList = new ArrayList<>();

    //5. 유저 채팅방(User_ChatRooms)과 일대다
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<UserChatroom> userChatRoomList = new ArrayList<>();

//    //6. 거래상태와 일대다
//    @OneToMany(mappedBy = "user")
//    @Builder.Default
//    private List<TradeStatus> tradeStatusList = new ArrayList<>();

//    public void updateRefreshToken(String refreshToken) {
//        this.refreshToken = refreshToken;
//    }


    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateAddress(String address) {
        this.address = address;
    }
}
