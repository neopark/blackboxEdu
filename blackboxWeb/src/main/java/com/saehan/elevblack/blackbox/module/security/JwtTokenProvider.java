
package com.saehan.elevblack.blackbox.module.security;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import com.saehan.elevblack.blackbox.domain.UserDTO;
import com.saehan.elevblack.blackbox.model.enums.Role;
import com.saehan.elevblack.blackbox.model.redis.AccessToken;
import com.saehan.elevblack.blackbox.model.redis.RefreshToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.data.redis.core.RedisTemplate;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Component
public class JwtTokenProvider {
    
@Value("spring.jwt.secret")
private String secretKey;

public static final long JWT_ACCESS_TOKEN_VALIDITY = 1000L * 60 * 60 * 1; // 1시간만 토큰 유효
public static final long JWT_REFRESH_TOKEN_VALIDITY = 1000L * 60 * 60 * 3; // 3시간


@Autowired @Qualifier("access") private RedisTemplate<String, Object> redisTemplateAccess;
@Autowired @Qualifier("refresh") private RedisTemplate<String, Object> redisTemplateRefresh;
@Autowired UserDetailsService userService;


@PostConstruct
protected void init() {
 //   secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    secretKey = "secretKey-test-authorization-jwt-manage-token-asdfasdfasdfasdfasdf-asdfasdfasdfasdf";
    secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
}

private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) throws ExpiredJwtException {
    final Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    return claimsResolver.apply(claims);
}



public Boolean isAccessTokenExpired(String accessToken) {
		
    try{
        final Date expiration = getClaimFromToken(accessToken, Claims::getExpiration); // 토큰 만료 여부 체크
        Long expire_time = redisTemplateAccess.getExpire(accessToken); // 로그아웃하면서 만료되었는지 체크
        Boolean result = expiration.before(new Date()) || expire_time >= 0;
        return result;
    } catch(ExpiredJwtException e) {
        return true;
    }
    
}

public Boolean isRefreshTokenExpired(String refreshToken) {
    
    try{
        final Date expiration = getClaimFromToken(refreshToken, Claims::getExpiration); // 토큰 만료 여부 체크
        Long expire_time = redisTemplateRefresh.getExpire(refreshToken); // 로그아웃하면서 만료되었는지 체크
        Boolean result = expiration.before(new Date()) || expire_time >= 0;
        return result;
    } catch(ExpiredJwtException e) {
        return true;
    }
    
}

// JWT ACCESS 토큰 생성
public AccessToken createAccessToken(String userId, String role) {
    
    String accessTokenKey = new StringBuilder().append("access_").append(userId).toString();

    Claims claims = Jwts.claims();
    if(role != null) {
        claims.put("role", role);
    }

    ValueOperations<String, Object> opsForValue = redisTemplateAccess.opsForValue();
    
    Date now = new Date();
    Date expireDate = new Date(now.getTime() + JWT_ACCESS_TOKEN_VALIDITY);
    String tokenValue = Jwts.builder()
        .setClaims(claims) // 데이터
        // .setSubject(roles.contains(Role.ADMIN) ? userPk : new StringBuilder().append("user").append("_").append(userPk).toString())
        .setSubject(userId)
        .setIssuedAt(now) // 토큰 발행일자
        .setExpiration(expireDate) // set ExpireTime
        .signWith(SignatureAlgorithm.HS512, secretKey) // 암호화 알고리즘, secret값 세팅
        .compact();

    AccessToken buildAccessToken = AccessToken.builder().userId(userId).accessToken(tokenValue).build();

    opsForValue.set(accessTokenKey, buildAccessToken);
    redisTemplateAccess.expireAt(accessTokenKey, expireDate);

    return buildAccessToken;

}

public RefreshToken createRefreshToken(String userId, String role) {

    String refreshTokenKey = new StringBuilder().append("refresh_").append(userId).toString();

    Claims claims = Jwts.claims();
    if(role != null) {
        claims.put("role", role);
    }

    ValueOperations<String, Object> opsForValue = redisTemplateRefresh.opsForValue();

    Date now = new Date();
    Date expireDate = new Date(now.getTime() + JWT_REFRESH_TOKEN_VALIDITY);
    String tokenValue = Jwts.builder()
        .setClaims(claims) // 데이터
        // .setSubject(roles.contains(Role.ADMIN) ? userPk : new StringBuilder().append("user").append("_").append(userPk).toString())
        .setSubject(userId)
        .setIssuedAt(now) // 토큰 발행일자
        .setExpiration(expireDate) // set ExpireTime
        .signWith(SignatureAlgorithm.HS512, secretKey) // 암호화 알고리즘, secret값 세팅
        .compact();

    RefreshToken buildRefreshToken = RefreshToken.builder().userId(userId).refreshToken(tokenValue).build();

    opsForValue.set(refreshTokenKey, buildRefreshToken);
    redisTemplateRefresh.expireAt(refreshTokenKey, expireDate);

    return buildRefreshToken;

}

// JWT 토큰으로 인증 정보를 조회
public Authentication getauthentication(String token) {
    UserDetails userDetails = userService.loadUserByUsername(this.getUserPkFromToken(token));
   // System.out.println("userDeatils:"+userDetails);
    return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
}


	// Request의 Header에서 token 파싱 : "TOKEN: jwt 토큰"
	public String resolveToken(HttpServletRequest req) {
		return req.getHeader("TOKEN");
	}
	// JWT 토큰에서 회원 구별 정보 추출
	public String getUserPkFromToken(String token) {
		// Object value = getClaimFromToken(token, (Claims c) -> c.get("roles"));
		// objectMapper.readValue(objectMapper.writeValueAsString(value), new TypeReference<List<Role>>() {});

		return getClaimFromToken(token, Claims::getSubject);
	}
}
