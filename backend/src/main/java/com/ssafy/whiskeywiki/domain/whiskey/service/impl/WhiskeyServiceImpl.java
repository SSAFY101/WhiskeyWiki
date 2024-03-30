package com.ssafy.whiskeywiki.domain.whiskey.service.impl;

import com.ssafy.whiskeywiki.domain.cocktail.dto.CocktailDTO;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Review;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import com.ssafy.whiskeywiki.domain.whiskey.dto.SearchDTO;
import com.ssafy.whiskeywiki.domain.whiskey.dto.WhiskeyDTO;
import com.ssafy.whiskeywiki.domain.whiskey.repository.ReviewRepository;
import com.ssafy.whiskeywiki.domain.whiskey.repository.WhiskeyRepository;
import com.ssafy.whiskeywiki.domain.whiskey.service.WhiskeyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class WhiskeyServiceImpl implements WhiskeyService {

    private final WhiskeyRepository whiskeyRepository;
    private final ReviewRepository reviewRepository;

    //전체 위스키 목록 가져오기
    @Override
    public List<WhiskeyDTO.WhiskeySimpleInfo> allWhiskeyList() {
        List<Whiskey> whiskeyList = whiskeyRepository.findAll();
        List<WhiskeyDTO.WhiskeySimpleInfo> resultList = new ArrayList<>();

        for(Whiskey w : whiskeyList){

            //이건 여기서 처리할 것이 아니라 whiskey나 review Entity에서 처리한뒤 보내줘야함! 나중에 리팩토링 하자.
            List<Review> reviewList = reviewRepository.findByWhiskey(w);
            double reviewRating = 0.0;

            for(Review r : reviewList){
                reviewRating += r.getReviewRating().getValue();
            }
            reviewRating = reviewRating / reviewList.size();
            reviewRating = Math.round(reviewRating*10)/10.0;
            System.out.println(w.getId() + " + " + reviewRating);

            WhiskeyDTO.WhiskeySimpleInfo whiskey = new WhiskeyDTO.WhiskeySimpleInfo();
            whiskey.setWhiskeyId(w.getId());
            whiskey.setWhiskeyNameKr(w.getWhiskeyNameKr());
            whiskey.setWhiskeyNameEn(w.getWhiskeyNameEn());
            whiskey.setWhiskeyFlavor(w.getWhiskeyFlavor());
            whiskey.setAbv(w.getAbv());
            whiskey.setPrice(w.getPrice());
            whiskey.setReviewRating(reviewRating);
            resultList.add(whiskey);
        }
        return resultList;
    }

    /**
     *  나중에 할 예정!!
     */
    //해당 이름을 포함하는 위스키 리스트 가져오기
    @Override
    public List<WhiskeyDTO.WhiskeySimpleInfo> findWhiskeyNameList(String whiskeyName) {
        List<WhiskeyDTO.WhiskeySimpleInfo> resultList = new ArrayList<>();

        //일단 kr로 찾고 해당된 위스키가 없으면 en으로도 찾아보자
        List<Whiskey> whiskeyList = whiskeyRepository.findByWhiskeyNameKrContaining(whiskeyName);
        //빈 배열일 경우 -> 입력한 한글을 포함하는 위스키의 이름이 없다!
        if(whiskeyList.size() == 0){
            whiskeyList = whiskeyRepository.findByWhiskeyNameEnContaining(whiskeyName);
            System.out.println(whiskeyList.size());
        }
        if(whiskeyList != null){
            for(Whiskey w : whiskeyList){
                WhiskeyDTO.WhiskeySimpleInfo whiskey = new WhiskeyDTO.WhiskeySimpleInfo();
                whiskey.setWhiskeyNameKr(w.getWhiskeyNameKr());
                whiskey.setWhiskeyNameEn(w.getWhiskeyNameEn());
                whiskey.setWhiskeyFlavor(w.getWhiskeyFlavor());
                whiskey.setAbv(w.getAbv());
                whiskey.setPrice(w.getPrice());
                resultList.add(whiskey);
            }
        }
            return resultList;
    }

    //위스키 조건 검색
    @Override
    public List<WhiskeyDTO.WhiskeySimpleInfo> whiskeyListCondition(SearchDTO.SearchCondition searchCondition) {
        return null;
    }

    //위스키id로 상세정보 가져오기
    @Override
    public WhiskeyDTO.WhiskeyDetailInfo whiskeyDetailInfo(int whiskeyId) {
        WhiskeyDTO.WhiskeyDetailInfo whiskeyInfo = new WhiskeyDTO.WhiskeyDetailInfo();

        Whiskey whiskey = whiskeyRepository.getById(whiskeyId);

        whiskeyInfo.setWhiskeyNameKr(whiskey.getWhiskeyNameKr());
        whiskeyInfo.setWhiskeyNameEn(whiskey.getWhiskeyNameEn());
        whiskeyInfo.setWhiskeyFlavor(whiskey.getWhiskeyFlavor());
        whiskeyInfo.setAbv(whiskey.getAbv());
        whiskeyInfo.setPrice(whiskey.getPrice());
        whiskeyInfo.setDetail(whiskey.getDetail());

        return whiskeyInfo;
    }

    //위스키 id로 만들 수 있는 칵테일 추천해주기

    /**
     * 위스키 id 검색해서 해당 위스키로 만들 수 있는 칵테일 리스트 가져온 그중에 하나 추천해주자!
     * -> 근데 랜덤으로 추천해줘야하는데..!!
     */
    @Override
    public List<CocktailDTO.CocktailInfo> recommendCocktail(int whiskeyId) {
        return null;
    }

    @Override
    public List<WhiskeyDTO.WhiskeyNameData> getAllWhikseyName() {
        List<Whiskey> whiskeyList = whiskeyRepository.findAll();
        List<WhiskeyDTO.WhiskeyNameData> resultList = new ArrayList<>();

        for(Whiskey w : whiskeyList){
            resultList.add(new WhiskeyDTO.WhiskeyNameData(w.getWhiskeyNameKr(), w.getWhiskeyNameEn()));
        }

        return resultList;
    }
}
