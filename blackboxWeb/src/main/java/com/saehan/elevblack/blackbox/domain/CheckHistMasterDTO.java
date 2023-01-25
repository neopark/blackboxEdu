package com.saehan.elevblack.blackbox.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CheckHistMasterDTO {
    
    int idx;
    String elevatorNo;
    String gubun;
    String ctype;
    String status;
    String cStatus;
    String content;
    String insDate;
    String insUserId;
    String updDate;
    String updUserId;
    List<CheckHistDetailResultDTO> details;
    ElevDTO elevinfo;
    UserDTO userinfo;
    // 검색조건 추가 시작일시-끝일시
    String sDate;
    String eDate;
}
