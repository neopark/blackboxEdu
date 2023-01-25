package com.saehan.elevblack.blackbox.controller;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.saehan.elevblack.blackbox.domain.FcmTokenDTO;
import com.saehan.elevblack.blackbox.domain.MessageDTO;
import com.saehan.elevblack.blackbox.domain.UserDTO;
import com.saehan.elevblack.blackbox.domain.UserListDTO;
import com.saehan.elevblack.blackbox.model.dto.ResponseDto;
import com.saehan.elevblack.blackbox.model.redis.AccessToken;
import com.saehan.elevblack.blackbox.model.redis.RefreshToken;
import com.saehan.elevblack.blackbox.module.security.JwtTokenProvider;
import com.saehan.elevblack.blackbox.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.saehan.elevblack.blackbox.model.enums.Role;

@RestController
@Configuration
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
        
        private final JwtTokenProvider jwtTokenProvider;
        @Autowired UserService userService;


        @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<ResponseDto> login(@RequestBody Map<String, Object> params) {

            UserDTO user = new UserDTO(); 
            user.setUserId(params.get("userId")==null?"":params.get("userId").toString());                    
            user.setSnsType(params.get("snsType")==null?"":params.get("snsType").toString());                    
        
            return  userService.login(user);
            
        }   

        @PostMapping(value = "/list", consumes = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<ResponseDto> listAll(@RequestBody Map<String, Object> params) {
    
                UserDTO user = new UserDTO();        
                // PageHelper.startPage(params.get("page")==null?1:Integer.parseInt(params.get("page").toString()), params.get("pagesize")==null?5:Integer.parseInt(params.get("pagesize").toString()));
                // return  new ResponseDto("1",new PageInfo(userService.userList(user)),"검색에 성공했습니다.").wrap();
            
                try{
                    List<UserListDTO> list =userService.userList(user);
                    return  new ResponseDto("1" ,list,"조회에 성공 했습니다.").wrap();
                    }catch(Exception e){
                        return  new ResponseDto("0" ,e.getMessage()).wrap();
                    }

                
            }   

            @PostMapping(value = "/get", consumes = MediaType.APPLICATION_JSON_VALUE)
            public ResponseEntity<ResponseDto> userGet(@RequestBody Map<String, Object> params) {
        
                    UserDTO user = new UserDTO();        
                    if(params.containsKey("id")){user.setUserId(params.get("id").toString());} 
                    // PageHelper.startPage(params.get("page")==null?1:Integer.parseInt(params.get("page").toString()), params.get("pagesize")==null?5:Integer.parseInt(params.get("pagesize").toString()));
                    // return  new ResponseDto("1",new PageInfo(userService.userList(user)),"검색에 성공했습니다.").wrap();
                
                    try{
                        UserDTO result =userService.selectUser(user);
                        return  new ResponseDto("1" ,result,"조회에 성공 했습니다.").wrap();
                        }catch(Exception e){
                            return  new ResponseDto("0" ,e.getMessage()).wrap();
                        }
    
                    
                }   
                

            @PostMapping(value = "/message/list", consumes = MediaType.APPLICATION_JSON_VALUE)
            public ResponseEntity<ResponseDto> listMessage(@RequestBody Map<String, Object> params) {
        
                MessageDTO user = new MessageDTO();        
                    user.setInsUserId(params.get("userId")==null?"":params.get("userId").toString());     
                    PageHelper.startPage(params.get("page")==null?1:Integer.parseInt(params.get("page").toString()), params.get("pagesize")==null?5:Integer.parseInt(params.get("pagesize").toString()));        
                    try{
                       
                        PageInfo<MessageDTO> list =new PageInfo<>(userService.messageList(user));
                        return  new ResponseDto("1" ,list,"조회에 성공 했습니다.").wrap();
                        }catch(Exception e){
                            return  new ResponseDto("0" ,e.getMessage()).wrap();
                        }
        
                    
                }   
                    

        
            @PostMapping(value = "/sns/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
            public ResponseEntity<ResponseDto> signUp(@RequestBody Map<String, Object> params) {
        
                String snsId = params.get("snsId").toString();
                String snsType =  params.get("snsType").toString();
//                String userPw = params.get("userPw").toString();
                String userNm = params.get("name").toString();
                String businessNum =  params.get("businessNum").toString();
                String companyName =  params.get("companyName").toString();
                String qualificationNum =  params.get("qualificationNum").toString();
                String Hp =  params.get("phoneNum").toString();
                String fcmToken = params.get("fcmToken").toString();

                // String naverId = params.get("naverId")==null?"":params.get("naverId").toString();
                // String kakaoId = params.get("kakaoId")==null?"": params.get("kakaoId").toString();
                // String googleId = params.get("googleId")==null?"": params.get("googleId").toString();
                // String appleId = params.get("appleId")==null?"": params.get("appleId").toString();
        

                UserDTO user = new UserDTO();
                user.setDeviceType(params.get("deviceType")==null?"":params.get("deviceType").toString());                    
                user.setDeviceId(params.get("deviceId")==null?"":params.get("deviceId").toString());                    
                user.setFcmToken(params.get("fcmToken")==null?"":params.get("fcmToken").toString());                    
                user.setSnsType(snsType);
                user.setUserNm(userNm);
                user.setBizName(companyName);
                user.setBizRegNo(businessNum);
                user.setLicense(qualificationNum);
                user.setFcmToken(fcmToken);
                user.setHp(Hp);
                switch(snsType) {
                    case "kakao" :
                    user.setUserId("kakao_"+snsId);
                    user.setKakaoId(snsId);
                    break;
                    case "naver" :
                    user.setUserId("naver_"+snsId);
                    user.setNaverId(snsId);    
                    break;
                    case "google" :
                    user.setUserId("google_"+snsId);
                    user.setGoogleId(snsId);
                    break;
                    case "apple" :
                    user.setUserId("apple_"+snsId);
                    user.setAppleId(snsId);
                    break;
                    }
                   int result = userService.saveSnsUser(user);     
                    if(result == 1){
                        return new ResponseDto("1","등록이 완료되었습니다.").wrap();
                    }else if(result ==2){
                        return new ResponseDto("2","이미 등록된 SNS 계정입니다.").wrap();
                    }else{
                        return new ResponseDto("0","등록중 오류가 발생했습니다.").wrap();
                    }    

            }            
            @PostMapping(value = "/sns/update", consumes = MediaType.APPLICATION_JSON_VALUE)
            public ResponseEntity<ResponseDto> userEdit(@RequestBody Map<String, Object> params) {
        
                String userId = params.get("userId").toString();

                String snsId = params.get("snsId").toString();
                String snsType =  params.get("snsType").toString();
                String status = params.get("status").toString();
                // String userNm = params.get("name").toString();
                // String businessNum =  params.get("businessNum").toString();
                // String companyName =  params.get("companyName").toString();
                // String qualificationNum =  params.get("qualificationNum").toString();
                // String Hp =  params.get("phoneNum").toString();
                // String fcmToken = params.get("fcmToken").toString();
                // String naverId = params.get("naverId")==null?"":params.get("naverId").toString();
                // String kakaoId = params.get("kakaoId")==null?"": params.get("kakaoId").toString();
                // String googleId = params.get("googleId")==null?"": params.get("googleId").toString();
                // String appleId = params.get("appleId")==null?"": params.get("appleId").toString();
        

                UserDTO user = new UserDTO();

                user.setUserId(userId);
                user.setSnsType(snsType);
                switch(snsType) {
                    case "kakao" :
                    user.setKakaoId(snsId);
                    break;
                    case "naver" :
                    user.setNaverId(snsId);    
                    break;
                    case "google" :
                    user.setGoogleId(snsId);
                    break;
                    case "apple" :
                    user.setAppleId(snsId);
                    break;
                   }
                   if(status.equals("insert")){
                     int result = userService.updateSnsUser(user);     
                      if(result == 1){
                             return new ResponseDto("1","등록이 완료되었습니다.").wrap();
                        }else if(result ==2){
                            return new ResponseDto("2","이미 등록된 SNS 계정입니다.").wrap();
                        }else{
                            return new ResponseDto("0","등록중 오류가 발생했습니다.").wrap();
                        }   
                     
                    }else if(status.equals("delete")){
                        int result = userService.deleteSnsUser(user);     
                        if(result == 1){
                            return new ResponseDto("1","연동해제가 완료되었습니다.").wrap();
                       }else if(result ==2){
                           return new ResponseDto("2","연동이되어 있지않은 SNS 계정입니다.").wrap();
                       }else{
                           return new ResponseDto("0","등록중 오류가 발생했습니다.").wrap();
                       }    
                    }else{
                        return new ResponseDto("0","잘못된 명령입니다..").wrap();
                    }
            }        
            // sns login
            @PostMapping(value = "/sns/login", consumes = MediaType.APPLICATION_JSON_VALUE)
            public ResponseEntity<ResponseDto> Snslogin(@RequestBody Map<String, Object> params) {
    
                UserDTO user = new UserDTO(); 
                user.setUserId(params.get("userId")==null?"":params.get("userId").toString());            
                user.setSnsType(params.get("snsType")==null?"":params.get("snsType").toString());                    
                user.setDeviceType(params.get("deviceType")==null?"":params.get("deviceType").toString());                    
                user.setDeviceId(params.get("deviceId")==null?"":params.get("deviceId").toString());                    
                user.setFcmToken(params.get("fcmToken")==null?"":params.get("fcmToken").toString());                    
            
                switch(user.getSnsType()) {
                    case "kakao" :
                    user.setKakaoId(user.getUserId());
                    break;
                    case "naver" :
                    user.setNaverId(user.getUserId());    
                    break;
                    case "google" :
                    user.setGoogleId(user.getUserId());
                    break;
                    case "apple" :
                    user.setAppleId(user.getUserId());
                    break;
                    }                
                return  userService.snslogin(user);
                
            }                  

            @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
            public ResponseEntity<ResponseDto> userSave(@RequestBody Map<String, Object> params) {
                    UserDTO user = new UserDTO(); 
                    user.setUserId(params.get("userId")==null?"":params.get("userId").toString());                    
                    user.setUserPw(params.get("userPw")==null?"":params.get("userPw").toString());                    
                    user.setUserNm(params.get("userNm")==null?"":params.get("userNm").toString());                    
                    user.setHp(params.get("hp")==null?"":params.get("hp").toString());                    
                    user.setFcmToken(params.get("fcmToken")==null?"":params.get("fcmToken").toString());       
//                    System.out.println(params.get("ctype").toString());
                    if(params.get("ctype").toString().equals("insert") ){
                            return  new ResponseDto("1",userService.saveUser(user),"저장에 성공했습니다.").wrap();
                    }else if(params.get("ctype").toString().equals("update")){
                        return  new ResponseDto("1",userService.updateUser(user),"수정에 성공했습니다.").wrap();
                     }else if(params.get("ctype").toString().equals("delete")){
                        return  new ResponseDto("1",userService.deleteUser(user),"삭제에 성공했습니다.").wrap();
                    }else{
                        return  new ResponseDto("0","오류가 있습니다.").wrap();
                    }
            
            }   
 
/**
    * @author : 박광희
    * * @description : 프론트엔드 자동 로그인 처리 API
    * ! 
    * ? 
    * TODO : 
    * @param accessToken(String)
    * @return 
    * @Date : 2022. 05. 02
    * @Time : 10:00:30
    */
    @PostMapping(value = "/login/auto", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto> autoLogin(@RequestBody Map<String, Object> params) throws JsonMappingException, JsonProcessingException {

        String accessToken = params.get("accessToken").toString();

        return userService.processAutoLogin(accessToken);

    }

    /**
    * @author : 김하빈(hbkim@bpnsolution.com)
    * * @description : accessToken 재발급 API
    * * 액세스 토큰 없이 호출 가능
    * ! 
    * ? 
    * TODO : 
    * @param refreshToken(String)
    * @return 
    * @Date : 2021. 05. 07
    * @Time : 10:02:00
    */
    @PostMapping(value = "/login/refresh", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto> refresh(@RequestBody Map<String, Object> params) {

        String refreshToken = params.get("refreshToken").toString();

        return userService.refreshLoginSession(refreshToken);

    }

    /**
    * @author : 김하빈(hbkim@bpnsolution.com)
    * * @description : 로그아웃 API
    * ! 
    * ? 
    * TODO : 
    * @param accessToken(String)
    * @return 
     * @throws JsonProcessingException
     * @throws JsonMappingException
    * @Date : 2021. 05. 07
    * @Time : 10:03:29
    */
    @PostMapping(value = "/logoutUser", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto> logout(@RequestBody Map<String, Object> params) throws JsonMappingException, JsonProcessingException {

        String accessToken = params.get("accessToken").toString();
		return userService.logout(accessToken);

    }            

    @PostMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto> userUpdate(@RequestBody Map<String, Object> params) {

        String userNm = params.get("name").toString();
        String businessNum =  params.get("businessNum").toString();
        String companyName =  params.get("companyName").toString();
        String qualificationNum =  params.get("qualificationNum").toString();
        String Hp =  params.get("phoneNum").toString();

        UserDTO user = new UserDTO();
        user.setDeviceType(params.get("deviceType")==null?"":params.get("deviceType").toString());                    
        user.setDeviceId(params.get("deviceId")==null?"":params.get("deviceId").toString());                    
        user.setFcmToken(params.get("fcmToken")==null?"":params.get("fcmToken").toString());                    
        user.setUserNm(userNm);
        user.setBizName(companyName);
        user.setBizRegNo(businessNum);
        user.setLicense(qualificationNum);
        user.setHp(Hp);
        user.setUserId(params.get("userId")==null?"":params.get("userId").toString());   

           int result = userService.updateUser(user);     
            if(result == 1){
                return new ResponseDto("1","수정이 완료되었습니다.").wrap();
            }else{
                return new ResponseDto("0","수정중 오류가 발생했습니다.").wrap();
            }    

    }        






    @PostMapping(value = "/insertToken", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto> saveToken(@RequestBody Map<String, Object> params) throws JsonMappingException, JsonProcessingException {
            FcmTokenDTO fcmToken = new FcmTokenDTO();
            fcmToken.setFcmToken(params.get("fcmToken").toString());
            fcmToken.setDeviceId(params.get("deviceId").toString());
            try{
                int result =  userService.saveToken(fcmToken);
                return  new ResponseDto("1",result,"저장 성공.").wrap();
            }catch(Exception e){
                return  new ResponseDto("0",e.toString()).wrap();
            }
    }            



}
