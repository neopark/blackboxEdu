package com.saehan.elevblack.blackbox.model.redis;

import java.io.Serializable;

import javax.persistence.Id;

import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("AccessToken")
public class AccessToken implements Serializable {

    @Id
    private String userId;

    private String accessToken;
    
}

