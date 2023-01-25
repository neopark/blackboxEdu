package com.saehan.elevblack.blackbox.controller;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saehan.elevblack.blackbox.domain.CheckContactDataDTO;
import com.saehan.elevblack.blackbox.domain.CheckHistDetailDTO;
import com.saehan.elevblack.blackbox.domain.CheckHistDetailResult2DTO;
import com.saehan.elevblack.blackbox.domain.CheckHistMasterDTO;
import com.saehan.elevblack.blackbox.domain.CheckPointDao;
import com.saehan.elevblack.blackbox.domain.ElevDTO;
import com.saehan.elevblack.blackbox.domain.FcmTokenDTO;
import com.saehan.elevblack.blackbox.model.dto.ResponseDto;
import com.saehan.elevblack.blackbox.service.CheckService;
import com.saehan.elevblack.blackbox.service.ElevService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@Configuration
@RequestMapping("/check")
public class CheckControll {
    @Autowired CheckService checkService;
    @Autowired ElevService elevService;
    @Autowired ObjectMapper objectMapper;

    
    @PostMapping(value = "/count", consumes =  MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> setElevFileData(@RequestBody Map<String, Object> params) {
        
        ElevDTO elev = new ElevDTO();
        try{
            int cnt = checkService.checkingCount(elev);
            return  new ResponseDto("1",cnt,"조회가 완료되었습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0",e.getMessage().toString()).wrap();
        }

	}

    @PostMapping(value = "/counts", consumes =  MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> getCountS(@RequestBody Map<String, Object> params) {
        
        ElevDTO elev = new ElevDTO();
        try{
            int cnt = checkService.checkingCountS(elev);
            return  new ResponseDto("1",cnt,"조회가 완료되었습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0",e.getMessage().toString()).wrap();
        }

	}

    
    @PostMapping(value = "/countf", consumes =  MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> getCountF(@RequestBody Map<String, Object> params) {
        
        ElevDTO elev = new ElevDTO();
        try{
            int cnt = checkService.checkingCountF(elev);
            return  new ResponseDto("1",cnt,"조회가 완료되었습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0",e.getMessage().toString()).wrap();
        }

	}
    

    @PostMapping(value = "/checkhistdetail", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> selecCheckHistDetail(@RequestBody Map<String, Object> params) {
    
        try{
            List<CheckHistDetailDTO> checkHistDetail =     checkService.getHistMasterDetail2(params);
        return  new ResponseDto("1" ,checkHistDetail,"조회에 성공 했습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
	}

    
    @PostMapping(value = "/checkelevlist", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> selecCheckElev(@RequestBody Map<String, Object> params) {

        CheckHistMasterDTO elev = new CheckHistMasterDTO();
        try{
            List<CheckHistMasterDTO> list =     checkService.checkingList(elev);
        return  new ResponseDto("1" ,list,"조회에 성공 했습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
	}

    @PostMapping(value = "/checkpointlist", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> selecPointlist(@RequestBody Map<String, Object> params) {

        int checkMasterIdx =params.get("masterIdx")==null?0:Integer.parseInt(params.get("masterIdx").toString()); 

        try{
            CheckHistMasterDTO checkMaster = checkService.getHistMaster(checkMasterIdx);
            CheckPointDao checkPointDao = new CheckPointDao();
            checkPointDao.setElevatorNo(checkMaster.getElevatorNo());
            checkPointDao.setWdate(checkMaster.getInsDate().substring(0,10).replace("-", ""));
            checkPointDao.setStime(checkMaster.getInsDate().substring(11,19));
            checkPointDao.setEtime(checkMaster.getUpdDate().substring(11,19));
            
            List<CheckContactDataDTO> list =     checkService.checkingContactList(checkPointDao);
        return  new ResponseDto("1" ,list,"조회에 성공 했습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
	}

    @PostMapping(value = "/checkpointlist2", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> selecPointlist2(@RequestBody Map<String, Object> params) {

        try{
            String elevatroNo = params.get("elevatroNo").toString();
            String wdate = params.get("wdate")==null?"":params.get("wdate").toString();
            
            
            CheckPointDao checkPointDao = new CheckPointDao();
            
            checkPointDao.setWdate(wdate);
            checkPointDao.setElevatorNo(elevatroNo);
            List<CheckContactDataDTO> list =     checkService.checkingContactList(checkPointDao);
           return  new ResponseDto("1",list ,"조회에 성공 했습니다.").wrap();
        }catch(Exception e){
            log.info("error:{}",e.getMessage());
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
	}
   
   


}
