package com.saehan.elevblack.blackbox.model.dao;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ElevTroubleDao {
    String elevatorNo;
    String title;
    String content;
    String insDate;
    String insUserId;
    List<MultipartFile> files;
}
