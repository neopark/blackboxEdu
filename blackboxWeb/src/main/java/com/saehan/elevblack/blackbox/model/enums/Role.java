package com.saehan.elevblack.blackbox.model.enums;
import org.springframework.security.core.GrantedAuthority;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor(access = AccessLevel.PRIVATE)
public enum Role implements GrantedAuthority {
	ADMIN("ADMIN"),
    USER("USER");

	public static class ROLES{
		public static final String ADMIN = "ADMIN";
		public static final String USER = "USER";
	}

    private String value;

	@Override
	public String getAuthority() {
		return value;
	}
}
