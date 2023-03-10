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

import MyMDBox from "../../components/MyMDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import { useCallback, useEffect, useState } from "react";
import MyMDTypography from "../../components/MyMDTypography";
import MyTable from "../../examples/MyTable";
import { Navigate } from "react-router-dom";
import useNav from "../../uses/useNav";
import { T_troubleshooting } from "../../apis/troubleshooting";
import apis from "../../apis";
import formats from "../../modules/formats";
import MyIcon from "../../components/MyIcon";
import MyMDInput from "../../components/MyMDInput";
import MyMDButton from "../../components/MyMDButton";
import { useUser } from "../../contexts/user";
import ImageModal from "../imageModal/ImageModal";


function TroubleshootingIndexLayout() {
  const nav = useNav();
  const { user } = useUser();
  const isNavReplace = !nav.search;
  const pagesize = 10;
  const page = nav.params.page;
  const [totalPage, setTotalPage] = useState<null | number>(null);

  const today = new Date();
  const preMonth = today.setMonth(today.getMonth()-1);
  const [sdate, setSdate] = useState(nav.params.date || formats.date(new Date(preMonth), "yyyy-mm-dd"));
  const [edate, setEdate] = useState(nav.params.date || formats.date(new Date(), "yyyy-mm-dd"));
  
  const [troubleshootingList, setTroubleshootingList] = useState<T_troubleshooting[] | null>(null);

  const [imageModalTarget, setImageModalTarget] = useState<string[] | null>(null);

  // const onWindowOpen = (link : string) =>{
  //   const link2 = link==null?"":'http://221.143.48.220:2021/upload-test/'+link;
  //   window.open(link2,'_blank');
  // }


  const getTroubleshootingList = useCallback(async () => {
    try {
      const result = await apis.troubleshooting.getList({
        pagesize,
        page: Number(page),
        sdate:sdate,
        edate:edate,
      });
      console.log(result);
      if (result.isSuccess) {
        setTotalPage(result.totalPage);
        setTroubleshootingList(result.troubleshootingList);
      } else {
        setTroubleshootingList([]);
        console.log(result.msg);
      }
    } catch (err: any) {
      setTroubleshootingList([]);
      console.log(err.message);
    }
  }, [page,sdate,edate]);

  useEffect(() => {
    const init = async () => {
      await getTroubleshootingList();
    };
    init();
  }, [getTroubleshootingList, page]);

  if (!user) {
    return <Navigate to="/signin" />;
  } else if (isNavReplace) {
    return <Navigate replace to={`/troubleshooting?page=1`} />;
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        {troubleshootingList && (
          <>
            <MyTable
              totalPage={totalPage}
              pagesize={pagesize}
              header={{
                title: "?????? ??????",
              }}
              filter={
                <>
                                  <MyMDInput
                    type="date"
                    value={sdate}
                    onChange={(evt: any) => {
                      setSdate(evt.target.value);
                    }}
                  />&nbsp;-&nbsp;<MyMDInput
                  type="date"
                  value={edate}
                  onChange={(evt: any) => {
                    setEdate(evt.target.value);
                  }}
                />

                  <MyMDBox
                    display="flex"
                    sx={{
                      flex: 1,
                      justifyContent: "flex-end",
                    }}
                  >
                    <MyMDButton
                      component="a"
                      rel="noreferrer"
                      variant="gradient"
                      color="light"
                      href="#"
                      onClick={(evt: any) => {
                        evt.preventDefault();
                      }}
                    >
                      ??????
                    </MyMDButton>
                  </MyMDBox>
                </>
              }
              table={(() => {
                type column = "no" | "????????????" | "???????????????" | "?????????"| "??????" | "??????" ;
                type low = {
                  [name in column]: JSX.Element;
                };
                const columnList: column[] = [
                  "no",
                  "????????????",
              //    "??????",
                  "???????????????",
                  "?????????",
                  "??????",
                  "??????",
                ];

                return {
                  columns: columnList.map((column) => {
                    let width = "";
                    switch (column) {
                      case "no": {
                        width = "5%";
                        break;
                      }
                      case "????????????": {
                        width = "12%";
                        break;
                      }
                      // case "??????": {
                      //   width = "12%";
                      //   break;
                      // }
                      case "???????????????": {
                        width = "12%";
                        break;
                      }
                      case "?????????": {
                        width = "12%";
                        break;
                      }
                      case "??????": {
                        width = "12%";
                        break;
                      }
                      case "??????": {
                        width = "35%";
                        break;
                      }
                    }

                    return {
                      Header: column,
                      accessor: column,
                      width,
                    };
                  }),
                  rows: troubleshootingList.map((troubleshooting, idx) => {
                    const row: low = {
                      no: (
                        <MyMDTypography
                          display="block"
                          variant="caption"
                          color="text"
                          fontWeight="regular"
                        >
                          {troubleshootingList.length - idx}
                        </MyMDTypography>
                      ),
                      ["????????????"]: (
                        <MyMDTypography
                          display="block"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {formats.date(troubleshooting.insDate, "yyyy.mm.dd  ktt hh:MM")}
                        </MyMDTypography>
                      ),
                      // ["??????"]: (
                      //   <MyMDTypography
                      //     onClick={(evt: any) => {
                      //       evt.preventDefault();
                      //       nav.push(`/group/0`);
                      //     }}
                      //     href="#"
                      //     display="block"
                      //     component="a"
                      //     variant="caption"
                      //     fontWeight="medium"
                      //   >
                      //     {/* SH????????????2-6?????? */}
                      //   </MyMDTypography>
                      // ),
                      ["???????????????"]: (
                        <MyMDBox
                          onClick={(evt: any) => {
                            evt.preventDefault();
                            nav.push(`/elevator/${troubleshooting.elevatorNo}`);
                          }}
                          href="#"
                          component="a"
                          alignItems="center"
                        >
                          <MyMDTypography
                            display="block"
                            variant="caption"
                            fontWeight="medium"
                            mb={1}
                          >
                            {/* 602??? 1?????? */}
                          </MyMDTypography>
                          <MyMDTypography
                            display="block"
                            variant="caption"
                            fontWeight="regular"
                            color="text"
                          >
                            {troubleshooting.elevinfo?.buldNm}
                          </MyMDTypography>
                        </MyMDBox>
                      ),
                      ["?????????"]: (
                        <MyMDBox
                          onClick={(evt: any) => {
                            evt.preventDefault();
                            nav.push(`/user/kakao_neopark77@naver.com`);
                          }}
                          href="#"
                          component="a"
                          alignItems="center"
                        >
                          <MyMDTypography
                            display="block"
                            variant="caption"
                            fontWeight="medium"
                            mb={1}
                          >
                            { troubleshooting.userinfo.userNm}
                          </MyMDTypography>
                          <MyMDTypography
                            display="block"
                            variant="caption"
                            fontWeight="regular"
                            color="text"
                          >
                            {/* 010-3333-2222 */}
                          </MyMDTypography>
                        </MyMDBox>
                      ),
                      ["??????"]: (
                        <MyMDTypography display="block" variant="caption" fontWeight="medium">
                          {troubleshooting.content}
                        </MyMDTypography>
                      ),
                      ["??????"]: (
                        <>
                          {!!troubleshooting.files?.length && (
                                troubleshooting.files.map((file1,idx)=>{
                                  return(  
                                  <MyMDBox
                                  component="a"
                                  alignItems="center"
                                  p={1}
                                  href="#"
                                  key={idx}
                                  onClick={ () =>{
                                    const images :string[]=[];
                                    troubleshooting.files?.map((value,idx)=>{
                                           images.push("http://221.143.48.220:2021/upload-test/"+value.fileUrl);
                                    }) 
   
                                   setImageModalTarget(images);
                                  //     onWindowOpen(file1.fileUrl)
                                   }
                                  }
                                 //   evt.preventDefault();
                                 
                                >
                                  <MyIcon name="BsImageFill"  />
                                 </MyMDBox>
                                  )
                                }
                                )
                          )}
                        </>
                      ),
                    };
                    return row;
                  }),
                };
              })()}
            />
            <Footer />
          </>
        )}

    <ImageModal
      imageModalTarget={imageModalTarget}
      setImageModalTarget={setImageModalTarget}
      />

      </DashboardLayout>
    );
  }
}

export default TroubleshootingIndexLayout;
