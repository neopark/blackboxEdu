import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

function formatResult(response: ImagePickerResponse) {
  let err: any = null;
  let images: Asset[] = [];
  if (response.errorCode) {
    err = {
      message: response.errorCode,
    };
  } else if (response.errorMessage) {
    err = {
      message: response.errorMessage,
    };
  } else if (response.assets) {
    images = response.assets;
  }
  const result = {
    err,
    images,
  };
  return result;
}

async function openCamera() {
  const response = await launchCamera({
    cameraType: "back",
    mediaType: "photo",
  });
  if (!response.didCancel) {
    const result = formatResult(response);
    if (result.err) {
      throw result.err;
    } else {
      return result.images;
    }
  }
}

async function openGallery() {
  const response = await launchImageLibrary({
    mediaType: "photo",
  });
  if (!response.didCancel) {
    const result = formatResult(response);
    if (result.err) {
      throw result.err;
    } else {
      return result.images;
    }
  }
}

const imagePicker = {
  openCamera,
  openGallery,
};

export default imagePicker;
