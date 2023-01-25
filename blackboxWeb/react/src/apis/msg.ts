import { sendApi } from ".";

export type T_msgSendData = {};

export type T_msgSendResult = {
  msg: string;
  isSuccess: boolean;
};

async function send(data?: T_msgSendData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/sendalarm",
    data: {
      ...data,
    },
  });
  const result: T_msgSendResult = {
    ...response.data,
  };
  return result;
}

const msg = {
  send,
};

export default msg;
