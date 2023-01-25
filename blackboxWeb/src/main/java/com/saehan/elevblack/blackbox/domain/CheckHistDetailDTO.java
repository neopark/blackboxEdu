package com.saehan.elevblack.blackbox.domain;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CheckHistDetailDTO {

    int idx;
    int masterIdx;
    int checkIdx;
    String result;
    String insDate;
    String insUserId;
    String updDate;
    String updUserId;
    ElevCheckListDTO checkList;
    ElevDTO elevinfo;
    UserDTO userinfo;

}
