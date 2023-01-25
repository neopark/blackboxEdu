package com.saehan.elevblack.blackbox.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.saehan.elevblack.blackbox.domain.CheckHistDetailDTO;
import com.saehan.elevblack.blackbox.domain.CheckHistDetailResult2DTO;
import com.saehan.elevblack.blackbox.domain.CheckHistDetailResultDTO;
import com.saehan.elevblack.blackbox.domain.CheckHistMasterDTO;
import com.saehan.elevblack.blackbox.domain.ElevChangeDTO;
import com.saehan.elevblack.blackbox.domain.ElevCheckListDTO;
import com.saehan.elevblack.blackbox.domain.ElevDTO;
import com.saehan.elevblack.blackbox.domain.ElevTroubleDTO;
import com.saehan.elevblack.blackbox.domain.FcmTokenDTO;
import com.saehan.elevblack.blackbox.model.dao.ArduinoDao;
import com.saehan.elevblack.blackbox.model.dao.ElevChangeDao;
import com.saehan.elevblack.blackbox.model.dao.ElevTroubleDao;
import com.saehan.elevblack.blackbox.model.dto.ResponseDto;
import com.saehan.elevblack.blackbox.module.file.FileUpload;
import com.saehan.elevblack.blackbox.service.CheckService;
import com.saehan.elevblack.blackbox.service.ElevService;
import com.saehan.elevblack.blackbox.service.UserService;
import com.saehan.elevblack.blackbox.util.NeonUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.github.pagehelper.PageInfo;

import static java.lang.Integer.parseInt;

import java.io.IOException;

@Slf4j
@RestController
@Configuration
@RequestMapping("/elev")
@RequiredArgsConstructor
public class ElevController {

    @Autowired CheckService checkService;
    @Autowired ElevService elevService;
    @Autowired ObjectMapper objectMapper;
    @Autowired UserService userService;
    private final FileUpload fileUpload;

    @PostMapping(value = "/arduinofile", consumes =  MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseDto> setElevFileData(@ModelAttribute ArduinoDao params) {
        
        log.info("param:",params.getElevatorNo());
        try{
             //elevService.listElev3(params);
             elevService.insertBulk(params);
            return  new ResponseDto("1","저장이 완료되었습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0",e.getMessage().toString()).wrap();
        }

	}

    @PostMapping(value = "/fileset", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> setElevFile(@RequestBody Map<String, Object> params) {
        ElevDTO elevDTO = new ElevDTO();
        try{
        List<ElevDTO> list =     elevService.listElev(elevDTO);
            return  new ResponseDto("1",list,"조회가 완료되었습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0",e.getMessage().toString()).wrap();
        }

	}
    
    @PostMapping(value = "/list", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> selecElevList(@RequestBody Map<String, Object> params) {
        ElevDTO elevDTO = new ElevDTO();
        elevDTO.setElevatorNo(params.get("elevatorNo") != null?params.get("elevatorNo").toString():"");    
        //PageHelper.startPage(params.get("page")==null?1:Integer.parseInt(params.get("page").toString()), params.get("pagesize")==null?10:Integer.parseInt(params.get("pagesize").toString()));
        try{
             PageHelper.startPage(params.get("page")==null?1:Integer.parseInt(params.get("page").toString()), params.get("pagesize")==null?10:Integer.parseInt(params.get("pagesize").toString()));
             PageInfo<ElevDTO> list =     new  PageInfo<>(elevService.listElev(elevDTO));

      //  List<ElevDTO> list =     elevService.listElev(elevDTO);
        
            return  new ResponseDto("1",list,"조회가 완료되었습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0",e.getMessage().toString()).wrap();
        }

	}

    
    @PostMapping(value = "/get", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> selecElevOne(@RequestBody Map<String, Object> params) {
        ElevDTO elevDTO = new ElevDTO();
        elevDTO.setElevatorNo(params.get("elevatorNo") != null?params.get("elevatorNo").toString():"");    
        //PageHelper.startPage(params.get("page")==null?1:Integer.parseInt(params.get("page").toString()), params.get("pagesize")==null?10:Integer.parseInt(params.get("pagesize").toString()));
        try{
            //  PageHelper.startPage(params.get("page")==null?1:Integer.parseInt(params.get("page").toString()), params.get("pagesize")==null?10:Integer.parseInt(params.get("pagesize").toString()));
            //  PageInfo<ElevDTO> list =     new  PageInfo<>(elevService.listElev(elevDTO));

            ElevDTO  data =     elevService.selectElev(elevDTO);
        
            return  new ResponseDto("1",data,"조회가 완료되었습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0",e.getMessage().toString()).wrap();
        }

	}


    // 엘리베이터 입력
    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> insertEleva(@RequestBody Map<String, Object> params) {
        ElevDTO elevinfo = new ElevDTO();
        try{
            if(params.get("elevinfo") != null )
            {
            elevinfo =   objectMapper.readValue(objectMapper.writeValueAsString(params.get("elevinfo")), new TypeReference<ElevDTO>() {});
            elevinfo.setInsUserId(params.get("insUserId") != null?params.get("insUserId").toString():"");  
            elevService.saveElev(elevinfo);
            } 
           return new ResponseDto("1",elevinfo,"저장이 완료되었습니다.").wrap();
        }catch(Exception e){
            return new ResponseDto("0",e.getMessage().toString()).wrap();
         }

	}


    @PostMapping(value = "/checklist", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> selecElevCheckList(@RequestBody Map<String, Object> params) {

        ElevCheckListDTO elevCheckListDTO = new ElevCheckListDTO();
        if(params.containsKey("type")) elevCheckListDTO.setType(params.get("type")==null?"":params.get("type").toString());
        if(params.containsKey("masterCode"))   elevCheckListDTO.setMasterCode(params.get("masterCode")==""?"":params.get("masterCode").toString());
        try{
        List<ElevCheckListDTO> list =     checkService.listCheckList(elevCheckListDTO);
        return  new ResponseDto("1" ,list,"조회에 성공 했습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
	}
    @PostMapping(value = "/checkhistlist", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> selecCheckHistList(@RequestBody Map<String, Object> params) {

        CheckHistMasterDTO checkHistMasterDTO = new CheckHistMasterDTO();
        String sdate = params.get("sdate")==null?"":params.get("sdate").toString();
        String edate = params.get("edate")==null?"":params.get("edate").toString();

        checkHistMasterDTO.setSDate(sdate);
        checkHistMasterDTO.setEDate(edate);

        try{
            checkHistMasterDTO.setInsUserId(params.get("insUserId")==null?null:params.get("insUserId").toString()); 
            PageHelper.startPage(params.get("page")==null?1:Integer.parseInt(params.get("page").toString()), params.get("pagesize")==null?10:Integer.parseInt(params.get("pagesize").toString()));
            PageInfo<CheckHistMasterDTO> list =     new  PageInfo<>(checkService.listCheckHist(checkHistMasterDTO));
        return  new ResponseDto("1" ,list,"조회에 성공 했습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
	}

    @PostMapping(value = "/checkhistlistall", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> selecCheckHistListAll(@RequestBody Map<String, Object> params) {

        CheckHistMasterDTO checkHistMasterDTO = new CheckHistMasterDTO();
        try{
   checkHistMasterDTO.setInsUserId(params.get("insUserId")==null?null:params.get("insUserId").toString()); 
            checkHistMasterDTO.setElevatorNo(params.get("elevatorNo")==null?null:params.get("elevatorNo").toString()); //  elev
            checkHistMasterDTO.setSDate(params.get("sdate")==null?null:params.get("sdate").toString()); // 시작일시
            checkHistMasterDTO.setEDate(params.get("edate")==null?null:params.get("edate").toString()); // 끝일시
            PageHelper.startPage(params.get("page")==null?1:Integer.parseInt(params.get("page").toString()), params.get("pagesize")==null?10:Integer.parseInt(params.get("pagesize").toString()));
            PageInfo<CheckHistMasterDTO> list =  new  PageInfo<>(checkService.listCheckHist2(checkHistMasterDTO));
        return  new ResponseDto("1" ,list,"조회에 성공 했습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
	}

    @PostMapping(value = "/checkhistmaster", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> checkhistmaster(@RequestBody Map<String, Object> params) {

        CheckHistMasterDTO checkHistMasterDTO = new CheckHistMasterDTO();
        try{
            int masterIdx = Integer.parseInt(params.get("masterIdx").toString());
            CheckHistMasterDTO data =   checkService.getHistMasterById(masterIdx);
         return  new ResponseDto("1" ,data,"조회에 성공 했습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
	}


    @PostMapping(value = "/test", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> test(@RequestBody Map<String, Object> params) {
        CheckHistMasterDTO checkHistMasterDTO = new CheckHistMasterDTO();
        checkHistMasterDTO.setElevatorNo("1111");
        try{
        Page<CheckHistMasterDTO> data =     checkService.getHistMasterDetail(checkHistMasterDTO);
        return  new ResponseDto("1" ,data,"조회에 성공 했습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
        
	}
    @PostMapping(value = "/test2", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> test2(@RequestBody Map<String, Object> params) {
        CheckHistMasterDTO checkHistMasterDTO = new CheckHistMasterDTO();
        checkHistMasterDTO.setIdx(Integer.parseInt(params.get("idx").toString()));
        try{
          List<CheckHistDetailDTO> data =     checkService.listCheckHistDetail(checkHistMasterDTO);
        return  new ResponseDto("1" ,data,"조회에 성공 했습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
        
	}


    // 체커 마스터 입력
    @PostMapping(value = "/savecheck", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> insertCheck(@RequestBody Map<String, Object> params) {
        CheckHistMasterDTO checkHistMasterDTO = new CheckHistMasterDTO();
        checkHistMasterDTO.setElevatorNo(params.get("elevatorNo")==null?"":params.get("elevatorNo").toString());
        checkHistMasterDTO.setGubun(params.get("gubun")==null?"":params.get("gubun").toString());                    
        checkHistMasterDTO.setCtype(params.get("ctype")==null?"":params.get("ctype").toString());                    
        checkHistMasterDTO.setStatus(params.get("status")==null?"":params.get("status").toString());                    
        checkHistMasterDTO.setStatus(params.get("content")==null?"":params.get("content").toString());                    
        checkHistMasterDTO.setInsUserId(params.get("insUserId")==null?"":params.get("insUserId").toString());   

        CheckHistMasterDTO tmp=new CheckHistMasterDTO();
        try{
         
           if(params.get("detail") !=null ){
            List<CheckHistDetailDTO> details =   objectMapper.readValue(objectMapper.writeValueAsString(params.get("detail")), new TypeReference<List<CheckHistDetailDTO>>() {});
            tmp =     checkService.saveCheckHistMaster(checkHistMasterDTO);
            checkService.saveCheckHistDetail(details,tmp.getIdx());
            checkService.saveCheckHistDetailEtc(tmp);
            }else{
                tmp =     checkService.saveCheckHistMaster(checkHistMasterDTO);
                checkService.saveCheckHistDetailEtc(tmp);
            }
            return  new ResponseDto("1" ,tmp,"저장에 성공 했습니다.").wrap();
        }catch(Exception e){
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
        
	}

    
        // 체커 마스터 입력
        @PostMapping(value = "/savecheckmaster", consumes = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<ResponseDto> insertCheckMaster(@RequestBody Map<String, Object> params) {

            NeonUtil util = new NeonUtil();
            CheckHistMasterDTO checkHistMasterDTO = new CheckHistMasterDTO();
            checkHistMasterDTO.setElevatorNo(params.get("elevatorNo")==null?"":params.get("elevatorNo").toString());
            checkHistMasterDTO.setGubun(params.get("gubun")==null?"":params.get("gubun").toString());                    
            checkHistMasterDTO.setCtype(params.get("ctype")==null?"":params.get("ctype").toString());                    
            checkHistMasterDTO.setStatus(params.get("status")==null?"":params.get("status").toString());                    
            checkHistMasterDTO.setStatus(params.get("content")==null?"":params.get("content").toString());                    
            checkHistMasterDTO.setInsUserId(params.get("insUserId")==null?"":params.get("insUserId").toString());                    
           try{
            CheckHistMasterDTO tmp =     checkService.saveCheckHistMaster(checkHistMasterDTO);
//            NeonUtil.sendFcmTarget("eaAS3JSiQLmC6s52_yKOU2:APA91bEFNhHMul0ASAISj_F_xNt-ahwiLr9NqYTRaQeVmrJ67jVGjlek6i22eKQVfXakIXyC0gwjfoZp3CKaqr_iD1q2_2Sn7h-axt0NOGBWODvNlStM36viWOhT9t7btZvbFw3_UYHL","엘리베이터 1호기 알림", "브레이크 패드 확인 요망");
            // FcmTokenDTO fcmtoken = userService.getToken();
            // NeonUtil.SendFcm(fcmtoken.getFcmToken(),"SH대치1단지 101동 엘리베이터 1호기", "조속기 로프 점검 요망");
                return  new ResponseDto("1" ,tmp,"저장에 성공 했습니다.").wrap();
            }catch(Exception e){
                return  new ResponseDto("0" ,e.getMessage()).wrap();
            }
            
        }

        // 체커 마스터 상태업데이트
        @PostMapping(value = "/statuscheckmaster", consumes = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<ResponseDto> statusCheckMaster(@RequestBody Map<String, Object> params) {
            CheckHistMasterDTO checkHistMasterDTO = new CheckHistMasterDTO();
            checkHistMasterDTO.setIdx(params.get("idx")==null?0: parseInt(params.get("idx").toString()));
            checkHistMasterDTO.setStatus(params.get("status")==null?"":params.get("status").toString());                    
            checkHistMasterDTO.setContent(params.get("content")==null?"":params.get("content").toString());                    
//            checkHistMasterDTO.setInsUserId(params.get("insUserId")==null?"":params.get("insUserId").toString());     
            
           try{
                String cStatus = checkService.checkCStatus(checkHistMasterDTO);
                checkHistMasterDTO.setCStatus(cStatus);
                if(checkHistMasterDTO.getStatus().equals("0")) { // 점검완료인경우
                    if(!cStatus.equals("S")){ // 유효성 체커에서 실패한경우 점검중 상태 유지시키기
                        checkHistMasterDTO.setStatus("1"); 
                    }
                }
                int  tmp =     checkService.updateCheckHistMaster(checkHistMasterDTO);

                if(cStatus.equals("S")){ 
                    return  new ResponseDto("1" ,"변경에 성공 했습니다.").wrap();
                }else{ // 비정상 점검 푸시알람
                        return  new ResponseDto("0" ,"비정상 점검입니다. 유효점검을 하신후 다시 완료 부탁드립니다.").wrap();
                    // FcmTokenDTO fcmtoken = userService.getToken();
                    // NeonUtil.SendFcm(fcmtoken.getFcmToken(),"비정상 점검 알림 재점검요망", "SH대치1단지 101동 엘리베이터 1호기 비정상 점검입니다.재 점검요망");
                }   


            }catch(Exception e){
                return  new ResponseDto("0" ,e.getMessage()).wrap();
            }
            
        }        
    

    
    // 체커 디테일 입력
    @PostMapping(value = "/savecheckdetail", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDto> insertCheckDetail(@RequestBody Map<String, Object> params) {
           
        CheckHistMasterDTO checkHistMasterDTO = new CheckHistMasterDTO();
        checkHistMasterDTO.setIdx(Integer.parseInt(params.get("masterIdx").toString()));
        try{
        checkService.deleteCheckHistDetail(checkHistMasterDTO);
        }catch(Exception e){
            return  new ResponseDto("0" ,e.getMessage()).wrap();
        }
         if(params.get("detail") !=null ){
              
                  try{
                    List<CheckHistDetailDTO> details =   objectMapper.readValue(objectMapper.writeValueAsString(params.get("detail")), new TypeReference<List<CheckHistDetailDTO>>() {});
                    if(details.size() > 0){
                    checkService.saveCheckHistDetail(details);
                    checkService.saveCheckHistDetailEtc(checkHistMasterDTO);
                    }else{
                        checkService.saveCheckHistDetailEtc(checkHistMasterDTO);
                    }
                    return  new ResponseDto("1" ,"저장이 되었습니다.").wrap();
                }catch(Exception e){
                    return  new ResponseDto("0" ,e.getMessage()).wrap();
                }
         

         }else{
                try{
                  checkService.saveCheckHistDetailEtc(checkHistMasterDTO);
                  return  new ResponseDto("1" ,"저장이 되었습니다.").wrap();
                }catch(Exception e){
                    return  new ResponseDto("0" ,e.getMessage()).wrap();
                }
               // return  new ResponseDto("0" ,"파라미터에 오류가 있습니다.").wrap();
         }
        // checkHistMasterDTO.setElevatorNo(params.get("elevatorNo")==null?"":params.get("elevatorNo").toString());
        // checkHistMasterDTO.setGubun(params.get("gubun")==null?"":params.get("gubun").toString());                    
        // checkHistMasterDTO.setCtype(params.get("ctype")==null?"":params.get("ctype").toString());                    
        // checkHistMasterDTO.setStatus(params.get("status")==null?"":params.get("status").toString());                    
        // checkHistMasterDTO.setStatus(params.get("content")==null?"":params.get("content").toString());                    
        // checkHistMasterDTO.setInsUserId(params.get("insUserId")==null?"":params.get("insUserId").toString());                    
        
	}
    

    // 교환 저장
    @PostMapping(value = "/savechange", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseDto> insertChangeData(@ModelAttribute ElevChangeDao params) {
         
            log.info("param:",params.getFiles());
            try{
                elevService.saveChange(params);
                return  new ResponseDto("1" ,"저장이 되었습니다.").wrap();
            }catch(Exception e){
                return  new ResponseDto("0" ,e.getMessage()).wrap();
            }
	}

   // 고장처리 저장
   @PostMapping(value = "/savetrouble", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
   public ResponseEntity<ResponseDto> insertTrouble(@ModelAttribute ElevTroubleDao params) {
        
    //    ElevTroubleDTO elevChange= new ElevTroubleDTO();
    //    elevChange.setElevatorNo(params.get("elevatorNo").toString());
    //    elevChange.setTitle("title");
    //    elevChange.setContent(params.get("content").toString());
           try{
               elevService.saveTroubleShooting(params);
               return  new ResponseDto("1" ,"저장이 되었습니다.").wrap();
           }catch(Exception e){
               return  new ResponseDto("0" ,e.getMessage()).wrap();
           }
   }    
   @PostMapping(value = "/changelist", consumes = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<ResponseDto> selectChange(@RequestBody Map<String, Object> params) {

    ElevChangeDTO elevChangeDTO = new ElevChangeDTO();
    if(params.containsKey("elevatorNo"))    elevChangeDTO.setElevatorNo(params.get("elevatorNo").toString());
    if(params.containsKey("idx"))    elevChangeDTO.setIdx(parseInt(params.get("idx").toString()));
    if(params.containsKey("insUserId")){
            elevChangeDTO.setInsUserId(params.get("insUserId").toString());
        
      }
      if(params.containsKey("sdate"))    elevChangeDTO.setSdate(params.get("sdate").toString());
      if(params.containsKey("edate"))    elevChangeDTO.setEdate(params.get("edate").toString());
      


    PageHelper.startPage(params.get("page")==null?1:Integer.parseInt(params.get("page").toString()), params.get("pagesize")==null?10:Integer.parseInt(params.get("pagesize").toString()));
       try{
       PageInfo<ElevChangeDTO> list =    new PageInfo<>(elevService.listChange(elevChangeDTO));
       return  new ResponseDto("1" ,list,"조회에 성공 했습니다.").wrap();
       }catch(Exception e){
           return  new ResponseDto("0" ,e.getMessage()).wrap();
       }
   }

   @PostMapping(value = "/troublelist", consumes = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<ResponseDto> selectTrouble(@RequestBody Map<String, Object> params) {a
    
    ElevTroubleDTO elevTroubleDTO = new ElevTroubleDTO();
    if(params.containsKey("elevatorNo"))    elevTroubleDTO.setElevatorNo(params.get("elevatorNo").toString());
    if(params.containsKey("idx"))    elevTroubleDTO.setIdx(parseInt(params.get("idx").toString()));
    if(params.containsKey("insUserId"))    elevTroubleDTO.setInsUserId(params.get("insUserId").toString());
    if(params.containsKey("sdate"))    elevTroubleDTO.setSdate(params.get("sdate").toString());
    if(params.containsKey("edate"))    elevTroubleDTO.setEdate(params.get("edate").toString());

    PageHelper.startPage(params.get("page")==null?1:Integer.parseInt(params.get("page").toString()), params.get("pagesize")==null?10:Integer.parseInt(params.get("pagesize").toString()));
    try{
       PageInfo<ElevTroubleDTO> list =   new PageInfo<>(elevService.listTrouble(elevTroubleDTO));
    //   log.info("user:{}",fileUpload.getFileUrl(list.get(0).getFiles().get(0)));
       return  new ResponseDto("1" ,list,"조회에 성공 했습니다.").wrap();
       }catch(Exception e){
           return  new ResponseDto("0" ,e.getMessage()).wrap();
       }
   }


    // @PostMapping(value = "/savemaster", consumes = MediaType.APPLICATION_JSON_VALUE)
	// public ResponseEntity<ResponseDto> saveCheck(@RequestBody Map<String, Object> params) {

    //     ResponseDto responseDto = new ResponseDto();

    //     DateTimeFormatter ofPattern = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.KOREA);

    //     CheckHistMasterDTO checkmaster = new CheckHistMasterDTO();

	// 	String elev_code = params.containsKey("elev_code") ? params.get("elev_code").toString() : null;
	// 	String status = params.containsKey("status") ? params.get("status").toString() : null;

    //     checkmaster.setElev_code(elev_code);
    //     checkmaster.setStatus(status);
    //     try{
    //         checkService.saveCheckMater(checkmaster);
    //         responseDto.code = "1";
    //         responseDto.setMessage("저장성공");            
    //     }catch(Exception e){
    //         responseDto.setCode("0");
    //         responseDto.setMessage(e.getMessage());            
    //     }

    //     return responseDto.wrap();
        
	// }

        // 체커 마스터 상태업데이트
        @PostMapping(value = "/cstatuscheckmaster", consumes = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<ResponseDto> cstatusCheckMaster(@RequestBody Map<String, Object> params) {
            CheckHistMasterDTO checkHistMasterDTO = new CheckHistMasterDTO();
            checkHistMasterDTO.setIdx(params.get("idx")==null?0: parseInt(params.get("idx").toString()));
//            checkHistMasterDTO.setInsUserId(params.get("insUserId")==null?"":params.get("insUserId").toString());     
            
           try{
            String cStatus = checkService.checkCStatus(checkHistMasterDTO);
            if(cStatus.equals("S")){

            }else{

            }   
            return  new ResponseDto("1" ,cStatus,"변경에 성공 했습니다.").wrap();
            }catch(Exception e){
                return  new ResponseDto("0" ,e.getMessage()).wrap();
            }
            
        }        
    
        @PostMapping(value = "/sendalarm", consumes =  MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<ResponseDto> sendAlarm(@RequestBody Map<String, Object> params) {
            
            try{
                FcmTokenDTO fcmtoken = userService.getToken();
                NeonUtil.SendFcm(fcmtoken.getFcmToken(),"점검예정 알림","SH대치1단지 101동 2호기 6월1일 점검예정일입니다.");
                return  new ResponseDto("1",0,"조회가 완료되었습니다.").wrap();
            }catch(Exception e){
                return  new ResponseDto("0",e.getMessage().toString()).wrap();
            }
    
        }
}
