// import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

//Tips to remember for functional programming
// State manipulation > obj mutilation; ex. lines: 14-33
// No loops, instead recusion 
// All functions must have a return statement
// If function has multiple args; curry the function ex. line: 25-33


//State Management/Control
const storeState = (initialState) => { // pass in the initial state of obj(plant) thus allowin us to see the current properties of the obj's state.
  let currentState = initialState; // we record initial state in a new variable to have access to currentState later for editing
  return (stateChangeFunction = state => state) => { //if stateChangeFunction is undefined then allowing us to call stateControl() no args to see current state
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

const stateControl = storeState(); // plant 1; obj you are state manipulating
const stateControl2 = storeState(); // plant 2

//Function factory but more specific functions that alter the plants state.
const changeState = (prop) => { // function can increment/increase any property of state; Note that this function is highly reusable unlike if we were using obj oriented programming.
  return (value) => { // Note that the function is curried hence the multiple arguments split between changeState and anonymous functions.
    return (state) => ({
      ...state, // returning a new shallow copy of obj(plant). Note spread operator(...) which signifys shallow copy is being made
      [prop] : (state[prop] || 0) + value // Note how the function is highly reusable and is not specific to an instance of an obj like in OOP
    });
  };
};

// Example of how this changeState function works
// let plant = { soil: 0, light: 0, water: 0 }
// changePlantState(plant, "soil")
// returns {soil: 1, light: 0, water: 0}


// Property Values used to create functions using function factory above
//const feed = changeState("soil")(1); // passing in prop value thus creating various property values for each obj
const blueFood = changeState("soil")(5); // Note that "soil" = prop, 5 = value

//const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);


//DOM manipulation
$(document).ready(function() {

  $("#feed").click(function() {
    const newState = stateControl(blueFood); // on click they pass blueFood function (changeState("soil")(5)) which return a new shallow copy of obj with new attr soil = 5
    $("#soil-value").text(`Soil: ${newState.soil}`); // take returned value and push to DOM
  });

  $("#feed2").click(function() {
    const newState = stateControl2(blueFood); // on click they pass blueFood function (changeState("soil")(5)) which return a new shallow copy of obj with new attr soil = 5
    $("#soil-value2").text(`Soil: ${newState.soil}`); // take returned value and push to DOM
  });

  $("#superWater").click(function() {
    const newState = stateControl(superWater);
    $("#water-value").text(`Water:${newState.water} `);
  });

  $("#superWater2").click(function() {
    const newState = stateControl2(superWater);
    $("#water-value2").text(`Water:${newState.water} `);
  });

  $(".plants").mousemove(function() {
    const currentState = stateControl();
    if (currentState.soil === undefined) {
      currentState.soil = 0;
    }
    if (currentState.water === undefined) {
      currentState.water = 0;
    }
    $("#soil-value").text(`Soil: ${currentState.soil}`);
    $("#water-value").text(`Water: ${currentState.water}`);
  });

  $(".plants").mousemove(function() {
    const currentState = stateControl2();
    if (currentState.soil === undefined) {
      currentState.soil = 0;
    }
    if (currentState.water === undefined) {
      currentState.water = 0;
    }
    $("#soil-value2").text(`Soil: ${currentState.soil}`);
    $("#water-value2").text(`Water: ${currentState.water}`);
  });
});

