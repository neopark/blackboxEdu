import { sendApi } from ".";

export type T_check = {
  idx: number;
  code: string;
  codeContent: string;
};

export type T_checkGetData = {};

export type T_checkGetResult = {
  msg: string;
  isSuccess: boolean;
  checkList: T_check[];
};

async function get(data?: T_checkGetData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/checklist",
    data: {
      type: "A",
      ...data,
    },
  });
  const checkList = response.data.data;
  delete response.data.data;
  const result: T_checkGetResult = {
    ...response.data,
    checkList,
  };
  return result;
}

export type T_checkDetail = {
  idx: number;
  code: string;
  masterCode: string;
  codeName: string;
  codeContent: string;
};

export type T_checkGetDetailData = {
  masterCode: string;
};

export type T_checkGetDetailResult = {
  msg: string;
  isSuccess: boolean;
  detailList: T_checkDetail[];
};

async function getDetail(data: T_checkGetDetailData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/checklist",
    data: {
      type: "A",
      ...data,
    },
  });
  const detailList = response.data.data;
  delete response.data.data;
  const result: T_checkGetDetailResult = {
    ...response.data,
    detailList,
  };
  return result;
}

export type T_checkDetailData = {
  idx: string;
  masterCode: string;
  codeContent: string;
  codeName: string;
  type: string;
};

export type T_checkGetDetail = {
  idx: number;
  result: string;
  checkList: T_checkDetailData;
  codeContent: string;
  userinfo: {
    userNm: string;
    userId: string;
  };
  elevatorNo: string;
  elevinfo?: {
    buldNm: string;
  };
  insDate: string;
};

export type T_checkGetDetailListData = {
  masterIdx: number;
};

export type T_checkGetDetailListResult = {
  msg: string;
  isSuccess: boolean;
  checkDetailList: T_checkGetDetail[];
};

async function getDetailList(data: T_checkGetDetailListData) {
  const response = await sendApi({
    method: "post",
    url: "/check/checkhistdetail",
    data: {
      ...data,
    },
  });
  const checkDetailList = response.data.data;
  delete response.data.data;
  const result: T_checkGetDetailListResult = {
    ...response.data,
    checkDetailList,
  };
  return result;
}

export type T_checkStartData = {
  elevatorNo: string;
  insUserId: string;
};

export type T_checkStartResult = {
  msg: string;
  idx: number;
  isSuccess: boolean;
};

async function start(data: T_checkStartData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/savecheckmaster",
    data: {
      ...data,
      gubun: "1",
      ctype: "A",
      status: "1",
      content: "",
    },
  });
  const idx = response.data.data.idx;
  delete response.data.data;
  const result: T_checkStartResult = {
    ...response.data,
    idx,
  };
  return result;
}

export type T_checkEndData = {
  idx: number;
};

export type T_checkEndResult = {
  msg: string;
  isSuccess: boolean;
};

async function end(data: T_checkEndData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/statuscheckmaster",
    data: {
      ...data,
      status: "C",
      content: "취소",
    },
  });
  delete response.data.data;
  const result: T_checkEndResult = {
    ...response.data,
  };
  return result;
}

export type T_checkCompleteDataResult = "B" | "C" | "제외";

export type T_checkCompleteDataDetail = {
  masterIdx: string;
  checkIdx: number;
  result: T_checkCompleteDataResult;
};

export type T_checkCompleteData = {
  idx: number;
  status: string;
  detail: T_checkCompleteDataDetail[];
};

export type T_checkCompleteResult = {
  msg: string;
  isSuccess: boolean;
};

async function complete(data: T_checkCompleteData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/savecheckdetail",
    data: {
      detail: data.detail,
      masterIdx: data.idx,
    },
  });
  let result: T_checkCompleteResult = {
    ...response.data,
  };
  if (result.isSuccess) {
    const response2 = await sendApi({
      method: "post",
      url: "/elev/statuscheckmaster",
      data: {
        idx: data.idx,
        status: data.status,
        content: "",
      },
    });
    result = {
      ...response2.data,
    };
  }  

  return result;
}

export type T_checkUploadFileData = {
  elevatorNo: string;
  files: any;
};

export type T_checkUploadFileResult = {
  msg: string;
  isSuccess: boolean;
};

async function uploadFile(data: T_checkUploadFileData) {
  const newData = new FormData();
  newData.append("elevatorNo", data.elevatorNo);
  for (let i = 0; i < data.files.length; i++) {
    newData.append("files", data.files[i]);
  }

  const response = await sendApi({
    method: "post",
    url: "/elev/arduinofile",
    data: newData,
    isForm: true,
  });
  delete response.data.data;
  const result: T_checkUploadFileResult = {
    ...response.data,
  };
  return result;
}

const check = {
  get,
  end,
  getDetail,
  start,
  getDetailList,
  complete,
  uploadFile,
};

export default check;
