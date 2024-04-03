package com.ssafy.whiskeywiki.domain.map.service.impl;

import com.ssafy.whiskeywiki.domain.map.dto.MapDTO;
import com.ssafy.whiskeywiki.domain.map.service.MapService;
import com.ssafy.whiskeywiki.domain.mybar.domain.OwnWhiskey;
import com.ssafy.whiskeywiki.domain.mybar.repository.OwnWhiskeyRepository;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.function.Address;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import com.ssafy.whiskeywiki.domain.whiskey.repository.WhiskeyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
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
    public List<MapDTO.ResponseAnotherMyBar> userList(int userId, List<String> checkedWhiskeyList) {
        /**
         * 빈병이 아닌 위스키를 가진 유저에 대해서만 처리해줘야함!
         */
        List<MapDTO.ResponseAnotherMyBar> result = new ArrayList<>();
        List<Integer> userIdList = new ArrayList<>();

        for(String name : checkedWhiskeyList){
//            System.out.println(name);
            Whiskey whiskey = whiskeyRepository.findByWhiskeyNameKr(name);
            List<OwnWhiskey> ownWhiskeyList = ownWhiskeyRepository.findOwnWhiskeyListByWhiskey(whiskey);

            for(OwnWhiskey ownWhiskey : ownWhiskeyList){
                //빈병이 아닌 보유하고 있는 위스키에 대해서만 진행
                if(ownWhiskey.getIsEmpty()){
                    int id = ownWhiskey.getUser().getId();
                    if(id != userId && !userIdList.contains(id)){
//                        System.out.println("해당 위스키를 보유한 유저입니다. " + userId);
                        userIdList.add(id);
                    }
                }
            }
        }

        for(int id : userIdList){
            MapDTO.ResponseAnotherMyBar responseAnotherMyBar = new MapDTO.ResponseAnotherMyBar();
            User selectUser = userRepository.getById(id);
            responseAnotherMyBar.setUserId(selectUser.getId());
            responseAnotherMyBar.setNickname(selectUser.getNickname());
            responseAnotherMyBar.setLatitude(selectUser.getLatitude());
            responseAnotherMyBar.setLongitude(selectUser.getLongitude());

            result.add(responseAnotherMyBar);
        }

        return result;
    }

    @Override
    public String[] getDistrictByLocationPoint(MapDTO.LocationResponse point) {
        String x = Double.toString(point.getLongitude());
        String y = Double.toString(point.getLatitude());

        Arrays.toString(Address.getDistrictFromAddress(x,y));

        return Address.getDistrictFromAddress(x,y);

    }

    @Override
    public List<MapDTO.ResponseAnotherMyBar> userFilterList(int userId, List<String> checkedWhiskeyList) {
        User loginUser = userRepository.getById(userId);

        String city = loginUser.getCity();
        String village = loginUser.getVillage();

        List<MapDTO.ResponseAnotherMyBar> result = new ArrayList<>();
        List<Integer> userIdList = new ArrayList<>();

        for(String name : checkedWhiskeyList){
            Whiskey whiskey = whiskeyRepository.findByWhiskeyNameKr(name);
            List<OwnWhiskey> ownWhiskeyList = ownWhiskeyRepository.findOwnWhiskeyListByWhiskey(whiskey);

            for(OwnWhiskey ownWhiskey : ownWhiskeyList){
                if(ownWhiskey.getIsEmpty()){
                    int id = ownWhiskey.getUser().getId();
                    User user = userRepository.getById(id);
                    if(id != userId
                            && !userIdList.contains(id)
                            && city.equals(user.getCity())
                            && village.equals(user.getVillage())){
                        userIdList.add(id);
                    }
                }
            }
        }

        for(int id : userIdList){
            MapDTO.ResponseAnotherMyBar responseAnotherMyBar = new MapDTO.ResponseAnotherMyBar();
            User selectUser = userRepository.getById(id);

            result.add(new MapDTO.ResponseAnotherMyBar(
                    selectUser.getId(),
                    selectUser.getNickname(),
                    selectUser.getLatitude(),
                    selectUser.getLongitude()));
        }

        return result;
    }
}
