import axios from "axios";
import { toast } from 'react-toastify';


export const NOT_EKLE = "NOT_EKLE"
export const NOT_SIL = "NOT_SIL"


export function notEkle(not) {
  return { type: NOT_EKLE, payload: not }
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId }
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
    toast.info("Biraz bekleyin....", { position: toast.POSITION.TOP_RIGHT });
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
        console.log(res.data)
        dispatch(notEkle(res.data.json))
        toast.success("Eklendi !", { position: toast.POSITION.TOP_RIGHT });
      }
    })
    .catch((error) => {
      toast.warning("Bir Problem Var !", { position: toast.POSITION.TOP_RIGHT });
      console.log(error)
    });
}

export const notSilAPI = (id) => (dispatch) => {
  // console.log(id)
  toast.success("Sildik !", { position: toast.POSITION.TOP_RIGHT });
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin 
        dispatch(notSil(res.data.data))
      }
    })
    .catch((error) => console.log(error));
}