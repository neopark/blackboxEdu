import MDTypography from "../components/MDTypography";

function MyMDTypography(props: any) {
  const children = props.children || "";
  return <MDTypography {...props}>{children}</MDTypography>;
}

export default MyMDTypography;
