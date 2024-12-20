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
const ddd = document.querySelector(".ddd");
const loader = document.createElement("div");
const loader1 = document.createElement("div");
const prog = document.querySelector(".prog");
const divCircle = document.querySelector(".div-circle");
let completedCounter = 0;
loader.classList.add("loader", "d-none");
loader1.classList.add("loader1", "d-none");
let objBody = {
  apiKey: "67637cf260a208ee1fde54c5",
};
const apiKey = "67637cf260a208ee1fde54c5";

async function getTodos(f) {
  try {
    if (!f) {
      loader.classList.replace("d-none", "d-block");
      rowData.appendChild(loader);
    }
    let resTodos = await fetch(`https://todos.routemisr.com/api/v1/todos/${apiKey}`);
    let { todos } = await resTodos.json();
    Display(todos);
  } catch (err) {
    console.log(err);
  }
}
getTodos();

btn.addEventListener("click", async () => {
  if (!input.value.length) {
    Swal.fire({
      title: "Task Invalid",
      icon: "error",
    });
  } else {
    objBody.title = input.value;
    await sendTodo();
    await getTodos();
  }
});

async function sendTodo() {
  try {
    loader.classList.replace("d-none", "d-block");
    rowData.appendChild(loader);
    const resPost = await fetch(`https://todos.routemisr.com/api/v1/todos`, {
      method: "POST",
      body: JSON.stringify(objBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resPost.json();
    input.value = "";
    const Toast = Swal.mixin({
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      customClass: "w-h",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "task created successfully 😃",
    });
  } catch (err) {
    console.log(err);
  }
}

async function DeleteTodo(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    customClass: "swal",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    allowOutsideClick: false,
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        let resDelete = await fetch(`https://todos.routemisr.com/api/v1/todos`, {
          method: "DELETE",
          body: JSON.stringify({ todoId: id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        await resDelete.json();
        Swal.fire({
          allowOutsideClick: false,
          title: "Deleted!",
          customClass: "swal",
          text: "Your Task has been deleted.",
          icon: "success",
        });
        getTodos(1);
      } catch (err) {
        console.log(err);
      }
    }
  });
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
                 class=${e.completed ? "text-decoration-line-through" : ""}
              >
               ${e.title}
              </p>
              <div class="icon-completed">
                <i class="${e.completed ? "d-block" : "d-none"}   fa-solid fa-circle-check"></i>
              </div>
              <div class="icon">
                <i class="fa-solid fa-trash-can"></i>
              </div>
            </div>
          </div>
    `;
  });
  completedCounter = todos.reduce((init, e) => {
    return init + (e.completed ? 1 : 0);
  }, 0);
  divCircle.innerHTML = `${completedCounter}/${todos.length}`;
  prog.style.cssText = `width: calc(${(completedCounter / todos.length) * 100}%);`;
  rowData.innerHTML = blackBox.join("");

  // enable Tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  // Event
  rowData.addEventListener("click", (e) => {
    if (e.target.parentElement.parentElement.parentElement.dataset.id) {
      DeleteTodo(e.target.parentElement.parentElement.parentElement.dataset.id);
    }
  });

  rowData.addEventListener("dblclick", async (e) => {
    if (e.target.tagName == "P") {
      loader1.classList.replace("d-none", "d-block");
      e.target.parentElement.querySelector(".icon-completed").appendChild(loader1);
      UpdateTask(e.target.parentElement.parentElement.dataset.id);
    }
  });
}

async function UpdateTask(id) {
  try {
    const data = await fetch(` https://todos.routemisr.com/api/v1/todos`, {
      method: "PUT",
      body: JSON.stringify({ todoId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await data.json();

    getTodos(1);
    loader1.classList.replace("d-block", "d-none");
  } catch (err) {
    console.log(err);
  }
}
