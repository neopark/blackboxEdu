package com.saehan.elevblack.blackbox.module.security;


import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saehan.elevblack.blackbox.model.dto.ResponseDto;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

/**
 * @author : 김하빈(hbkim@bpnsolution.com)
 * @description : Jwt 토큰 인증 필터 클래스
 * @Date : 2020. 10. 7.
 * @Time : 오전 9:09:09
 */
public class JwtAuthenticationFilter extends GenericFilterBean {

	private JwtTokenProvider jwtTokenProvider;

    // Jwt Provider 주입
    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

	// Request로 들어오는 JWT Token의 유효성을 검증(jwtTokenProvider.validateToken)하는 filter를 filterChain에 등록
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException, InsufficientAuthenticationException {

		String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
		
		if (token != null && !jwtTokenProvider.isAccessTokenExpired(token)) {
			Authentication auth = jwtTokenProvider.getauthentication(token);
			SecurityContextHolder.getContext().setAuthentication(auth);
		}

		if (token != null && jwtTokenProvider.isAccessTokenExpired(token)) {
			ObjectMapper om = new ObjectMapper();
			ResponseEntity<ResponseDto> res = new ResponseDto( "2", "토큰이 만료되었습니다.").wrap();

			response.setCharacterEncoding("UTF-8");
			try (OutputStream os = response.getOutputStream()) {
				om.writeValue(os, res);
				os.flush();
			}
		}

		chain.doFilter(request, response);
		
	}
}