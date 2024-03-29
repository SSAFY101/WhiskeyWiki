package com.ssafy.whiskeywiki.domain.user.function;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AddressTest {

    Address address = new Address();
    @Test
    void test() {
        address.getKakaoApiFromAddress("전북 익산시 부송동 100");
    }
}