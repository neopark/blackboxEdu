package com.saehan.elevblack.blackbox.domain;


import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ElevChangeDTO {
    
    int idx;
    String elevatorNo;
    String title;
    String content;
    String insDate;
    String insUserId;
    int fileMstIdx;
    List<FileDtl> files;
    ElevDTO elevinfo;
    UserDTO userinfo;
    String sdate;
    String edate;
}
