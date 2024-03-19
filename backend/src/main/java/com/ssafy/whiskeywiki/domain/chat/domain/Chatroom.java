package com.ssafy.whiskeywiki.domain.chat.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chatrooms")
@Getter
public class Chatroom {

    @Id @GeneratedValue
    @Column(name = "chatroom_id")
    private int id;

    @CreatedDate
    private LocalDateTime createTime;

    @CreatedDate
    private LocalDateTime editTime;
}
