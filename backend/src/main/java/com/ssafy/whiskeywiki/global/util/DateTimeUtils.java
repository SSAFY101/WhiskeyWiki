package com.ssafy.whiskeywiki.global.util;

import java.time.LocalDateTime;
import java.sql.Date;

public class DateTimeUtils {
    public static LocalDateTime now() {
        return LocalDateTime.now().plusHours(9);
    }
}
