import axios from "axios";

import { GET_SNEAKERS, SEARCH_SNEAKER , GET_DETAIL} from "./actionTypes";

export const getSneakers = () => {
   return async (dispatch) => {
      try {
         const response = await axios.get("/dbSneakers");
         //console.log(response)
         dispatch({
            type: GET_SNEAKERS,
            payload: response, //data
         });
      } catch (error) {
         console.log("error trying to GET_SNEAKERS", error);
      }
   };
};

export const getSearchSneaker = (sneaker) => {
   return async function (dispatch) {
      try {
         const response = await axios.get(`RutaBack=${sneaker}`);
         return dispatch({
            type: SEARCH_SNEAKER,
            payload: response.data,
         });
      } catch (error) {
         console.log("error trying to SEARCH_SNEAKER");
      }
   };
};

/* CREAR PRODUCTO */

export function CreateNewProduct(payload) {
   return async function () {
      const response = await axios.post("RutaBack", payload);
      return response;
   };
}

export function getDetail(id){
   return async function(dispatch){
       try {
           let json = await axios.get(`http://localhost:3001/detail/${id}`)
           return dispatch({
               type: GET_DETAIL,
               payload: json.data
           })
       } catch (error) {
       return alert("Detail not found")
       }
   }
}
