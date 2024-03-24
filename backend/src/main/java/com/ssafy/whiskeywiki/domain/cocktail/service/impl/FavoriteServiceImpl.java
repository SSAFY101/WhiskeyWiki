package com.ssafy.whiskeywiki.domain.cocktail.service.impl;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Cocktail;
import com.ssafy.whiskeywiki.domain.cocktail.domain.Favorite;
import com.ssafy.whiskeywiki.domain.cocktail.repository.CocktailRepository;
import com.ssafy.whiskeywiki.domain.cocktail.repository.FavoriteRepository;
import com.ssafy.whiskeywiki.domain.cocktail.service.FavoriteService;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final CocktailRepository cocktailRepository;

    @Override
    public void addFavorite(int userId, int cocktailId) {
        Optional<User> user = userRepository.findById(userId);
        //1. favorite에 이미 등록되어 있는 항목인지?
        Cocktail cocktail = cocktailRepository.getById(cocktailId);
        List<Favorite> favoriteList = favoriteRepository.findByCocktail(cocktail);

        Favorite isFavorite = null;
        for (Favorite x : favoriteList) {
            if (x.getUser().getId() == userId) {
                isFavorite = x;
            }
        }

        if (user.isPresent()) {
            if (isFavorite == null) {
                System.out.println("즐겨찾기 등록합니다.");
                Favorite favorite = Favorite.builder()

                        .user(user.get())   //.get하면 optional에서 객체로
                        .cocktail(cocktail)
                        .build();
                favoriteRepository.save(favorite);
            } else {
                System.out.println("이미 즐겨찾기된 항목입니다.");
            }

        } else {
            System.out.println("해당 유저 id에 해당하는 유저가 없습니다.");
        }
    }

    @Override
    public void deleteFavorite(int userId, int cocktailId) {
        Optional<User> user = userRepository.findById(userId);
        System.out.println("User check");
        Cocktail cocktail = cocktailRepository.getById(cocktailId);
        System.out.println("cocktail check");
        List<Favorite> favoriteList = favoriteRepository.findByCocktail(cocktail);
        Favorite favorite = null;
        for (Favorite x : favoriteList) {
            if (x.getUser().getId() == userId) {
                favorite = x;
            }
            System.out.println("===========");
            if (favorite != null) {
                if (user.isPresent()) {
                    System.out.println("favorite check");
                    favoriteRepository.delete(favorite);
                    System.out.println("favortie 해제 완료");
                } else {
                    System.out.println("해당 유저 id에 해당하는 유저가 없습니다.");
                }
            } else {
                System.out.println("즐겨찾기 한 칵테일이 아닙니다.");
            }

        }
    }
}
