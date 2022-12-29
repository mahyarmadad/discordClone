import {toast} from "material-react-toastify";
export const mediaHandel = (setStream, callbackFunction) => {
  navigator.mediaDevices
    .getUserMedia({audio: true, video: true})
    .then((stream) => {
      setStream(stream);
      callbackFunction();
    })
    .catch((e) => toast.error(e.message));
};
