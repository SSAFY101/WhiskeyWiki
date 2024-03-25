package com.ssafy.whiskeywiki.domain.map.service.impl;

import com.ssafy.whiskeywiki.domain.map.dto.MapDTO;
import com.ssafy.whiskeywiki.domain.map.service.MapService;
import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.user.repository.UserRepository;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import com.ssafy.whiskeywiki.domain.whiskey.repository.WhiskeyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MapServiceImpl implements MapService {

    private final UserRepository userRepository;
    private final WhiskeyRepository whiskeyRepository;

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
        for(String name : condition){
            Whiskey whiskey = whiskeyRepository.findByWhiskeyNameKr(name);
            int whiskeyId = whiskey.getId();
        }
    }
}
