package com.saehan.elevblack.blackbox.model.redis;
import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("RefreshToken")
public class RefreshToken implements Serializable {

	private static final long serialVersionUID = 7882162987576256776L;

	@Id
    private String userId;

    private String refreshToken;

}
