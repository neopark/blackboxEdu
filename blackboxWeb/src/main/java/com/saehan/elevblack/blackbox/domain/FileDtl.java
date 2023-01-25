package com.saehan.elevblack.blackbox.domain;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FileDtl {
    int idx;
    String fileNm;
    String fileOrgNm;
    String fileExt;
    String fileSize;
    String fileUrl;
    String thumbnailUrl;
    int fileMstIdx;
    String insDate;
    String insUserId;
    String upDate;
    String upUserId;
}
