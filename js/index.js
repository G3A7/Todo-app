//  "apiKey": "67637cf260a208ee1fde54c5"

// Api to get = https://todos.routemisr.com/api/v1/todos/apiKey
// Api to Post = https://todos.routemisr.com/api/v1/todos
/*body=> {title:"" , apiKey: } */
// Api to delete = https://todos.routemisr.com/api/v1/todos
/*body ==> {todoId:} */
// Api PUT to Complete Todo = https://todos.routemisr.com/api/v1/todos
/*body ==> {todoId:} */

const btn = document.querySelector(".btn");
const input = document.querySelector("#task");
const rowData = document.querySelector("#rowData");
const ddd= document.querySelector(".ddd");

let objBody = {
  apiKey: "67637cf260a208ee1fde54c5",
};
const apiKey = "67637cf260a208ee1fde54c5";

async function getTodos() {
  try {
    let resTodos = await fetch(`https://todos.routemisr.com/api/v1/todos/${apiKey}`);
    let { todos } = await resTodos.json();
    console.log(todos);
    Display(todos);
  } catch (err) {
    console.log(err);
  }
}
getTodos();

btn.addEventListener("click", async () => {
  if (!input.value.length) {
    alert("Please enter a task");
  } else {
    objBody.title = input.value;
    await sendTodo();
    await getTodos();
  }
});

async function sendTodo() {
  try {
    const resPost = await fetch(`https://todos.routemisr.com/api/v1/todos`, {
      method: "POST",
      body: JSON.stringify(objBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resPost.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function DeleteTodo(id) {
  try {
    let resDelete = await fetch(`https://todos.routemisr.com/api/v1/todos`, {
      method: "DELETE",
      body: JSON.stringify({ todoId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await resDelete.json();
    console.log(data);
    getTodos();
  } catch (err) {
    console.log(err);
  }
}

function Display(todos) {
  let blackBox = todos.map((e) => {
    return `
    <div class="col-12" data-id=${e._id}>
            <div class="task d-flex align-items-center gap-3 justify-content-between">
              <p
                data-bs-toggle="tooltip"
                data-bs-title="Double click to complete the task"
                data-bs-custom-class="custom-tooltip"
              >
               ${e.title}
              </p>
              <div class="icon-completed ${e.completed ? "d-block" : "d-none"} ">
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <div class="icon">
                <i class="fa-solid fa-trash-can"></i>
              </div>
            </div>
          </div>
    `;
  });
  rowData.innerHTML = blackBox.join("");

  // enable Tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  rowData.addEventListener("click", (e) => {
    if (e.target.parentElement.parentElement.parentElement.dataset.id) {
      // console.log(e.target.parentElement.parentElement.parentElement.dataset.id);
      DeleteTodo(e.target.parentElement.parentElement.parentElement.dataset.id);
    }
  });

  rowData.addEventListener("dblclick", (e) => {
    if (e.target.tagName == "P") {
      console.log(e.target);
      // console.log(e.target.parentElement.parentElement.parentElement.dataset.id);
      // DeleteTodo(e.target.parentElement.parentElement.parentElement.dataset.id);
    }
  });
}

