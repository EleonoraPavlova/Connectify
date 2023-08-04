// // plain object   // POCO\POJO  ЛИКБЕЗ ООП

// let man = {
//   name: 'Dmitry',
//   age: 31,
//   sayName() {
//     alert("My name is " + this.name);
//   }
// }

// man.age = 27;
// console.log(man.age);
// console.log(man.name);
// man.sayName();



// // let content = 'sds';

// let page = {
//   title: 'samuraiJS',
//   content: ``,
//   render() {
//     document.title = this.title;
//     document.write(this.content);
//     // if (this.content === '') {
//     //   alert('Content is unavaiable');
//     // } else {
//     //   document.title = this.title;
//     //   document.write(this.content);
//     // }
//   }
// }
// page.content = `<div>Content about React JS</div>`;
// page.render();

// let page2 = {
//   title: 'samuraiJS',
//   _content: ``, //_приватное свойство(нельзя трогать и пользоваться напрямую и устанавливать значение)
//   setContent(value) { //но можно установить значение можно сеттером
//     //можно инкапсулировать любую логику
//     //СЕТТЕРЫ ГЕТТЕРЫ НУЖНЫ ДЛЯ ИНКАПСУЛИРОВАНИЯ ДЕТАЛЕЙ, СОКРЫТЬ
//     //if (value is ok??)           
//     this._content = value;
//   },
//   getContent() { //делает возврат сеттера
//     return this._content;
//   },
//   render: function () {
//     document.write(this._content);
//   }
// }

// // page2._content = `<div>Content about React JS</div>`;
// page2.setContent(`<div>Content about React JS</div>`);
// // console.log( page2._content );
// console.log(page2.getContent());
// page2.render();

// // let renderPage = (state) => {
// //   console.log(state);
// // };

// let store90 = {
//   _subscriber() {
//     console.log('no subscribers (observers)')
//   },
//   _state: {
//     firstName: 'it-incubator.by',
//     lastName: 'it-kamasutra.com'
//   },
//   getState() {
//     return this._state;
//   },
//   subscribe(observer) {
//     this._subscriber = observer;
//   },
//   setFirstName(value) {
//     // send ajax to server
//     this._state.firstName = value;
//     this._subscriber();
//   }
// }
// store90.getState()
// let state90 = store.getState();
// store90.setFirstName('samuraiJS.com');
// state = store90.getState();

// let subscriber = () => {
//   let state = store90.getState();
//   renderPage(state);
// };

// store90.subscribe(subscriber);

// store90.setFirstName('youtube.com');





// // plain object   // POCO\POJO

// // let man = {
// //   name: 'Dmitry',
// //   age: 31,
// //   sayName() {
// //     alert("My name is " + this.name);
// //   }
// // }

// // man.age = 27;
// // console.log(man.age);
// // console.log(man.name);
// // man.sayName();





// // let content = 'sds';

// // let page = {
// //   title: 'samuraiJS',
// //   content: ``,

// //   render() {
// //     if (this.content === '') {
// //       alert('Content is unavaiable');
// //     } else {
// //       document.title = this.title;
// //       document.write(this.content);
// //     }
// //   }
// // }

// // page.content = `<div>Content about React JS</div>`;
// // page.render();

// // let page2 = {
// //   title: 'samuraiJS',
// //   _content: ``,
// //   setContent(value) {
// //     //if (value is ok??)           
// //     this._content = value;
// //   },
// //   getContent() {
// //     return this._content;
// //   },
// //   render: function () {
// //     document.write(this._content);
// //   }
// // }

// // page2._content = `<div>Content about React JS</div>`;
// page2.setContent(`<div>Content about React JS</div>`);
// // console.log( page2._content );
// console.log(page2.getContent());
// page2.render();

// let renderPage = (state) => {
//   console.log(state);
// };

// let store = {
//   _subscriber() {
//     console.log('no subscribers (observers)')
//   },
//   _state: {
//     firstName: 'it-incubator.by',
//     lastName: 'it-kamasutra.com'
//   },
//   getState() {
//     return this._state;
//   },
//   subscribe(observer) {
//     this._subscriber = observer;
//   },
//   setFirstName(value) {
//     // send ajax to server
//     this._state.firstName = value;
//     this._subscriber();
//   }
// }
// // store._state


// let state = store.getState();
// store.setFirstName('samuraiJS.com');
// state = store.getState();

// let subscriber = () => {
//   let state = store.getState();
//   renderPage(state);
// };

// store.subscribe(subscriber);

// store.setFirstName('youtube.com');