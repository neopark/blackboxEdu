import React, { useEffect, useState } from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import MyRefreshControl from "./MyRefreshControl";

export interface MyScrollViewType extends ScrollView {}

export interface T_MyScrollViewProps extends ScrollViewProps {
  onInit?: () => void;
  onRefresh?: () => void;
}

const MyScrollView = React.forwardRef<MyScrollViewType, T_MyScrollViewProps>((props, ref) => {
  const { onInit } = props;
  const onPropsRefresh = props.onRefresh;
  const [isInit, setIsInit] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isRefreshEnable, setIsRefreshEnable] = useState(false);

  useEffect(() => {
    if (!isInit) {
      const init = async () => {
        setIsInit(true);
        if (onInit) {
          await onInit();
        }
        setIsRefreshEnable(true);
      };
      init();
    }
  }, [isInit, onInit]);

  return (
    <ScrollView
      {...props}
      ref={ref}
      scrollEventThrottle={props.scrollEventThrottle || 16}
      refreshControl={
        onPropsRefresh && (
          <MyRefreshControl
            enabled={isRefreshEnable}
            refreshing={isRefresh}
            onRefresh={async () => {
              setIsRefresh(true);
              if (onPropsRefresh) {
                await onPropsRefresh();
              }
              setIsRefresh(false);
            }}
          />
        )
      }
    />
  );
});

export default MyScrollView;
