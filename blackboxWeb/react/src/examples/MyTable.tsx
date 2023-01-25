import { Card, Grid } from "@mui/material";
import DataTable from "../examples/Tables/DataTable";
import MyMDBox from "../components/MyMDBox";
import MyMDTypography from "../components/MyMDTypography";
import MyMDPagination from "../components/MyMDPagination";
import MyIcon from "../components/MyIcon";
import useNav from "../uses/useNav";

type column = {
  Header: string;
  accessor: string;
  width?: string | undefined;
  align?: string | undefined;
};

type T_row = {
  [name: string]: JSX.Element;
};

type T_MyTableProps = {
  pageMargin?: number;
  totalPage?: number | null;
  pagesize?: number;
  header?: {
    title?: string;
    rightComponent?: JSX.Element;
  };
  table: {
    columns: column[];
    rows: T_row[];
  };
  filter?: JSX.Element;
};

function MyTable({ pageMargin, pagesize, totalPage, header, table, filter }: T_MyTableProps) {
  const nav = useNav();
  const selPage = nav.params.page ? Number(nav.params.page) : null;
  const pageButtons = [];
  if (selPage && totalPage) {
    let jdx = 0;
    for (let i = Math.floor((selPage - 1) / 5) * 5 + 1; i <= Number(totalPage); i++) {
      if (jdx > 4) {
        break;
      }
      pageButtons.push(i);
      jdx++;
    }
  }


  return (
    <>
      <MyMDBox pt={header ? 6 : 0} pb={header ? 3 : 0}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              {header && (
                <MyMDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  sx={{
                    position: "relative",
                  }}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MyMDTypography variant="h6" color="white" ml={2}>
                    {header.title}
                  </MyMDTypography>
                  <MyMDBox
                    sx={{
                      position: "absolute",
                      right: 70,
                      top: 13,
                    }}
                    mt="auto"
                  >
                    {header.rightComponent}
                  </MyMDBox>
                </MyMDBox>
              )}
              {filter && (
                <MyMDBox
                  pt={4}
                  px={5}
                  display="flex"
                  sx={{
                    flexDirection: "row",
                  }}
                >
                  {filter}
                </MyMDBox>
              )}
              <MyMDBox pt={header ? 3 : 0}>
                <DataTable
                  showTotalEntries={false}
                  table={table}
                  isSorted={false}
                  entriesPerPage={{
                    defaultValue: pagesize,
                    // entries: [],
                  }}
                  pageProps={
                    <>
                      {pageButtons.length !== 0 ? (
                        <MyMDBox m={3}>
                          <MyMDPagination variant={"gradient"} color={"info"} >
                            <MyMDPagination
                              item
                              onClick={() => {
                                if (Number(selPage) > 1) {
                                  nav.push(
                                    nav.pathname + "?page=" + String(Number(nav.params.page) - 1)
                                  );
                                }
                                // previousPage()
                              }}
                            >
                              <MyIcon name="AiOutlineLeft" />
                            </MyMDPagination>
                            {pageButtons.map((page) => {
                              return (
                                <MyMDPagination
                                  item
                                  key={page}
                                  onClick={() => {
                                    nav.push(nav.pathname + "?page=" + page);
                                  }}
                                  active={page === selPage}
                                >
                                  {page}
                                </MyMDPagination>
                              );
                            })}
                            {selPage !== totalPage && (
                              <MyMDPagination
                                item
                                onClick={() => {
                                  if (Number(selPage) < Number(totalPage)) {
                                    nav.push(
                                      nav.pathname + "?page=" + String(Number(nav.params.page) + 1)
                                    );
                                  }
                                }}
                              >
                                <MyIcon name="AiOutlineRight" />
                              </MyMDPagination>
                            )}
                          </MyMDPagination>
                        </MyMDBox>
                      ) : (
                        <></>
                      )}
                    </>
                  }
                />
              </MyMDBox>
            </Card>
          </Grid>
        </Grid>
      </MyMDBox>
    </>
  );
}

export default MyTable;
