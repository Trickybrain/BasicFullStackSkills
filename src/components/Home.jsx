import React from "react";

function Home(user) {
  // console.log("i am home", user);


  return (
    <React.Fragment>
      <h3>Home <span>{user.user.firstName} {user.user.lastName}</span> </h3>

    </React.Fragment>
  );
}

export default Home;
