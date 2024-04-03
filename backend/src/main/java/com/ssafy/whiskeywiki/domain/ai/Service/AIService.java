package com.ssafy.whiskeywiki.domain.ai.Service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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

@Slf4j
@Service
public class AIService {

//    @Value(value = "${FASTAPI.URL}")
//    private String url;
    public ResponseEntity<byte[]> whiskeyDetection(MultipartFile file) {

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
        ResponseEntity<byte[]> response = restTemplate.postForEntity("http://ai.whiskeywiki.shop" + "/object-to-img", requestEntity, byte[].class);
        log.info("info(={})", response);

        return response;
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
