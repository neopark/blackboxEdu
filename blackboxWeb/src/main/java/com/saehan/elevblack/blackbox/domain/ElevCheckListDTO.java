package com.saehan.elevblack.blackbox.domain;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ElevCheckListDTO {

    int idx;
    String type;
    String code;
    String masterCode;
    String codeName;
    String codeContent;
    int inputYn;
    String per;
    String insDate;
    String insUserId;
    String updDate;
    String updUserId;
    
}
