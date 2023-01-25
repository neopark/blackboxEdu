package com.saehan.elevblack.blackbox.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.Page;
import com.saehan.elevblack.blackbox.domain.FcmTokenDTO;
import com.saehan.elevblack.blackbox.domain.MessageDTO;
import com.saehan.elevblack.blackbox.domain.UserDTO;
import com.saehan.elevblack.blackbox.domain.UserListDTO;
import com.saehan.elevblack.blackbox.mapper.ElevMapper;
import com.saehan.elevblack.blackbox.mapper.UserMapper;
import com.saehan.elevblack.blackbox.model.dto.ResponseDto;
import com.saehan.elevblack.blackbox.model.enums.Role.ROLES;
import com.saehan.elevblack.blackbox.model.redis.AccessToken;
import com.saehan.elevblack.blackbox.model.redis.RefreshToken;
import com.saehan.elevblack.blackbox.module.security.JwtTokenProvider;

import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {

    @Autowired private JwtTokenProvider jwtTokenProvider;
    @Autowired private UserMapper userMapper;
    @Autowired private RedisTemplate<String, String> redisStringTemplate;
    @Autowired @Qualifier("access") private RedisTemplate<String, Object> redisTemplateAccess;
    @Autowired @Qualifier("refresh") private RedisTemplate<String, Object> redisTemplateRefresh;
    @Autowired private ObjectMapper objectMapper;
    private Logger logger = LoggerFactory.getLogger(ApplicationRunner.class);
    // public void login(String userId,String userPw){

    //     AccessToken accessToken = jwtTokenProvider.createAccessToken(userId);

    // }

    public List<UserListDTO> userList(UserDTO param){
//        System.out.println(userMapper.selectUserList(param).getTotal());
        return userMapper.selectUserList(param);
    }

    public UserDTO userPass(UserDTO param){
        return userMapper.selectUserPass(param);
    }

    public UserDTO selectSnsUser(UserDTO param){
        return userMapper.selectSnsUser(param);
    }
    public UserDTO selectUser(UserDTO param){
        return userMapper.selectSnsLogin(param);
    }



    public int saveUser(UserDTO param){
        return userMapper.saveUser(param); 
    }

    public int saveSnsUser(UserDTO param){

        // try {
        //     logger.info("user:{}",objectMapper.writeValueAsString(param));
        // } catch (JsonProcessingException e) {
        //     // TODO Auto-generated catch block
        //     e.printStackTrace();
        // }       
       UserDTO user =  userMapper.selectSnsUser(param);
      
 
       if(user==null){
        return userMapper.saveSnsUser(param); 
       }else{
        return 2;    // 이미 가입된 SNS 계정
       }
    }

    public int updateSnsUser(UserDTO param){

        // try {
        //     logger.info("user:{}",objectMapper.writeValueAsString(param));
        // } catch (JsonProcessingException e) {
        //     // TODO Auto-generated catch block
        //     e.printStackTrace();
        // }       
       UserDTO user =  userMapper.selectSnsUser(param);
       if(user==null){
        return userMapper.updateSnsUser(param); 
       }else{
        return 2;    // 이미 가입된 SNS 계정
       }
    }
    public int deleteSnsUser(UserDTO param){

       UserDTO user =  userMapper.selectSnsUser(param);
//       logger.info("user:{}",param.getSnsType());
       if(user != null){
        return userMapper.deleteSnsUser(param); 
       }else{
        return 2;    // 없는계정입니다.
       }
    }


    public int updateUser(UserDTO param){
        return userMapper.updateUser(param); 
    }
    public int updateUserItem(UserDTO param){
        return userMapper.updateUser(param); 
    }
    public int deleteUser(UserDTO param){
        return userMapper.deleteUser(param); 
    }

    public ResponseEntity<ResponseDto> login(UserDTO user) {

        ResponseEntity<ResponseDto> res = new ResponseEntity<>(HttpStatus.OK);
        UserDTO tUser = userMapper.selectSnsUser(user); //
            user.setUserId(tUser.getUserId());
        UserDTO gUser = userMapper.selectSnsLogin(user);

                if(gUser!=null) {
                    AccessToken accessToken = jwtTokenProvider.createAccessToken(gUser.getUserId(), user.getRole());
                    RefreshToken refreshToken = jwtTokenProvider.createRefreshToken(gUser.getUserId(), user.getRole());
        
                    Map<String, Object> result = new HashMap<>();
                    result.put("accessToken", accessToken);
                    result.put("refreshToken", refreshToken);

                    String loginMsg = new StringBuilder()
                        .append("안녕하세요. ")
                        .append(user.getUserNm())
                        .append("님.")
                        .toString();
        
                    res = new ResponseDto(result, loginMsg).wrap();

                    return res;
                } else {
                    res = new ResponseDto("2", "가입되지 않은 아이디입니다.").wrap();
                }

        return res;
    }

    public ResponseEntity<ResponseDto> snslogin(UserDTO user) {

        try {
            logger.info("user:{}",objectMapper.writeValueAsString(user));
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }       

        ResponseEntity<ResponseDto> res = new ResponseEntity<>(HttpStatus.OK);
        UserDTO gUser = userMapper.selectSnsUser(user);
      try {
            logger.info("guser:{}",objectMapper.writeValueAsString(gUser));
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }       

                if(gUser!=null) {
                    AccessToken accessToken = jwtTokenProvider.createAccessToken(gUser.getUserId(), user.getRole());
                    RefreshToken refreshToken = jwtTokenProvider.createRefreshToken(gUser.getUserId(), user.getRole());
        
                    Map<String, Object> result = new HashMap<>();
                    result.put("accessToken", accessToken);
                    result.put("refreshToken", refreshToken);

                    String loginMsg = new StringBuilder()
                        .append("안녕하세요. ")
                        .append(user.getUserNm())
                        .append("님.")
                        .toString();
        
                    res = new ResponseDto(result, loginMsg).wrap();

                    return res;
                } else {
                    res = new ResponseDto("2", "가입되지 않은 아이디입니다.").wrap();
                }

        return res;
    }    
    public ResponseEntity<ResponseDto> processAutoLogin(String accessToken) throws JsonMappingException, JsonProcessingException {

        ResponseEntity<ResponseDto> res = new ResponseEntity<>(HttpStatus.OK);
		Map<String, Object> data = new HashMap<>();

		if(jwtTokenProvider.isAccessTokenExpired(accessToken)) {
			res = new ResponseDto("2", "만료된 토큰입니다.").wrap();
		} else {
            UserDTO user = new UserDTO();
            String userId = jwtTokenProvider.getUserPkFromToken(accessToken);
			user.setUserId(userId);
            UserDTO gUser =    userMapper.selectSnsLogin(user);

			ValueOperations<String, Object> opsForValue = redisTemplateRefresh.opsForValue();
			RefreshToken savedRefreshToken = objectMapper.readValue(objectMapper.writeValueAsString(opsForValue.get("refresh_" + userId)), new TypeReference<RefreshToken>() {});
			String savedRefreshTokenValue = savedRefreshToken.getRefreshToken();

			data.put("user", gUser);
			data.put("accessToken", accessToken);
			data.put("refreshToken", savedRefreshTokenValue);

			res = new ResponseDto(data, "자동 로그인 처리 성공했습니다.").wrap();
		}

		return res;

    }

    public ResponseEntity<ResponseDto> refreshLoginSession(String refreshToken) {

        ResponseEntity<ResponseDto> res = new ResponseEntity<>(HttpStatus.OK);
		String userId = null;

		if (!jwtTokenProvider.isRefreshTokenExpired(refreshToken)) { // refresh token 만료되지 않았을때 -> 여기서 예외가 터짐

			userId = jwtTokenProvider.getUserPkFromToken(refreshToken); // access_token에서 user_id 가져옴(유효성 검사)
            UserDTO user = new UserDTO();
//			User user = userRepository.findById(userId).orElseThrow(NoSuchElementException::new);
            user.setUserId(userId);
			AccessToken newAccessToken = jwtTokenProvider.createAccessToken(user.getUserId(), user.getRole());

			res = new ResponseDto(newAccessToken, "로그인 연장 처리에 성공했습니다.").wrap();

		} else { // refresh 토큰 expire

			res = new ResponseDto("2", "refresh 토큰이 만료되었습니다. 다시 로그인해주세요.").wrap();

		}

        return res;

    }

    public ResponseEntity<ResponseDto> logout(String accessToken) throws JsonMappingException, JsonProcessingException {
        
        String userId = null;
		ResponseEntity<ResponseDto> res = new ResponseDto("로그아웃되었습니다.").wrap();
        ValueOperations<String, Object> opsForValue = redisTemplateAccess.opsForValue();
        ValueOperations<String, Object> opsForValue2 = redisTemplateRefresh.opsForValue();

		try {
			userId = jwtTokenProvider.getUserPkFromToken(accessToken); // access_token에서 user_id를 가져옴(유효성 검사)
		} catch(IllegalArgumentException e) {} catch(ExpiredJwtException e) { // 만료
			userId = e.getClaims().getSubject(); // 만료된 access token으로부터 user_id를 가져옴
			logger.info("user_id from expired access token : " + userId);
		}

        if (opsForValue.get("access_" + userId) != null) {
            redisTemplateAccess.delete("access_" + userId);
            opsForValue.set(accessToken, true);
            redisTemplateAccess.expire(accessToken, 1, TimeUnit.HOURS);
        }

		try {
            Object refreshTokenObject = opsForValue2.get("refresh_" + userId);
			if (refreshTokenObject != null) { // refresh token이 db에 저장되어있을때
				redisTemplateAccess.delete("refresh_" + userId); // refresh token의 데이터를 삭제
			}
		} catch (IllegalArgumentException e) {
			logger.warn("user does not exist");
		}

		logger.info(" logout ing : " + accessToken);


		return res;

    }

    
    public Page<MessageDTO> messageList(MessageDTO param){
        //        System.out.println(userMapper.selectUserList(param).getTotal());
                logger.info("userId:{}",param);
                return userMapper.selectMsgList(param);
    }        

    public int saveToken(FcmTokenDTO param){
        return userMapper.insertFcmToken(param); 
    }

    public FcmTokenDTO getToken(){
        return userMapper.selectFcmToken();
    }
}
