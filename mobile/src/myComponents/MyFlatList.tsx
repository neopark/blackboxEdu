import React, { useEffect, useState } from "react";
import { FlatList, FlatListProps } from "react-native";
import MyRefreshControl from "./MyRefreshControl";

export interface MyFlatListType extends FlatList {}

export interface T_MyFlatListProps extends FlatListProps<any> {
  onInit?: () => void;
  onRefresh?: () => void;
}

const MyFlatList = React.forwardRef<MyFlatListType, T_MyFlatListProps>((props, ref) => {
  const { onInit } = props;
  const onPropsRefresh = props.onRefresh;
  const [isInit, setIsInit] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
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
    <FlatList
      {...props}
      ref={ref}
      onRefresh={undefined}
      onEndReached={async (evt) => {
        if (!isRefresh && !isScroll && props.onEndReached) {
          setIsScroll(true);
          await props.onEndReached(evt);
          setIsScroll(false);
        }
      }}
      onEndReachedThreshold={props.onEndReachedThreshold || 0.5}
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

export default MyFlatList;
