package com.saehan.elevblack.blackbox.domain;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CheckHistDetailResult2DTO {

    int masterIdx;
    int checkIdx;
    String result;
    String code;
    String masterCode;
    String codeName;
    String codeContent;
    String per;

}
