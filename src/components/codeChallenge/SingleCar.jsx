

import React from "react";

function SingleCar(props) {
console.log("i am single car", props)
   let keyId = props.car.id
   let theCar = props.car
   let keys = Object.keys(theCar)

   const theCarProp1 = props.car[keys[0]].join(" ");
   const theCarProp2 = props.car[keys[1]].join(" ");
   const theCarProp3 = props.car[keys[2]].join(" ");
   const onLocalClickedForSideCard = (e) => {
    e.preventDefault();
    console.log("onSelectClicked", props.car);
    props.onCarClicked(props.car);
  };
   let classId =props.classCar
   let classMark = true;
   if(classId==="show-all")
   classMark = true
   else
   classMark = false
   return (
      <div className="pt-3 " id={classId} key={keyId}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{keys[0]}: {theCarProp1}</h5>
                    <p className="card-text">{keys[1]}: {theCarProp2}</p>
                    <p className="card-text">{keys[2]}: {theCarProp3}</p>
                  
                  {classMark?   <button
                     type="button"
                     className="link-btn btn btn-lg btn-primary select-me"
                     onClick={onLocalClickedForSideCard}
                     >
                     Select Me
                  </button> : ""}
                </div>
            </div>
      </div>
   );
}

export default React.memo(SingleCar);
