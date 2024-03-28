package com.ssafy.whiskeywiki.domain.map.service.impl;

import com.ssafy.whiskeywiki.domain.map.dto.MapDTO;
import com.ssafy.whiskeywiki.domain.map.service.MapService;
import com.ssafy.whiskeywiki.domain.mybar.domain.OwnWhiskey;
import com.ssafy.whiskeywiki.domain.mybar.repository.OwnWhiskeyRepository;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import com.ssafy.whiskeywiki.domain.whiskey.repository.WhiskeyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MapServiceImpl implements MapService {

    private final UserRepository userRepository;
    private final WhiskeyRepository whiskeyRepository;
    private final OwnWhiskeyRepository ownWhiskeyRepository;

    @Override
    public MapDTO.ResponseUserLocation getUserLocation(int userId) {
        MapDTO.ResponseUserLocation userLocation = new MapDTO.ResponseUserLocation();
        Optional<User> user = userRepository.findById(userId);

        if(user.isPresent()){
            userLocation.setLatitude(user.get().getLatitude());
            userLocation.setLongitude(user.get().getLongitude());
        }

        return userLocation;
    }

    @Override
    public List<MapDTO.ResponseAnotherMyBar> userList(List<String> condition) {
        /**
         * 빈병이 아닌 위스키를 가진 유저에 대해서만 처리해줘야함!
         */
        List<MapDTO.ResponseAnotherMyBar> result = new ArrayList<>();

        for(String name : condition){
            Whiskey whiskey = whiskeyRepository.findByWhiskeyNameKr(name);
            List<OwnWhiskey> ownWhiskeyList = ownWhiskeyRepository.findByWhiskey(whiskey);
            List<Integer> userIdList = new ArrayList<>();

            for(OwnWhiskey ownWhiskey : ownWhiskeyList){
                //빈병이 아닌 보유하고 있는 위스키에 대해서만 진행
                if(!ownWhiskey.isEmpty()){
                    int userId = ownWhiskey.getUser().getId();
                    if(!userIdList.contains(userId)){
                        userIdList.add(userId);
                    }
                }
            }

            for(int userId : userIdList){
                MapDTO.ResponseAnotherMyBar responseAnotherMyBar = new MapDTO.ResponseAnotherMyBar();
                User selectUser = userRepository.getById(userId);
                responseAnotherMyBar.setUserId(selectUser.getId());
                responseAnotherMyBar.setNickname(selectUser.getNickname());
                responseAnotherMyBar.setLatitude(selectUser.getLatitude());
                responseAnotherMyBar.setLongitude(selectUser.getLongitude());

                result.add(responseAnotherMyBar);
            }

        }
        return result;
    }
}
