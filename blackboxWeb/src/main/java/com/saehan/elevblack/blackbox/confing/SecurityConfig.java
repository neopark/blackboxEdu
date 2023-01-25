package com.saehan.elevblack.blackbox.confing;

import java.util.Arrays;

import com.saehan.elevblack.blackbox.module.security.JwtAuthEntryPoint;
import com.saehan.elevblack.blackbox.module.security.JwtAuthenticationFilter;
import com.saehan.elevblack.blackbox.module.security.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired private JwtAuthEntryPoint authEntryPoint;
    @Autowired private JwtTokenProvider jwtTokenProvider;
    
    @Override
    public void configure(WebSecurity web) throws Exception {
        // static 디렉터리의 하위 파일 목록은 인증 무시 ( = 항상통과 )
        web.ignoring().antMatchers("/static/**", "/css/**", "/js/**", "/img/**", "/lib/**");
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .cors()
        .and()
        .csrf().disable()       // rest api이므로 csrf 보안이 필요없으므로 disable처리.
        .httpBasic().disable() // rest api 이므로 기본설정 사용안함. 기본설정은 비인증시 로그인폼 화면으로 리다이렉트 된다.
        .formLogin().disable()     	// form 기반의 로그인에 대해 비활성화 한다.
        // 토큰을 활용하면 세션이 필요 없으므로 STATELESS로 설정하여 Session을 사용하지 않는다.
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests() // 권한 체커
        .antMatchers("/*","/elev/*","/check/*","/user/*","/user/sns/*","/user/login/*","/user/message/*","/login","/act/*","/redis/*","/upload-test/*").permitAll() // 토큰 없이 가능
        .anyRequest().authenticated()
        .and()
        .exceptionHandling().authenticationEntryPoint(authEntryPoint)
            .and()
        .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
    }    


    

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
            final CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(Arrays.asList("http://127.0.0.1:2022/","http://localhost:2022/","http://221.143.48.220:2022/","http://127.0.0.1:3000/","http://localhost:3000/","http://221.143.48.220:3000/", "http://blackbox.saehanel.co.kr/", "https://blackbox.saehanel.co.kr/"));
            configuration.setAllowedOriginPatterns(Arrays.asList("*"));
            configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
            configuration.setAllowCredentials(true);
            configuration.setAllowedHeaders(Arrays.asList("Cookie", "Accept", "Accept-Encoding", "TOKEN", "COOKIE", "Referer",
                            "Authorization", "Cache-Control", "Content-Type"));
            final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);
            return source;
    }

}

