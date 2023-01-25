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
import MyMDTypography from "../../components/MyMDTypography";
import MyIcon from "../../components/MyIcon";
import MyModal from "../../components/MyModal";
import formats from "../../modules/formats";
import { T_check, T_checkDetail,T_checkinfo } from "../../apis/check";
import { useCallback, useEffect, useState } from "react";
import apis,{T_image} from "../../apis";
import SimpleImageSlider from "react-simple-image-slider";

type T_ImageModalProps = {
  imageModalTarget: string[] | null;
  setImageModalTarget: (imageModalTarget: string[] | null) => void;
};

function ImageModal({ imageModalTarget, setImageModalTarget }: T_ImageModalProps) {

  const [images,setImages] = useState<string[]|null>(null);
  useEffect(() => {
      console.log("images:",imageModalTarget);
  }, [imageModalTarget]);
  // const getItem = useCallback((images: string[]) => {
  //   console.log(images);
  //   return (
  
  //   );
  // }, [imageModalTarget]);


  return (
    <MyModal
      isVisible={!!imageModalTarget}
      setIsVisible={() => {
        setImageModalTarget(null);
        setImages(null);

      }}
      style={{
        width: 1000,
        maxWidth: window.innerWidth - 100,
        height: window.innerHeight - 100,
      }}
    >
      <>
        {imageModalTarget && (
          <>
            <MyMDBox pt={5} pb={5}>
              <MyMDTypography ml={5} variant="h5">
                이미지
              </MyMDTypography>
              <MyMDBox pt={1} pl={5} pr={5} >
                <MyMDBox
                  pt={2}
                  pb={2}
                >
              {imageModalTarget &&
              (
                <SimpleImageSlider
                width={926}
                height={624}
                images={imageModalTarget}
                showBullets={true}
                showNavs={true}
                onCompleteSlide={()=>{
                  console.log("onCom")
                }}
                />
              )
              }     
            
                </MyMDBox>
              </MyMDBox>
            </MyMDBox>
            <MyMDBox
              p={1}
              onClick={() => {
                setImageModalTarget(null);
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

export default ImageModal;
