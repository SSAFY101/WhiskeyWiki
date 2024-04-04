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
        log.info("response get(={})", response.getBody().toString());
        log.info("response get(={})", response.getBody().getClass());

        LinkedHashMap<String, Integer> whiskeys = (LinkedHashMap<String, Integer>) response.getBody();
//        log.info("hashMap(={})",hashMap.get("Ballantines"));
//        List<String> whiskeys = (List<String>) hashMap.get("whiskeys");
//        int others = (int) hashMap.get("others");
//        log.info("info(={})", response);
//        log.info("response(={})", response.getBody().getClass());
//        log.info("whiskeys (={})", whiskeys);
//        log.info("first(={})", hashMap.get("result").getClass());

        List<String> detailWhiskeys = new ArrayList<>();
//        for (String key: whiskeys.keySet()) {
//            if (key.equals(""))
//        }
        for (String key: whiskeys.keySet()) {
            if (key.equals("Ballantines")) {

                ResponseEntity<Object> ballantinesResponse = restTemplate.postForEntity("http://ai.whiskeywiki.shop" + "/object-to-json/ballentines", requestEntity, Object.class);
                LinkedHashMap<String, Integer> ballantinesHashMap = (LinkedHashMap<String, Integer>) ballantinesResponse.getBody();
//                List<String> ballantinesWhiskeys = (List<String>) ballantinesHashMap.get("whiskeys");

                for (String ballantines: ballantinesHashMap.keySet()) {
                    if (ballantines.equals("finest")) {
                        detailWhiskeys.add("Ballantines finest");
                    } else if (ballantines.equals("17")) {
                        detailWhiskeys.add("Ballantines 17");
                    } else if (ballantines.equals("21")) {
                        detailWhiskeys.add("Ballantines 21");
                    } else if (ballantines.equals("30")) {
                        detailWhiskeys.add("Ballantines 30");
                    } else {
                        detailWhiskeys.add("Ballantines");
                    }
                }
            } else if (key.equals("Jack-Daniels")) {

                ResponseEntity<Object> jackResponse = restTemplate.postForEntity("http://ai.whiskeywiki.shop" + "/object-to-json/jack", requestEntity, Object.class);
                LinkedHashMap<String, Integer> jackHashMap = (LinkedHashMap<String, Integer>) jackResponse.getBody();
//                List<String> jackWhiskeys = (List<String>) jackHashMap.get("whiskeys");

                for (String jack: jackHashMap.keySet()) {
                    if (jack.equals("no.7")) {
                        detailWhiskeys.add("Jack-Daniels no.7");
                    } else if (jack.equals("honey")) {
                        detailWhiskeys.add("Jack-Daniels honey");
                    } else {
                        detailWhiskeys.add("Jack-Daniels");
                    }
                }
            } else if (key.equals("Johnie-Walker")) { //"Johnie-Walker"
                ResponseEntity<Object> johnieResponse = restTemplate.postForEntity("http://ai.whiskeywiki.shop" + "/object-to-json/johnnie", requestEntity, Object.class);
                LinkedHashMap<String, Integer> johnieHashMap = (LinkedHashMap<String, Integer>) johnieResponse.getBody();
//                List<String> johnieWhiskeys = (List<String>) johnieHashMap.get("whiskeys");
//                log.info("johnie(={})", johnieWhiskeys);
                for (String johnie: johnieHashMap.keySet()) {
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

//        for (String detail: detailWhiskeys) {
//            whiskeys.add(detail);
//        }

        for (String key: whiskeys.keySet()) {
            detailWhiskeys.add(key);
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
        if (detailWhiskeys.contains("others")) {
            detailWhiskeys.remove("others");
        }

        return AIDTO.JsonResponse.builder()
                .result(detailWhiskeys)
                .others(0)
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
