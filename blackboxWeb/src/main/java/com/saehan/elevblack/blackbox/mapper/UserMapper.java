package com.saehan.elevblack.blackbox.mapper;

import java.util.List;

import com.github.pagehelper.Page;
import com.saehan.elevblack.blackbox.domain.FcmTokenDTO;
import com.saehan.elevblack.blackbox.domain.MessageDTO;
import com.saehan.elevblack.blackbox.domain.UserDTO;
import com.saehan.elevblack.blackbox.domain.UserListDTO;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Mapper()
@Repository
public interface UserMapper {

     List<UserListDTO> selectUserList(UserDTO param);
     UserDTO selectUserWhere(UserDTO param);
     UserDetails selectUserInfo(UserDTO param);
     UserDTO selectUserPass(UserDTO param);
     UserDTO selectSnsUser(UserDTO param);
     UserDTO selectSnsLogin(UserDTO param);
     int saveUser(UserDTO param);
     
     int saveSnsUser(UserDTO param);
     int updateSnsUser(UserDTO param);
     int deleteSnsUser(UserDTO param);

     int updateUser(UserDTO param);
     int deleteUser(UserDTO param);
     int insertFcmToken(FcmTokenDTO param);
     FcmTokenDTO selectFcmToken();
     Page<MessageDTO> selectMsgList(MessageDTO param);
}
