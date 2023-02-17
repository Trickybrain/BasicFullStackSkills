import React, {useCallback, useEffect, useState} from "react";
import * as companieservice from "../../services/techCompanies";
import {useNavigate} from "react-router-dom";
import RenderCompanies from "./RenderCompanies";

function Companies() {
   const [coData, setCoData] = useState({
      arrayOfCo: [],
      CosComponents: [],
   });

   useEffect(() => {
    companieservice.getCompanies().then(onGetCoSuccess).catch(onError);
   }, []);

   const navigate = useNavigate();

   const onEditRequested = (co) => {
      console.log(co.id, "i am onEditRequested", co);
      const stateForTransports = {type:"TECHCO_VIEW", payload: co};
      navigate(`/Companies/CompaniesForm/${co.id}`, {state: stateForTransports});
   }

   const onDeleteRequested = useCallback((coPost, eObj) => {
      console.log("i am onDeleteRequested", coPost, "eObj", eObj);

      const deleteSuccess = deleteSuccessHandler(coPost.id);

      companieservice.deleteCompanies(coPost.id).then(deleteSuccess).catch(onError);
   }, []);


   const deleteSuccessHandler = (isDeleted) => {
      console.log("i am deleteSuccessHandler", isDeleted);

      return () => {
         console.log("i am delete success", isDeleted);
         setCoData((prevState) => {
            const newState = {...prevState};
            newState.arrayOfCo = [...newState.arrayOfCo];

            const indxOf = newState.arrayOfCo.findIndex((coList) => {
               let result = false;

               if (coList.id === isDeleted) {
                  result = true;
               }
               return result;
            });

            if (indxOf >= 0) {
               newState.arrayOfCo.splice(indxOf, 1);
               newState.CosComponents = newState.arrayOfCo.map(mapCo);
            }
            return newState;
         });
      };
   };

   const onGetCoSuccess = (response) => {
      console.log("i am onGetCoSuccess", response.data.item);
      let newArrayOfCo = response.data.item.pagedItems;
      setCoData((prevState) => {
         const pd = {...prevState};
         pd.arrayOfCo = newArrayOfCo;
         pd.CosComponents = newArrayOfCo.map(mapCo);
         return pd;
      });
   };

   const mapCo = (coPost) => {
      console.log("i am mapCo", coPost);
      return (
         <RenderCompanies
            co={coPost}
            key={coPost.id}
            onCoClickedForDelete={onDeleteRequested}
            onCoClickedForEdit = {onEditRequested}
         />
      );
   };

   const goToPage = (e) => {
      console.log(e.currentTarget.dataset.page);
      navigate(e.currentTarget.dataset.page);
   };

   const onError = () => {};

   return (
      <React.Fragment>
         <header>
            <div className="container">
               <h3 className="pt-2">Tech Companies</h3>
               <div className="pt-2">
                  <button
                     type="button"
                     className="link-btn btn btn-lg btn-primary"
                     id="addorEdit"
                     data-page="/Companies/CompaniesForm/"
                     onClick={goToPage}
                  >
                     New Companies
                  </button>
               </div>
            </div>
         </header>
         <div className="row">{coData.CosComponents}</div>
      </React.Fragment>
   );
}

export default Companies;
