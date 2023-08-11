import dataState from "../../../state/dataState"

let store = {
  dataState: { ...},
  sayName() {
    alert("My name is " + this.name);
  }
}