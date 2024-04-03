package com.ssafy.whiskeywiki.domain.ai.Service;

import com.ssafy.whiskeywiki.domain.ai.dto.AIDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Slf4j
@Service
public class AIService {

//    @Value(value = "${FASTAPI.URL}")
//    private String url;
    public AIDTO.JsonResponse whiskeyDetection(MultipartFile file) {

        // file to byteArrayResource
        Resource resource = null;
        try {
            resource =  new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };
        } catch (Exception e) {
            e.printStackTrace();
        }

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", resource);

        log.info("body map (={})", body);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        log.info("headers (={})", headers);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Rest template
        RestTemplate restTemplate = new RestTemplate();

        // String url;
        ResponseEntity<Object> response = restTemplate.postForEntity("http://ai.whiskeywiki.shop" + "/object-to-json/basic", requestEntity, Object.class);
        LinkedHashMap<String, Object> hashMap = (LinkedHashMap<String, Object>) response.getBody();
        List<String> whiskeys = (List<String>) hashMap.get("whiskeys");
        int others = (int) hashMap.get("others");
        log.info("info(={})", response);
        log.info("response(={})", response.getBody().getClass());
        log.info("whiskeys (={})", whiskeys);
//        log.info("first(={})", hashMap.get("result").getClass());

        List<String> detailWhiskeys = new ArrayList<>();
        for (String whiskey: whiskeys) {
            if (whiskey.equals("Ballantines")) {
//
                ResponseEntity<Object> ballantinesResponse = restTemplate.postForEntity("http://ai.whiskeywiki.shop" + "/object-to-json/ballentines", requestEntity, Object.class);
                LinkedHashMap<String, Object> ballantinesHashMap = (LinkedHashMap<String, Object>) ballantinesResponse.getBody();
                List<String> ballantinesWhiskeys = (List<String>) ballantinesHashMap.get("whiskeys");

                for (String ballantines: ballantinesWhiskeys) {
                    if (ballantines.equals("finest")) {
                        detailWhiskeys.add("ballantines finest");
                    } else if (ballantines.equals("17")) {
                        detailWhiskeys.add("ballantines 17");
                    } else if (ballantines.equals("21")) {
                        detailWhiskeys.add("ballantines 21");
                    } else if (ballantines.equals("30")) {
                        detailWhiskeys.add("ballantines 30");
                    } else {
                        detailWhiskeys.add("ballantines");
                    }
                }
            } else if (whiskey.equals("Jack-Daniels")) {
//
                ResponseEntity<Object> jackResponse = restTemplate.postForEntity("http://ai.whiskeywiki.shop" + "/object-to-json/jack", requestEntity, Object.class);
                LinkedHashMap<String, Object> jackHashMap = (LinkedHashMap<String, Object>) jackResponse.getBody();
                List<String> jackWhiskeys = (List<String>) jackHashMap.get("whiskeys");

                for (String jack: jackWhiskeys) {
                    if (jack.equals("no.7")) {
                        detailWhiskeys.add("Jack-Daniels no.7");
                    } else if (jack.equals("honey")) {
                        detailWhiskeys.add("Jack-Daniels honey");
                    } else {
                        detailWhiskeys.add("Jack-Daniels");
                    }
                }
            } else if (whiskey.equals("Johnie-Walker")) { //"Johnie-Walker"
                ResponseEntity<Object> johnieResponse = restTemplate.postForEntity("http://ai.whiskeywiki.shop" + "/object-to-json/johnnie", requestEntity, Object.class);
                LinkedHashMap<String, Object> johnieHashMap = (LinkedHashMap<String, Object>) johnieResponse.getBody();
                List<String> johnieWhiskeys = (List<String>) johnieHashMap.get("whiskeys");
                log.info("johnie(={})", johnieWhiskeys);
                for (String johnie: johnieWhiskeys) {
                    if (johnie.equals("black")) {
                        detailWhiskeys.add("Johnie-Walker black");
                    } else if (johnie.equals("red")) {
                        detailWhiskeys.add("Johnie-Walker red");
                    } else if (johnie.equals("blue")) {
                        detailWhiskeys.add("Johnie-Walker blue");
                    } else {
                        detailWhiskeys.add("Johnie-Walker");
                    }
                }
            }
        }
        whiskeys.remove("Johnie-Walker");
        whiskeys.remove("Jack-Daniels");
        whiskeys.remove("Ballantines");

        for (String detail: detailWhiskeys) {
            whiskeys.add(detail);
        }

        // if others -> 세부 모델 존재 "Ballantines", "Jack-Daniels", "Johnie-Walker"
        /**
         * 세부 모델 존재 "Ballantines", "Jack-Daniels", "Johnie-Walker"
         *
         * "Ballantines": 17 -> "Ballantines 17" , 21 -> "Ballantines 21", 30 -> "Ballantines 30"
         * "Jack-Daniels": 17 -> "Jack-Daniels no.7" -> "Jack-Daniels honey"
         * "Johnie-Walker" blue -> "Johnie-Walker black", "Johnie-Walker red", "Johnie-Walker blue"
         *
         * "Ballantines 17" "Ballantines 21" "Ballantines 30"
         * "Johnie-Walker black" "Johnie-Walker red" "Johnie-Walker blue"
         * "Jack-Daniels no.7" "Jack-Daniels honey"
         */
        return AIDTO.JsonResponse.builder()
                .result(whiskeys)
                .others(others)
                .build();
    }

    public ResponseEntity<byte[]> noDetect(MultipartFile file) {

        // file to byteArrayResource
        Resource resource = null;
        try {
            resource =  new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };
        } catch (Exception e) {
            e.printStackTrace();
        }

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", resource);

        log.info("body map (={})", body);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        log.info("headers (={})", headers);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Rest template
        RestTemplate restTemplate = new RestTemplate();

        // String url; /object-to-image/
        ResponseEntity<byte[]> response = restTemplate.postForEntity("http://ai.whiskeywiki.shop" + "/object-to-img", requestEntity, byte[].class);
        log.info("info(={})", response);

        return response;
    }
}
