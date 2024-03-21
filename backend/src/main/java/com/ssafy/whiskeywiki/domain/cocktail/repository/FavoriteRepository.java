package com.ssafy.whiskeywiki.domain.cocktail.repository;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Favorite;
import com.ssafy.whiskeywiki.domain.cocktail.dto.CocktailDTO.FavoriteData;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    //유저가 즐겨찾기한 칵테일 리스트 가져오기
    @Query("select f from Favorite f left outer join User u on f.user= :user")
    List<FavoriteData> favoriteList(User user);
}
