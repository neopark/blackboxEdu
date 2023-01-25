package com.saehan.elevblack.blackbox.domain;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.saehan.elevblack.blackbox.model.enums.Role;
import com.saehan.elevblack.blackbox.model.redis.AccessToken;
import com.saehan.elevblack.blackbox.model.redis.RefreshToken;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import static java.util.Collections.singletonList;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO implements UserDetails {

    String userId;
    String userPw;
    String snsType;
    String userNm;
    String bizRegNo;
    String bizName;
    String license;
    String hp;
    String role;
    String fcmToken;
    String naverId;
    String kakaoId;
    String googleId;
    String appleId;
    String deviceType;
    String deviceId;
    String insDate;
    String insUserId;
    String updDate;
    String updUserId;
    AccessToken accessToken;
    RefreshToken refreshToken;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        return singletonList(new SimpleGrantedAuthority(this.role));
    }
    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return this.userPw;
    }
    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return this.userNm;
    }
    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return false;
    }
    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return false;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return false;
    }
    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return false;
    }
 
}
