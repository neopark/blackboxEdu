package com.saehan.elevblack.blackbox.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.github.pagehelper.Page;
import com.saehan.elevblack.blackbox.domain.ElevChangeDTO;
import com.saehan.elevblack.blackbox.domain.ElevDTO;
import com.saehan.elevblack.blackbox.domain.ElevTroubleDTO;
import com.saehan.elevblack.blackbox.domain.FileMst;
import com.saehan.elevblack.blackbox.mapper.ElevMapper;
import com.saehan.elevblack.blackbox.model.dao.ArduinoDao;
import com.saehan.elevblack.blackbox.model.dao.ElevChangeDao;
import com.saehan.elevblack.blackbox.model.dao.ElevTroubleDao;
import com.saehan.elevblack.blackbox.module.file.FileUpload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ElevService {
    
    @Autowired ElevMapper elevMapper;
    private final FileUpload fileUpload;
    public List<ElevDTO> listElev(ElevDTO elev){
        log.info("elevatorNo:",elev.getElevatorNo());
        return elevMapper.selectElevList(elev);
    }
    public List<ElevDTO> listElev2(ElevDTO elev){
        return elevMapper.selectElevList(elev);
    }
    public int listElev3(ArduinoDao param){
            log.info("files:",param);
            try {
                fileUpload.handleData(param.getFiles() ,param.getElevatorNo());
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        return 1;
    }
    public int insertBulk(ArduinoDao param){
        log.info("files:",param);
        try {
            fileUpload.handleDataBulk(param.getFiles() ,param.getElevatorNo());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    return 1;
}

    public ElevDTO selectElev(ElevDTO elev){
        return elevMapper.selectElev(elev);
    }


    public int saveElev(ElevDTO elev){
        return elevMapper.insertElev(elev);
    }

    public int saveChange(ElevChangeDao param) throws Exception{

        ElevChangeDTO elev = new ElevChangeDTO();
        elev.setContent(param.getContent());
        elev.setElevatorNo(param.getElevatorNo());
        elev.setInsUserId(param.getInsUserId());
        String fileMstType = "ElevChange";
        FileMst fileMst = new FileMst();
        fileMst.setType(fileMstType);
        if(param.getFiles() != null){
            log.info("chage111");
         Map<String,Object> result =   fileUpload.handleFileUpload(param.getFiles(), fileMst);
         elev.setFileMstIdx((int)result.get("FileMstIdx"));
        }
        
        // elevMapper.insertChange(elev);
        return elevMapper.insertChange(elev);
    }
    public int saveTroubleShooting(ElevTroubleDao param)throws Exception{
        ElevTroubleDTO elev = new ElevTroubleDTO();
        elev.setContent(param.getContent());
        elev.setElevatorNo(param.getElevatorNo());
        elev.setInsUserId(param.getInsUserId());
        String fileMstType = "ElevTrouble";
        FileMst fileMst = new FileMst();
        fileMst.setType(fileMstType);
        if(param.getFiles() != null){
         Map<String,Object> result =   fileUpload.handleFileUpload(param.getFiles(), fileMst);
         elev.setFileMstIdx((int)result.get("FileMstIdx"));
        }
        return elevMapper.insertTroubleShooting(elev);
    }
    public Page<ElevChangeDTO> listChange(ElevChangeDTO elev){
        return elevMapper.selectChangeList(elev);
    }
    public Page<ElevTroubleDTO> listTrouble(ElevTroubleDTO elev){
        return elevMapper.selectTroubleList(elev);
    }

}
