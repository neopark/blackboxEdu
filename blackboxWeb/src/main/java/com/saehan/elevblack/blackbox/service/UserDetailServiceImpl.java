package com.saehan.elevblack.blackbox.service;



import java.util.NoSuchElementException;

import com.saehan.elevblack.blackbox.domain.UserDTO;
import com.saehan.elevblack.blackbox.mapper.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
public class UserDetailServiceImpl  implements UserDetailsService {

    @Autowired private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        UserDTO params = new UserDTO();
        params.setUserId(username);
        //UserDTO user  = userMapper.selectUserWhere(params);
        UserDetails data =  userMapper.selectUserInfo(params);
        return data;
    }

}
