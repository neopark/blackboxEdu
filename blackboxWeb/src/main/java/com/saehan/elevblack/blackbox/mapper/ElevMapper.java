package com.saehan.elevblack.blackbox.mapper;

import java.util.List;
import java.util.Map;

import com.github.pagehelper.Page;
import com.saehan.elevblack.blackbox.domain.CheckContactDataDTO;
import com.saehan.elevblack.blackbox.domain.CheckHistDetailDTO;
import com.saehan.elevblack.blackbox.domain.CheckHistDetailResult2DTO;
import com.saehan.elevblack.blackbox.domain.CheckHistDetailResultDTO;
import com.saehan.elevblack.blackbox.domain.CheckHistMasterDTO;
import com.saehan.elevblack.blackbox.domain.CheckPointDao;
import com.saehan.elevblack.blackbox.domain.ElevChangeDTO;
import com.saehan.elevblack.blackbox.domain.ElevCheckListDTO;
import com.saehan.elevblack.blackbox.domain.ElevContactDataDTO;
import com.saehan.elevblack.blackbox.domain.ElevDTO;
import com.saehan.elevblack.blackbox.domain.ElevHistDTO;
import com.saehan.elevblack.blackbox.domain.ElevTroubleDTO;
import com.saehan.elevblack.blackbox.domain.UserDTO;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper()
@Repository
public interface ElevMapper {
    
//    public List<ActressDTO> selectActList(ActressDTO act);
    // 엘리베이터 관련정보
    List<ElevDTO> selectElevList(ElevDTO param);
    ElevDTO selectElev(ElevDTO param);
    int insertElev(ElevDTO param);

    // 점검관련 
    List<ElevCheckListDTO> selectCheckList(ElevCheckListDTO param);

    CheckHistMasterDTO selectCheckHistByID(int idx);
    CheckHistMasterDTO selectCheckHistMasterById(int idx);
    Page<CheckHistMasterDTO> selectCheckHistMaster(CheckHistMasterDTO param);
    List<CheckHistDetailDTO> selectCheckDetailResult(Map param);
    Page<CheckHistMasterDTO> selectCheckHistMasterDetail(CheckHistMasterDTO param);
    List<CheckHistDetailDTO> selectCheckHistDetail(CheckHistMasterDTO param);
    int insertCheckHistMaster(CheckHistMasterDTO param);
    int insertCheckHistDetail(CheckHistDetailDTO param);
    int insertCheckHistDetailEtc(CheckHistMasterDTO param);
    int updateStatusCheckHistMaster(CheckHistMasterDTO param);

    int deleteCheckHistDetail(CheckHistMasterDTO param);

    int insertTroubleShooting(ElevTroubleDTO param);
    int insertChange(ElevChangeDTO param);

    Page<ElevChangeDTO> selectChangeList(ElevChangeDTO param);
    Page<ElevTroubleDTO> selectTroubleList(ElevTroubleDTO param);

    int insertContactData(ElevContactDataDTO param);
    int insertContactDataList(List<ElevContactDataDTO> param);


    int checkingCount(ElevDTO param);
    int checkingCountS(ElevDTO param);
    int checkingCountF(ElevDTO param);
    List<CheckHistMasterDTO> checkingElevList (CheckHistMasterDTO param);

    List<CheckContactDataDTO> checkingContactList(CheckPointDao param);

    String selectCStatus(CheckHistMasterDTO param);
    int deleteCheckHistMaster(CheckHistMasterDTO param);
    // Page<ElevDTO> selectElevListPage();
    // List<CheckHistDetailDTO> selectCheckList(CheckHistDetailDTO param);
    // List<CheckHistMasterDTO> selectCheckMasterList(CheckHistMasterDTO param);
    // List<ElevHistDTO> selectElevHistList(ElevHistDTO param);
    // void insertElevHist(ElevHistDTO param);
    // void insertCheckMaster(CheckHistMasterDTO param);
    // void insertCheck(CheckHistDetailDTO param);
    // List<UserDTO> selectUserList();
    // List<UserDTO> selectUserBtyID(UserDTO param);
    //    List<SiteDTO> selectSiteList(int id);
}
