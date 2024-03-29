package com.ssafy.whiskeywiki.domain.user.function;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

@Slf4j
public class Address {

    public static String[] getKakaoApiFromAddress(String roadFullAddress) {
        String apiKey = "55c7b850ceaa14bb7bf272ce132d4224";
        String apiUrl = "https://dapi.kakao.com/v2/local/search/address.json";
        String jsonString = null;

        try {

            // URL 인코딩 - URL로 사용할 수 없는 문자를 '%XX'의 형태로 변환
            // ex. 파라미터 address를 한글로 사용하기 때문에 인코딩을 해주자
            roadFullAddress = URLEncoder.encode(roadFullAddress, "UTF-8");

            // 요청 URL을 만들기
            String address = apiUrl + "?query=" + roadFullAddress;

            // URL 객체 생성
            URL url = new URL(address);

            // URL connection 생성
            URLConnection connection = url.openConnection();

            // 헤더값 설정
            connection.setRequestProperty("Authorization", "KakaoAK " + apiKey);

            // StringBuffer에 값을 넣고 String 형태로 변환하고 jsonString을 return
            BufferedReader br = null;
            br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));

            StringBuffer docJson = new StringBuffer();
            String line;

            while ((line=br.readLine()) != null) {
                docJson.append(line);
                System.out.println(line);
            }

            jsonString = docJson.toString();
            br.close();

        } catch (Exception e){
            e.printStackTrace();
        }
        String[] point = jsonToPoint(jsonString);

        return point;
    }

    private static String[] jsonToPoint(String jsonString) {

        String[] point = new String[2];
        JSONObject jsonObject = new JSONObject(jsonString);

        JSONArray documents = jsonObject.getJSONArray("documents");

        for (int i = 0; i < documents.length(); i++) {
            JSONObject document = documents.getJSONObject(i);
            String x = document.getString("x");
            String y = document.getString("y");
            point[0] = x;
            point[1] = y;
            log.info("x(= {})", x);
            log.info("y(= {})", y);
        }

        return point;
    }
}
