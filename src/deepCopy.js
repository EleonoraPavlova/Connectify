const obj = {
  name: "Eleonora",
  protocol: "https",
  maxCount: 10,
  isOnline: true,
  students: ["Ivan", "Andre", "Tatuana"],
  classroom: {
    teacher: {
      name: "teacher Sveta",
      age: 45
    }
  }
}

// let objCopy = { ...obj, classroom: { ...obj.classroom.teacher, name: "Old" } }
// let students = { ...obj, students: [...obj.students, "Taras"] }
let copyObj = obj
let v = copyObj.classroom.teacher.name = "Goldy"
console.log(v)
console.log(obj)
console.log(obj.classroom === copyObj.classroom)
// console.log(objCopy.classroom === obj.classroom)