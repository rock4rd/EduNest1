<template>
  <div class="container">
    <div class="edunest">
      <img src="../assets/edunest.png" alt="logo">
    </div>
      <div class="navbar">
        <button class="features">Features</button>
        <button class="products">Products</button>
        <button class="register">Register</button>
      </div>


      <div class="homepage">
        <h1 class="titlehome">HAVE FUN WITH EduNest</h1>
        
        <div class="infohome">
          <h2>Dive into a world of learning with our interactive e-learning web app designed specifically for kids! Explore a vast array of educational content, from math and science to language arts and history, all presented in a fun and engaging way.</h2>
        </div>
      </div>

      <div class="freetrial">
        <router-link to="/register"><button class="registerbutton">Start Free Trial</button></router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
/* Reset body and html margins and paddings */
html, body {
  margin: 0;
  padding: 0;
  height: 100%; /* Ensure the html and body are full height */
}

.container {
  background-color: #52A2F9; /* Replace with your desired background color */
  width: 100%; /* Full width */
  height: 100vh; /* Full viewport height */
  display: flex; /* Center content */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  box-sizing: border-box; /* Ensure consistent sizing */
}

.navbar {
  background-color: white;
  position: relative;
  bottom: 46%;
  left: 41.62%;
  width: 85%;
  height: 8%;
  display: flex; /* Use flexbox for the buttons */
  justify-content: space-between; /* Space out the buttons */
  align-items: center; /* Vertically center the buttons */
  padding: 0; /* Remove padding to ensure proper sizing */
}

.navbar button {
  flex: 1; /* Make all buttons equal in size */
  height: 100%; /* Make buttons take full height of navbar */
  border: none; /* Optional: Remove borders */
  margin: 0; /* Ensure no gaps between buttons */
  background-color: #FFC64A; /* Button background color */
  font-weight: bold;
  font-size: 1em; /* Adjust text size */
}

.navbar button:not(:last-child) {
  border-right: 1px solid #ddd; /* Add a divider between buttons */
}

.navbar button:hover {
  background-color: #e0e0e0; /* Optional: Hover effect */
  cursor: pointer;
}
.edunest img{
  height: 200px;
}
.homepage{
  height: 50%;
  width: 50%;
  position: relative;

  right: 20%;
}
.homepage .titlehome{
  font-weight: bolder;
  font-size: 75px;
}
.homepage ,h1 ,h2 {
  color:white;
}
.infohome{
  width: 70%;
  flex-direction: column;
}
.edunest{
 height: 5px;
 width: 5px;
 position: relative;
 left: 2%;
 bottom: 50%;
}
.freetrial{
  height: 200px;
  width: 200px;
  position: relative;
  top: 35%;
  right: 50%;
  

}
.freetrial button{
  flex: 1%;
  height: 30%;
  width:100%;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border: none; /* Optional: Remove borders */
  margin: 0; /* Ensure no gaps between buttons */
  background-color: red; /* Button background color */
}
.freetrial button:not(:last-child) {
  border-right: 1px solid #ddd; /* Add a divider between buttons */
}

.freetrial button:hover {
  background-color: #e0e0e0; /* Optional: Hover effect */
  cursor: pointer;
}

</style>
