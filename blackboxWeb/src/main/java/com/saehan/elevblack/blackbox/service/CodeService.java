package com.saehan.elevblack.blackbox.service;

import com.github.pagehelper.Page;
import com.saehan.elevblack.blackbox.domain.CodeDTO;
import com.saehan.elevblack.blackbox.domain.CodeDtlDTO;
import com.saehan.elevblack.blackbox.mapper.CodeMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CodeService {
    @Autowired CodeMapper codeMapper;

    public Page<CodeDTO> listCode(CodeDTO param){
        return codeMapper.selectCodeList(param);
    }

    public Page<CodeDtlDTO> listCodeDtl(CodeDtlDTO param){
        return codeMapper.selectCodeDtlList(param);
    }

    public int insertCode(CodeDTO param){
        return codeMapper.insertCode(param);
    }
    public int insertCodeDtl(CodeDtlDTO param){
        return codeMapper.insertCodeDtl(param);
    }

    public int updateCode(CodeDTO param){
        return codeMapper.updateCode(param);
    }    
    public int deleteCode(CodeDTO param){
        return codeMapper.deleteCode(param);
    }    
    public int deleteCodeDtl(CodeDtlDTO param){
        return codeMapper.deleteCodeDtl(param);
    }    

}
