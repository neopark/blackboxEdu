package com.saehan.elevblack.blackbox.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FileMst {
    int idx;
    String type;
    String insDate;
    String insUserId;
    String upDate;
    String UpUserId;
    List<FileDtl> files;
}
