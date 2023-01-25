package com.saehan.elevblack.blackbox.mapper;

import com.github.pagehelper.Page;
import com.saehan.elevblack.blackbox.domain.CodeDTO;
import com.saehan.elevblack.blackbox.domain.CodeDtlDTO;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper()
@Repository
public interface CodeMapper {

    Page<CodeDTO> selectCodeList(CodeDTO param);
    Page<CodeDtlDTO> selectCodeDtlList(CodeDtlDTO param);

    int insertCode(CodeDTO param);
    int updateCode(CodeDTO param);
    int deleteCode(CodeDTO param);

    int insertCodeDtl(CodeDtlDTO param);
    int updateCodeDtl(CodeDtlDTO param);
    int deleteCodeDtl(CodeDtlDTO param);
    
}