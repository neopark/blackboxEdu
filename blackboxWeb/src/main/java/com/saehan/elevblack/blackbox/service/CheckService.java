package com.saehan.elevblack.blackbox.service;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.Page;
import com.saehan.elevblack.blackbox.domain.CheckContactDataDTO;
import com.saehan.elevblack.blackbox.domain.CheckHistDetailDTO;
import com.saehan.elevblack.blackbox.domain.CheckHistDetailResult2DTO;
import com.saehan.elevblack.blackbox.domain.CheckHistDetailResultDTO;
import com.saehan.elevblack.blackbox.domain.CheckHistMasterDTO;
import com.saehan.elevblack.blackbox.domain.CheckPointDao;
import com.saehan.elevblack.blackbox.domain.ElevCheckListDTO;
import com.saehan.elevblack.blackbox.domain.ElevDTO;
import com.saehan.elevblack.blackbox.mapper.ElevMapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CheckService {
    
    @Autowired ElevMapper elevMapper;
    @Autowired private ObjectMapper objectMapper;
    
    private static final Logger logger = LogManager.getLogger();

    public CheckHistMasterDTO getHistMaster(int  idx){
      return elevMapper.selectCheckHistByID(idx);
    }

    public CheckHistMasterDTO getHistMasterById(int  idx){
      return elevMapper.selectCheckHistMasterById(idx);
    }

    public Page<CheckHistMasterDTO> getHistMasterAll(CheckHistMasterDTO param){
        return elevMapper.selectCheckHistMaster(param);
    }
    
    public List<ElevCheckListDTO> listCheckList(ElevCheckListDTO param){
        return elevMapper.selectCheckList(param);
    }

    public Page<CheckHistMasterDTO> listCheckHist(CheckHistMasterDTO param){
      return elevMapper.selectCheckHistMaster(param);

    }
    public Page<CheckHistMasterDTO> listCheckHist2(CheckHistMasterDTO param){

      try {
        logger.info("checkmaster:{}",objectMapper.writeValueAsString(param));
    } catch (JsonProcessingException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
    }       

      return elevMapper.selectCheckHistMasterDetail(param);

    }
    public List<CheckHistDetailDTO> listCheckHistDetail(CheckHistMasterDTO param){
      return elevMapper.selectCheckHistDetail(param);
    }


    public List<CheckHistDetailDTO> getHistMasterDetail2(Map param){
          return elevMapper.selectCheckDetailResult(param);
    }
    public Page<CheckHistMasterDTO> getHistMasterDetail(CheckHistMasterDTO param){
      return elevMapper.selectCheckHistMaster(param);
    }
    
    public CheckHistMasterDTO  saveCheckHistMaster(CheckHistMasterDTO param){

        try {
          logger.info("checkmaster:{}",objectMapper.writeValueAsString(param));
      } catch (JsonProcessingException e) {
          // TODO Auto-generated catch block
          e.printStackTrace();
      }       

      int cnt =    elevMapper.insertCheckHistMaster(param);
      int idx = param.getIdx();
      return param;
   }
   public int  updateCheckHistMaster(CheckHistMasterDTO param){

    return elevMapper.updateStatusCheckHistMaster(param);
 }

    public int  saveCheckHistDetail(CheckHistDetailDTO param){
      int cnt =    elevMapper.insertCheckHistDetail(param);
      return cnt;
   }
   
   @Transactional
    public void  saveCheckHistDetail(List<CheckHistDetailDTO> param){
        for(CheckHistDetailDTO item : param){
          elevMapper.insertCheckHistDetail(item);
        }
        
   }

   @Transactional
    public void  saveCheckHistDetail(List<CheckHistDetailDTO> param ,int idx){
        for(CheckHistDetailDTO item : param){
          item.setMasterIdx(idx);
          elevMapper.insertCheckHistDetail(item);
        }
   }

   @Transactional
   public void  saveCheckHistDetailEtc(CheckHistMasterDTO param){
            elevMapper.insertCheckHistDetailEtc(param);
   }

   public void deleteCheckHistDetail(CheckHistMasterDTO param){
          elevMapper.deleteCheckHistDetail(param);
   }

   public int checkingCount(ElevDTO elev){
    return elevMapper.checkingCount(elev);
 }
  public int checkingCountS(ElevDTO elev){
    return elevMapper.checkingCountS(elev);
  }
  public int checkingCountF(ElevDTO elev){
    return elevMapper.checkingCountF(elev);
  }

   public List<CheckHistMasterDTO> checkingList(CheckHistMasterDTO elev){
     return elevMapper.checkingElevList(elev);

   }

   public List<CheckContactDataDTO> checkingContactList(CheckPointDao params)
   {
     return elevMapper.checkingContactList(params);
    }

    public String checkCStatus(CheckHistMasterDTO params){
      return elevMapper.selectCStatus(params);
    }
    // public List<CheckHistMasterDTO> listCheckMaster(CheckHistMasterDTO cmaster){
    //     return elevMapper.selectCheckMasterList(cmaster);
    // }
    // public List<CheckHistDetailDTO> listCheckMaster(CheckHistDetailDTO cmaster){
    //     return elevMapper.selectCheckList(cmaster);
    // }

    // public boolean saveCheckMater(CheckHistMasterDTO cmaster){
    //     elevMapper.insertCheckMaster(cmaster);
    //     return true;
    // }

    // public void insertCheckMaster(CheckHistDetailDTO cdata){
    //     elevMapper.insertCheck(cdata);
    // }

}
