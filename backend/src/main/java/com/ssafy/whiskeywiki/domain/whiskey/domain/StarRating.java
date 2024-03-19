package com.ssafy.whiskeywiki.domain.whiskey.domain;

public enum StarRating {
    One(1),Two(2),Three(3),Four(4),Five(5);

    private final int rating;

    StarRating(int rating) {
        this.rating = rating;
    }

    public int getValue() {
        return this.rating;
    }


}
