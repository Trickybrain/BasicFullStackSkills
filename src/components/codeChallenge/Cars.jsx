import React, {useState, useEffect} from "react";
import carService from "./services/carService";
import SingleCar from "./SingleCar";

export default function Cars() {
   const [car, setCar] = useState({
      arrayOfCars: [],
      carsComponents: [],
      sideCardComponents: [],
   });

   let [showButton, setShowButton] = useState(false);

   useEffect(() => {
      carService.getAll().then(onGetAllSuccess).catch(onGetAllError);
   }, []);

   const onGetAllSuccess = (response) => {
      console.log("Success", response);
      let temp = response.data.items;
      setCar((prevState) => {
         const pd = {...prevState};
         pd.arrayOfCars = temp;
         pd.carsComponents = temp.map(mapCars);
         return pd;
      });
   };

   let numYear = 0;

   const filterCars = (item) => {
      console.log("filterFor2018", item);
      let keys = Object.keys(item);
      console.log("keys", keys);
      let filteredKeys = keys
         .filter((item) => {
            return item === "year";
         })
         .join("");
      console.log("filteredKeys", filteredKeys);
      if (filteredKeys === "year") {
         console.log("i am return true1", item.year[0], "and numYear", numYear);
         if (item.year[0] === numYear) {
            console.log("i am return true");
            return true;
         } else {
            console.log("i am return false at year");
            return false;
         }
      } else {
         console.log("i am return false");
         return false;
      }
   };

   const filterCarFor2018 = () => {
      console.log("i am year car", car.arrayOfCars);
      numYear = 2018;
      let filterData = car.arrayOfCars.filter(filterCars);
      console.log("i am filterData", filterData);
      setCar((prevState) => {
         const pd = {...prevState};
         pd.carsComponents = filterData.map(mapCars);
         return pd;
      });
   };

   const filterCarFor2019 = () => {
      console.log("i am year car", car.arrayOfCars);
      numYear = 2019;
      let filterData = car.arrayOfCars.filter(filterCars);
      console.log("i am filterData", filterData);
      setCar((prevState) => {
         const pd = {...prevState};
         pd.carsComponents = filterData.map(mapCars);
         return pd;
      });
   };

   const filterCarFor2020 = () => {
      console.log("i am year car", car.arrayOfCars);
      numYear = 2020;
      let filterData = car.arrayOfCars.filter(filterCars);
      console.log("i am filterData", filterData);
      setCar((prevState) => {
         const pd = {...prevState};
         pd.carsComponents = filterData.map(mapCars);
         return pd;
      });
   };

   const filterCarFor2021 = () => {
      console.log("i am year car", car.arrayOfCars);
      numYear = 2021;
      let filterData = car.arrayOfCars.filter(filterCars);
      console.log("i am filterData", filterData);
      setCar((prevState) => {
         const pd = {...prevState};
         pd.carsComponents = filterData.map(mapCars);
         return pd;
      });
   };

   const mapCars = (carPost, classCar) => {
      //   console.log("i am mapCars", carPost);
      if (classCar !== "side-card") {
         classCar = "show-all";
      }
      return (
         <SingleCar
            car={carPost}
            key={carPost.id}
            classCar={classCar}
            onCarClicked={onCarClickedForSide}
            showButton={showButton}></SingleCar>
      );
   };

   const onCarClicked = () => {
      setShowButton(!showButton);

      setCar((prevState) => {
         const pd = {...prevState};
         pd.carsComponents = car.arrayOfCars.map(mapCars);
         return pd;
      });
      console.log("car array", car.arrayOfCars);
   };

   const onGetAllError = () => {
      console.log("Error");
   };

   const RenderCar = () => {
      if (showButton) {
         return <div>{car.carsComponents}</div>;
      }
   };

   const RenderSideCar = () => {
      console.log("i am side car", showButton)
      if (showButton) {
         return <div>{car.sideCardComponents}</div>;
      }
   };

   const onCarClickedForSide = (myCar) => {
      console.log("onCarClickedForSide", myCar);
      setCar((prevState) => {
         const pd = {...prevState};
         pd.sideCardComponents = mapCars(myCar, "side-card");
         return pd;
      });
   };

   return (
      <React.Fragment>
         <div className="row">
            <h3 className="pt-2 ">Cars</h3>
            <div className="pt-2 ">
               <button
                  type="button"
                  id="show-2018-cars"
                  className="link-btn btn btn-lg btn-info "
                  onClick={filterCarFor2018}>
                  2018 Cars
               </button>
            </div>

            <div className="pt-2 ">
               <button
                  type="button"
                  id="show-2019-cars"
                  className="link-btn btn btn-lg btn-info"
                  onClick={filterCarFor2019}>
                  2019 Cars
               </button>
            </div>
            <div className="pt-2 ">
               <button
                  type="button"
                  id="show-2020-cars"
                  className="link-btn btn btn-lg btn-info"
                  onClick={filterCarFor2020}>
                  2020 Cars
               </button>
            </div>
            <div className="pt-2 ">
               <button
                  type="button"
                  id="show-2021-cars"
                  className="link-btn btn btn-lg btn-info"
                  onClick={filterCarFor2021}>
                  2021 Cars
               </button>
            </div>

            <div className="pt-2 col">
               <button
                  type="button"
                  id="show-all"
                  className="link-btn btn btn-lg btn-warning showButton"
                  onClick={onCarClicked}>
                  Show Cars
               </button>
               {RenderCar()}
            </div>
            <div className="col pt-5">{RenderSideCar()}</div>
         </div>
      </React.Fragment>
   );
}
