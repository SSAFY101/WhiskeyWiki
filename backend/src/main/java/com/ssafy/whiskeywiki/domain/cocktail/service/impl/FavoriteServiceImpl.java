package com.ssafy.whiskeywiki.domain.cocktail.service.impl;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Cocktail;
import com.ssafy.whiskeywiki.domain.cocktail.domain.Favorite;
import com.ssafy.whiskeywiki.domain.cocktail.repository.CocktailRepository;
import com.ssafy.whiskeywiki.domain.cocktail.repository.FavoriteRepository;
import com.ssafy.whiskeywiki.domain.cocktail.service.FavoriteService;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
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
        if(user.isPresent()){
            Cocktail cocktail = cocktailRepository.getById(cocktailId);
            Favorite favorite = Favorite.builder()
                //.get하면 optional에서 객체로
                .user(user.get())
                .cocktail(cocktail)
                .build();
            favoriteRepository.save(favorite);
        }
        else{
            System.out.println("해당 유저 id에 해당하는 ");
        }
    }

    @Override
    public void deleteFavorite(int userId, int cocktailId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            Cocktail cocktail = cocktailRepository.getById(cocktailId);
            Favorite favorite = Favorite.builder()
                .user(user.get())
                .cocktail(cocktail)
                .build();
            favoriteRepository.delete(favorite);
        }
        else{
            System.out.println("해당 유저 id에 해당하는 ");
        }
    }
}
