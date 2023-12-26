let globalId = 1;

function deleteChild(id) {
    const parent = document.getElementById("todo-list");
    parent.removeChild(document.getElementById(id));
}

function createGrandchildren(title, description, id) {
    const child = document.createElement("div");
    child.classList.add("todo-item");

    const grandChild1 = document.createElement("div");
    grandChild1.innerHTML = `<strong>${title}</strong>`;
    const grandChild2 = document.createElement("div");
    grandChild2.innerHTML = description;
    const grandChild3 = document.createElement("button");
    grandChild3.innerHTML = "Mark as Done";
    grandChild3.setAttribute("onclick", `deleteChild('${id}')`);

    child.appendChild(grandChild1);
    child.appendChild(grandChild2);
    child.appendChild(grandChild3);
    child.setAttribute("id", id);

    return child;
}

function addTodo() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const parent = document.getElementById("todo-list");
    parent.appendChild(createGrandchildren(title, description, globalId++));
}
function updateDOMAccToState(state) {
    const parent = document.getElementById("todo-list");
    parent.innerHTML = " ";
    for (let i = 0; i < state.length; i++) {
        const child = createGrandchildren(
            state[i].title,
            state[i].description,
            state[i].id,
        );
        parent.appendChild(child);
    }
}
//window.setInterval(async function () {
//  const data = await fetch("https://sum-server.100xdevs.com/todos");
//  const json = await data.json();
//  updateDOMAccToState(json.todos);
//}, 5000);