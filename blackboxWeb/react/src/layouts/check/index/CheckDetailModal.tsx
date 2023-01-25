/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

==========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import MyMDBox from "../../../components/MyMDBox";
import MyMDTypography from "../../../components/MyMDTypography";
import MyIcon from "../../../components/MyIcon";
import MyModal from "../../../components/MyModal";
import formats from "../../../modules/formats";
import { T_check, T_checkDetail,T_checkinfo } from "../../../apis/check";
import { useCallback, useEffect, useState } from "react";
import apis from "../../../apis";

type T_CheckDetailModalProps = {
  detailModalTarget: T_check | null;
  setDetailModalTarget: (detailModalTarget: T_check | null) => void;
};

function CheckDetailModal({ detailModalTarget, setDetailModalTarget }: T_CheckDetailModalProps) {
  const [checkDetailList, setCheckDetailList] = useState<T_checkinfo | null>(null);

  const getCheckDetailList = useCallback(async () => {
    if (detailModalTarget) {
      try {
        const result = await apis.check.getDetailList2({
          masterIdx: detailModalTarget.idx,
        });
        if (result.isSuccess) {
          console.log(result)
          setCheckDetailList(result.masterInfo);
        } else {
          setCheckDetailList(null);
        }
      } catch (err: any) {
        setCheckDetailList(null);
        console.log(err.message);
      }
    }
  }, [detailModalTarget]);

  useEffect(() => {
    if (detailModalTarget) {
      getCheckDetailList();
      return () => {
        setCheckDetailList(null);
      };
    }
  }, [detailModalTarget, getCheckDetailList]);

  return (
    <MyModal
      isVisible={!!detailModalTarget}
      setIsVisible={() => {
        setDetailModalTarget(null);
      }}
      style={{
        width: 1000,
        maxWidth: window.innerWidth - 100,
        height: window.innerHeight - 100,
      }}
    >
      <>
        {detailModalTarget && !!checkDetailList && (
          <>
            <MyMDBox pt={5} pb={5}>
              <MyMDTypography ml={5} variant="h5">
                엘리베이터 점검 결과
              </MyMDTypography>
              <MyMDBox pt={1} pl={5} pr={5}>
                <MyMDBox
                  pr={1}
                  pt={4}
                  pb={2}
                  sx={{
                    height: window.innerHeight - 200,
                    overflowY: "scroll",
                  }}
                >
                  <MyMDTypography variant="h6">기본 정보</MyMDTypography>
                  <table
                    className="myTable"
                    style={{
                      marginTop: 5,
                      tableLayout: "fixed",
                    }}
                  >
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            건물 정보
                          </MyMDTypography>
                        </td>
                        <td colSpan={3}>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {checkDetailList.elevinfo?.buldNm} /  {checkDetailList.elevinfo?.address1}
                          </MyMDTypography>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            승강기 고유번호
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {detailModalTarget.elevatorNo}
                          </MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            호기
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            1(1-1)
                          </MyMDTypography>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            승강기 종류
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            장애인용
                          </MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            승강기 모델
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            XX-VPM(422)
                          </MyMDTypography>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            점검일시
                          </MyMDTypography>
                        </td>
                        <td colSpan={3}>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {formats.date(checkDetailList.insDate, "yyyy.mm.dd  ktt hh:MM")}
                          </MyMDTypography>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            점검자
                          </MyMDTypography>
                        </td>
                        <td colSpan={3}>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {checkDetailList.userinfo?.bizName} /{" "}
                            {checkDetailList.userinfo?.userNm} / {checkDetailList.userinfo?.hp}
                          </MyMDTypography>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            관리주체
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium"></MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            관리주체 확인일시
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium"></MyMDTypography>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <MyMDBox
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    mt={5}
                  >
                    <MyMDTypography variant="h6">점검 항목별 점검 결과</MyMDTypography>
                    <MyMDBox
                      sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      <MyMDTypography color="text" variant="caption" fontWeight="regular">
                        * 점검결과: A-양호, B-주의관찰, C-긴급수리, 제외-점검주기 아님
                      </MyMDTypography>
                    </MyMDBox>
                  </MyMDBox>
                  {checkDetailList.details.length ? (
                    <table
                      className="myTable"
                      style={{
                        marginTop: 5,
                      }}
                    >
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              backgroundColor: "#eeeeee",
                              paddingLeft: 0,
                            }}
                            align="center"
                          >
                            <MyMDTypography color="text" variant="caption" fontWeight="regular">
                              점검항목
                            </MyMDTypography>
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              backgroundColor: "#eeeeee",
                            }}
                          >
                            <MyMDTypography color="text" variant="caption" fontWeight="regular">
                              점검내용
                            </MyMDTypography>
                          </td>
                          <td
                            style={{
                              backgroundColor: "#eeeeee",
                              paddingLeft: 0,
                            }}
                            align="center"
                          >
                            <MyMDTypography color="text" variant="caption" fontWeight="regular">
                              점검결과
                            </MyMDTypography>
                          </td>
                        </tr>
                        {(() => {
                          let codeName = "";
                          let ndx = 0;
                          return checkDetailList.details.map((checkDetail, idx) => {
                            let masterName = "";
                            const checkDetailData = checkDetail.checkList;
                            if (!checkDetailData.masterCode) {
                              masterName = checkDetailData.codeContent;
                              let jdx = idx + 1;
                              while (jdx < checkDetailList.details.length) {
                                const tempCheckDetailData = checkDetailList.details[jdx].checkList;
                                if (!tempCheckDetailData.masterCode) {
                                  break;
                                }
                                jdx++;
                              }
                              return (
                                <tr key={checkDetailData.idx}>
                                  <td align="center" rowSpan={jdx - idx}>
                                    <MyMDTypography variant="caption" fontWeight="regular">
                                      {masterName}
                                    </MyMDTypography>
                                  </td>
                                </tr>
                              );
                            } else {
                              return (
                                <tr key={checkDetailData.idx}>
                                  {(() => {
                                    if (
                                      checkDetailData.codeName &&
                                      codeName !== checkDetailData.codeName
                                    ) {
                                      ndx = idx + 1;
                                      codeName = checkDetailData.codeName;
                                      while (ndx < checkDetailList.details.length) {
                                        const tempCheckDetailData = checkDetailList.details[ndx].checkList;
                                        if (!tempCheckDetailData.codeName) {
                                          break;
                                        }
                                        ndx++;
                                      }
                                      return (
                                        <>
                                          <td
                                            style={{
                                              paddingLeft: 0,
                                            }}
                                            align="center"
                                            rowSpan={ndx - idx}
                                          >
                                            <MyMDTypography variant="caption" fontWeight="regular">
                                              {codeName}
                                            </MyMDTypography>
                                          </td>
                                          <td>
                                            <MyMDTypography variant="caption" fontWeight="regular">
                                              {checkDetailData.codeContent}
                                            </MyMDTypography>
                                          </td>
                                        </>
                                      );
                                    } else {
                                      return (
                                        <td colSpan={ndx <= idx ? 2 : undefined}>
                                          <MyMDTypography variant="caption" fontWeight="regular">
                                            {checkDetailData.codeContent}
                                          </MyMDTypography>
                                        </td>
                                      );
                                    }
                                  })()}
                                  <td
                                    style={{
                                      paddingLeft: 0,
                                    }}
                                    align="center"
                                  >
                                    {(() => {
                                      let color = undefined;
                                      if (checkDetail.result === "B") {
                                        color = "#ff9900";
                                      } else if (checkDetail.result === "C") {
                                        color = "#f00f00";
                                      }

                                      return (
                                        <MyMDTypography
                                          variant="caption"
                                          fontWeight="medium"
                                          sx={{
                                            color,
                                          }}
                                        >
                                          {checkDetail.result}
                                        </MyMDTypography>
                                      );
                                    })()}
                                  </td>
                                </tr>
                              );
                            }
                          });
                        })()}
                      </tbody>
                    </table>
                  ) : (
                    <MyMDTypography variant="caption" fontWeight="regular">
                      점검 결과가 존재하지 않습니다.
                    </MyMDTypography>
                  )}
                </MyMDBox>
              </MyMDBox>
            </MyMDBox>
            <MyMDBox
              p={1}
              onClick={() => {
                setDetailModalTarget(null);
              }}
              sx={{
                position: "absolute",
                cursor: "pointer",
                top: 30,
                right: 30,
              }}
            >
              <MyIcon name="AiOutlineClose" />
            </MyMDBox>
          </>
        )}
      </>
    </MyModal>
  );
}

export default CheckDetailModal;
