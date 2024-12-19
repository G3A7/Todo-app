//  "apiKey": "67637cf260a208ee1fde54c5"

// Api to get = https://todos.route.misr.com/api/v1/todos/apiKey
// Api to Post = https://todos.route.misr.com/api/v1/todos
/*body=> {title:"" , apiKey: } */
// Api to delete = https://todos.route.misr.com/api/v1/todos
/*body ==> {todoId:} */
// Api PUT to Complete Todo = https://todos.route.misr.com/api/v1/todos
/*body ==> {todoId:} */

// enable Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);



