package com.ssafy.whiskeywiki.domain.user.domain;

import com.ssafy.whiskeywiki.domain.chat.domain.UserChatroom;
import com.ssafy.whiskeywiki.domain.cocktail.domain.Favorite;
//import com.ssafy.whiskeywiki.domain.trade.domain.TradeStatus;
import com.ssafy.whiskeywiki.domain.mybar.domain.OwnWhiskey;
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

    @Column(precision = 13, scale = 10)
    private BigDecimal latitude;

    @Column(precision = 13, scale = 10)
    private BigDecimal longitude;

    //연관관계 매핑//

    //2. 위스키 보유와 일대다
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @Builder.Default
    private List<OwnWhiskey> ownWhiskeyList = new ArrayList<>();

    //3. 즐겨찾기와 일대다
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Favorite> favoriteList = new ArrayList<>();

    //5. 유저 채팅방(User_ChatRooms)과 일대다
    @OneToMany(mappedBy = "user")
    @Builder.Default
    private List<UserChatroom> userChatRoomList = new ArrayList<>();

//    //6. 거래상태와 일대다
//    @OneToMany(mappedBy = "user")
//    @Builder.Default
//    private List<TradeStatus> tradeStatusList = new ArrayList<>();

}
