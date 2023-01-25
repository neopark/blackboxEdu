package com.saehan.elevblack.blackbox.mapper;

import com.saehan.elevblack.blackbox.domain.FileDtl;
import com.saehan.elevblack.blackbox.domain.FileMst;

public interface FileMapper {

    int insertFileMst(FileMst param);
    int insertFileDtl(FileDtl param);
    
}
