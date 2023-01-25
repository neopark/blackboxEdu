package com.saehan.elevblack.blackbox.module.security;


import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saehan.elevblack.blackbox.model.dto.ResponseDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * @author : 김하빈(hbkim@bpnsolution.com)
 * @description : Jwt 인증 진입점 클래스
 * @Date : 2020. 10. 7.
 * @Time : 오전 9:09:52
 */
@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthEntryPoint.class);

	private static ResponseDto exceptionResponse =
			new ResponseDto("3", "권한이 없습니다. 로그인해주세요.");

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException, InsufficientAuthenticationException {
		logger.error("Unauthorized error: {}", authException.getMessage());
		logger.error("", authException);

		response.setStatus(HttpStatus.UNAUTHORIZED.value());

		try (OutputStream os = response.getOutputStream()) {
			ObjectMapper om = new ObjectMapper();
			om.writeValue(os, exceptionResponse);
			os.flush();
		}
	}
}