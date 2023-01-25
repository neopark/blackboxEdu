import React, { useCallback, useState } from "react";
import exampleApis from "../exampleApis";
import MyFlatList from "../myComponents/MyFlatList";
import MyHeader from "../myTemplates/MyHeader";
import MyStatusBar from "../myComponents/MyStatusBar";
import MyText from "../myComponents/MyText";
import MyView from "../myComponents/MyView";
import { GS } from "../styles/sizes";
import values from "../values";
import { T_examplePost } from "../exampleApis/examplePost";
import { useToast } from "../contexts/toast";
import { initialLoading, useLoading } from "../contexts/loading";
import MyLayout from "../myTemplates/MyLayout";

type T_state = {
  postList: T_examplePost[] | null;
  curPage: number | null;
  totalPage: number | null;
};

const initialState: T_state = {
  postList: null,
  curPage: null,
  totalPage: null,
};

function ExampleListLayout() {
  const { setToast } = useToast();
  const { setLoading } = useLoading();
  const [state, setState] = useState(initialState);

  const getData = useCallback(
    async (data: { page: number }) => {
      try {
        const result = await exampleApis.post.get(data);
        let newPostList = data.page !== 1 && state.postList ? [...state.postList] : [];
        setState({
          ...result,
          postList: newPostList.concat(result.postList),
        });
      } catch (err: any) {
        setToast({
          msg: err.message,
        });
      }
    },
    [setToast, state]
  );

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader title="List" leftComponentName="back" />
      <MyFlatList
        contentContainerStyle={{
          paddingBottom: values.device.bottomSpaceHeight,
        }}
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
        }}
        onInit={async () => {
          setLoading("onInit");
          await getData({
            page: 1,
          });
          setLoading(initialLoading);
        }}
        onRefresh={async () => {
          setState(initialState);
          await getData({
            page: 1,
          });
        }}
        onEndReached={async () => {
          if (state.curPage && state.totalPage) {
            const page = state.curPage + 1;
            if (page <= state.totalPage) {
              setLoading("onEndReached");
              await getData({
                page,
              });
              setLoading(initialLoading);
            }
          }
        }}
        data={state.postList}
        renderItem={(itemProps) => {
          const post: T_examplePost = itemProps.item;

          return (
            <MyView
              style={{
                borderBottomWidth: GS(1),
                padding: GS(20),
              }}
            >
              <MyText
                style={{
                  fontSize: GS(15),
                }}
                font="nsm"
              >
                {post.title}
              </MyText>
              <MyText
                style={{
                  marginTop: GS(5),
                  color: "#444444",
                  fontSize: GS(12),
                }}
              >
                {post.body}
              </MyText>
            </MyView>
          );
        }}
        ListHeaderComponent={() => {
          if (!state.postList) {
            return <></>;
          } else {
            return (
              <MyView
                style={{
                  borderBottomWidth: GS(1),
                }}
              >
                <MyText
                  font="nsb"
                  style={{
                    margin: GS(20),
                    fontSize: GS(24),
                    color: values.colors.blue,
                  }}
                >
                  Posts
                </MyText>
              </MyView>
            );
          }
        }}
        ListFooterComponent={() => {
          const { postList, curPage, totalPage } = state;
          if (!postList || !curPage || !totalPage || curPage !== totalPage) {
            return <></>;
          } else {
            return (
              <MyView
                style={{
                  borderBottomWidth: GS(1),
                }}
              >
                <MyText
                  font="nsm"
                  style={{
                    padding: GS(20),
                    fontSize: GS(12),
                  }}
                >
                  You can sponsor this project (and others) on GitHub Coded and maintained with ❤️
                  by typicode © 2021
                </MyText>
              </MyView>
            );
          }
        }}
      />
    </MyLayout>
  );
}

export default ExampleListLayout;
