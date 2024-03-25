package com.ssafy.whiskeywiki.domain.user.repository;

import com.ssafy.whiskeywiki.domain.user.domain.User;
import com.ssafy.whiskeywiki.domain.whiskey.domain.Whiskey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
