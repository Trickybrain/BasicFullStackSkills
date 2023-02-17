import React, {useState, useEffect, useCallback} from "react";
import * as friendsService from "../../services/friendsService";
import RenderFriend from "./renderFriend";
import {useNavigate} from "react-router-dom";
import "./style.css";
import toastr from "toastr";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";

function Friends() {
   const [pageData, setPageData] = useState({
      arrayOfFriend: [],
      friendComponents: [],
      pageIndex: 1,
      pageSize: 4,
      total: 0,
   });

   const [searchData, setSearchData] = useState({
      searchString: "",
   });

   let [show, setShow] = useState(false);

   const navigate = useNavigate();

   const onEditRequested = (myFriend) => {
      console.log(myFriend.id, "i am myFriend", myFriend);
      const stateForTransports = {type: "FRIEND_VIEW", payload: myFriend};
      console.log("i am stateForTransports", stateForTransports);
      navigate(`/Friends/addorEdit/${myFriend.id}`, {
         state: stateForTransports,
      });
   };

   const onDeleteRequested = useCallback((myFriend, eObj) => {
      console.log(myFriend.id, "i am eobj", eObj);

      const deleteSuccess = deleteSuccessHandler(myFriend.id);

      friendsService
         .deleted(myFriend.id)
         .then(deleteSuccess)
         .catch(onDeleteError);
   }, []);

   //////
   ////this is currying got the id before it got deleted
   ////the bottom one got the id from the ajax call after it got deleted successfully
   const deleteSuccessHandler = (isDeleted) => {
      console.log("i am get delete success handler", isDeleted);
      return () => {
         console.log("i am delete success ", isDeleted);
         setPageData((prevState) => {
            const pd = {...prevState};
            console.log("i am pd", pd);
            pd.arrayOfFriend = [...pd.arrayOfFriend];

            const indxOf = pd.arrayOfFriend.findIndex((person) => {
               let result = false;

               if (person.id === isDeleted) {
                  result = true;
               }

               return result;
            });

            if (indxOf >= 0) {
               pd.arrayOfFriend.splice(indxOf, 1);
               pd.friendComponents = pd.arrayOfFriend.map(mapString);
            }

            return pd;
         });
      };
   };

   const onDeleteError = () => {
      console.log("Error");
   };

   const onSearch = () => {
      var searchPageIndex = 0;
      friendsService
         .getSearch(searchPageIndex, pageData.pageSize, searchData.searchString)
         .then(onGetSearchPage)
         .catch(onGetFriendsError);
   };

   const paginationStyle = {textAlign: "center"};

   const pagination = (current) => {
      console.log("in pagination current", current);
      setPageData((prevState) => {
         const newPage = {...prevState};
         newPage.pageIndex = current;
         return newPage;
      });
      friendsService
         .getFriend(current - 1, pageData.pageSize)
         .then(onGetFriendsSuccess)
         .catch(onGetFriendsError);
   };

   const undoSearch = () => {
      pageData.pageSize = 4;
      pageData.pageIndex = 1;
      friendsService
         .getFriend(pageData.pageIndex - 1, pageData.pageSize)
         .then(onGetFriendsSuccess)
         .catch(onGetFriendsError);
   };

   const onFormFieldChange = (e) => {
      const target = e.target;
      const value = target.value;
      const name = target.name;

      setSearchData((prevState) => {
         const newUserObject = {...prevState};
         newUserObject[name] = value;
         return newUserObject;
      });
      console.log("i am name", searchData.searchString);
   };

   const mapString = (aFriend) => {
      return (
         <RenderFriend
            person={aFriend}
            key={aFriend.id}
            onFriendClickedForDelete={onDeleteRequested}
            onFriendClickedForEdit={onEditRequested}
         />
      );
   };

   useEffect(() => {
      friendsService
         .getFriend(pageData.pageIndex - 1, pageData.pageSize)
         .then(onGetFriendsSuccess)
         .catch(onGetFriendsError);
   }, []);

   const onGetFriendsSuccess = (response) => {
      console.log("i am onGetFriendsSuccess", response.data);
      let arrayOfPeeps = response.data.item.pagedItems;
      let itemForPage = response.data.item;
      setPageData((prevState) => {
         const pd = {...prevState};
         pd.total = itemForPage.totalCount;
         pd.arrayOfFriend = arrayOfPeeps;
         pd.friendComponents = arrayOfPeeps.map(mapString);
         return pd;
      });
   };

   const onGetSearchSuccess = (response) => {
      console.log(
         "i am onGetSearchSuccess",
         response.data.item,
         "current pagesize",
         pageData.pageSize
      );
      let arrayOfPeeps = response.data.item.pagedItems;
      let itemForPage = response.data.item;
      setPageData((prevState) => {
         const pd = {...prevState};
         pd.pageSize = itemForPage.totalCount;
         pd.total = itemForPage.totalCount;
         pd.arrayOfFriend = arrayOfPeeps;
         pd.friendComponents = arrayOfPeeps.map(mapString);
         return pd;
      });
   };

   const onGetSearchPage = (response) => {
      let arrayOfPeeps = response.data.item.pagedItems;
      let itemForPage = response.data.item;
      console.log(
         "i am onGetSearchPage",
         response.data.item,
         "new pageSize",
         itemForPage.totalCount
      );
      setPageData((prevState) => {
         const pd = {...prevState};

         pd.total = itemForPage.totalCount;
         pd.arrayOfFriend = arrayOfPeeps;
         pd.friendComponents = arrayOfPeeps.map(mapString);
         return pd;
      });
      pageData.pageSize = itemForPage.totalCount;
      var newSearchIndex = 0;
      console.log("i am onGetSearchPage", pageData.pageSize);
      friendsService
         .getSearch(newSearchIndex, pageData.pageSize, searchData.searchString)
         .then(onGetSearchSuccess)
         .catch(onGetFriendsError);
   };

   const onGetFriendsError = () => {
      toastr.error("Error");
   };

   const onRenderClicked = () => {
      setShow(!show);
      // setCount((prevState) => {
      //    prevState = prevState +1;
      //    console.log(prevState);
      //    return prevState;
      // });
   };
   const goToPage = (e) => {
      console.log(e.currentTarget.dataset.page);
      navigate(e.currentTarget.dataset.page);
   };

   const renderMessage = () => {
      if (show) {
         return (
            <div className="row">
               {pageData.friendComponents}
               <Pagination
                  style={paginationStyle}
                  className="friendsPagination"
                  locale={locale}
                  current={pageData.pageIndex}
                  pageSize={pageData.pageSize}
                  total={pageData.total}
                  onChange={pagination}></Pagination>
            </div>
         );
      }
   };

   return (
      <React.Fragment>
         <div className="container">
            <header>
               <h3 className="pt-2">Friends</h3>
               <div>
                  <button
                     type="button"
                     className="link-btn btn btn-lg btn-info"
                     onClick={onRenderClicked}>
                     Rendering {show ? "No show" : "Show"}
                  </button>
               </div>
               <div className="pt-2">
                  <button
                     type="button"
                     className="link-btn btn btn-lg btn-primary"
                     id="addorEdit"
                     data-page="/Friends/addorEdit"
                     onClick={goToPage}>
                     New Friends
                  </button>
                  <div className="col-md-4 pb-2 pad">
                     <input
                        type="text"
                        className="form p-2"
                        name="searchString"
                        placeholder="Search"
                        value={searchData.searchString}
                        onChange={onFormFieldChange}
                     />
                     <button
                        type="submit"
                        className="btn btn-primary btn-lg ms-1"
                        id="cmdSearch"
                        onClick={onSearch}>
                        Search
                     </button>
                     <button
                        type="submit"
                        className="btn btn-primary btn-lg ms-1"
                        id="cmdSearch"
                        onClick={undoSearch}>
                        Unsearch
                     </button>
                  </div>
               </div>
            </header>
            <div>{renderMessage()}</div>
         </div>
      </React.Fragment>
   );
}



export default Friends;
