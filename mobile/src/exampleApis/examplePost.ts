import { exampleSendApi } from ".";

export type T_examplePost = {
  id: number;
  body: string;
  title: string;
  userId: number;
};

export type T_examplePostGetData = {
  page: number;
  cnt?: number;
};

async function get(data: T_examplePostGetData) {
  const response = await exampleSendApi({
    method: "get",
    url: "/posts",
  });
  const cnt = data.cnt || 20;
  const totalCnt = 100;
  const postList: T_examplePost[] = [];
  for (let idx = (data.page - 1) * cnt; idx < data.page * cnt; idx++) {
    postList.push(response.data[idx]);
  }
  const result = {
    postList,
    curPage: data.page,
    totalPage: totalCnt / cnt,
  };
  return result;
}

const examplePost = {
  get,
};

export default examplePost;
