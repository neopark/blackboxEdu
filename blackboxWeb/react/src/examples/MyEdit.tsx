import { Card, Grid } from "@mui/material";
import MyMDBox from "../components/MyMDBox";
import MyMDTypography from "../components/MyMDTypography";

type T_MyEditProps = {
  header: {
    title: string;
    rightComponent?: JSX.Element;
  };
  children: JSX.Element[];
};

function MyEdit({ header, children }: T_MyEditProps) {
  return (
    <>
      <MyMDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={6}>
            <Card>
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
              <MyMDBox p={5}>{children}</MyMDBox>
            </Card>
          </Grid>
        </Grid>
      </MyMDBox>
    </>
  );
}

export default MyEdit;
