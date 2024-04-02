package com.ssafy.whiskeywiki.domain.cocktail.service.impl;

import com.ssafy.whiskeywiki.domain.cocktail.domain.Base;
import com.ssafy.whiskeywiki.domain.cocktail.domain.Cocktail;
import com.ssafy.whiskeywiki.domain.cocktail.domain.CocktailIngredient;
import com.ssafy.whiskeywiki.domain.cocktail.dto.BaseDTO;
import com.ssafy.whiskeywiki.domain.cocktail.dto.CocktailDTO;
import com.ssafy.whiskeywiki.domain.cocktail.dto.IngredientDTO;
import com.ssafy.whiskeywiki.domain.cocktail.repository.BaseRepository;
import com.ssafy.whiskeywiki.domain.cocktail.repository.CocktailIngredientRepository;
import com.ssafy.whiskeywiki.domain.cocktail.repository.CocktailRepository;
import com.ssafy.whiskeywiki.domain.cocktail.repository.IngredientRepository;
import com.ssafy.whiskeywiki.domain.cocktail.service.CocktailService;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import com.ssafy.whiskeywiki.domain.whiskey.repository.WhiskeyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CocktailServiceImpl implements CocktailService {
    private final WhiskeyRepository whiskeyRepository;
    private final CocktailRepository cocktailRepository;
    private final BaseRepository baseRepository;
    private final CocktailIngredientRepository cocktailIngredientRepository;

    /**
     * 1. whiskeyId로 whiskey 특정하기
     * 2. 찾은 위스키를 base로 가지고 있는 Base 리스트 가져오기
     * base 리스트를 통해 칵테일 찾기
     *
     */
    @Override
    public List<CocktailDTO.CocktailInfo> recommendCocktail(int whiskeyId) {
        List<CocktailDTO.CocktailInfo> cocktailInfo = new ArrayList<>();

        Optional<Whiskey> whiskey = whiskeyRepository.findById(whiskeyId);
        if(whiskey.isPresent()){
            List<Base> baseList = baseRepository.findBaseByWhiskey(whiskey.get());
            for(Base b : baseList){
                int cocktailId = b.getCocktail().getId();
                //칵테일 찾아오긴함.
                Cocktail cocktail = cocktailRepository.getById(cocktailId);

                String cocktailName = cocktail.getCocktailName();
                String cocktailNameEn = cocktail.getCocktailNameEn();
                String recipe = cocktail.getRecipe();
                String detail = cocktail.getDetail();
                List<String> whiskeyNameList = new ArrayList<>();
                List<String> ingredientNameList = new ArrayList<>();

                List<Base> bases = baseRepository.findBaseByCocktail(cocktail);
                for(Base x : bases){
                    whiskeyNameList.add(x.getWhiskey().getWhiskeyNameKr());
                }
                List<CocktailIngredient> cocktailIngredients = cocktailIngredientRepository.findCocktailIngredientsByCocktail(cocktail);
                for(CocktailIngredient c : cocktailIngredients){
                    ingredientNameList.add(c.getIngredient().getName());
                }
                cocktailInfo.add(new CocktailDTO.CocktailInfo(cocktailName, cocktailNameEn, recipe, detail, whiskeyNameList, ingredientNameList));
            }
        }

        return cocktailInfo;
    }
}
