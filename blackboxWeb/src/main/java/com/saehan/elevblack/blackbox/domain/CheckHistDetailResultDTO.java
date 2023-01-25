package com.saehan.elevblack.blackbox.domain;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CheckHistDetailResultDTO {

    int idx;
    int masterIdx;
    int checkIdx;
    String result;
    String code;
    String codeName;
    String codeContent;
    int inputYn;
    String per;
    ElevCheckListDTO checkList;
}
