let students = [
  {
    ID: 1,
    name: "Alice",
    age: 21,
    grade: "A",
    degree: "Btech",
    email: "alice@example.com",
  },
  {
    ID: 2,
    name: "Bob",
    age: 22,
    grade: "B",
    degree: "MBA",
    email: "bob@example.com",
  },
  {
    ID: 3,
    name: "Charlie",
    age: 20,
    grade: "C",
    degree: "Arts",
    email: "charlie@example.com",
  },
];

let noDataTitle = document.getElementById("nodatatitle");
let table = document.getElementById("studentTable");
let form = document.getElementById("studentDataForm");
let searchForm = document.getElementById("search");
let submitBtn = document.getElementById("subbtn");


searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (students.length > 0) {
    var searchedObj = students.filter((item) => {
      return (
        item.name.toLowerCase() == searchForm.elements["sea"].value.toLowerCase() ||
        item.email.toLowerCase() == searchForm.elements["sea"].value.toLowerCase() ||
        item.degree.toLowerCase() == searchForm.elements["sea"].value.toLowerCase()
      );
    });
    if (searchedObj) {
      clearTable();
      showData(searchedObj);
    } else {
      noDataTitle.style.display = "block";
    }
  } else {
    return;
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (submitBtn.innerHTML == "Edit Student") {
    let id = form.elements["id"].value;
    var index = students.findIndex((o) => {
      return o.ID == id;
    });

    let name = form.elements["name"].value;
    let age = form.elements["age"].value;
    let email = form.elements["email"].value;
    let grade = form.elements["grade"].value;
    let degree = form.elements["degree"].value;

    students[index].name = name;
    students[index].age = age;
    students[index].email = email;
    students[index].grade = grade;
    students[index].degree = degree;
    clearTable();
    showData(students);
  } else {
    noDataTitle.style.display = "none";
    let name = form.elements["name"].value;
    let id = students.length > 0 ? students[students.length - 1].ID + 1 : 1;
    let age = form.elements["age"].value;
    let email = form.elements["email"].value;
    let grade = form.elements["grade"].value;
    let degree = form.elements["degree"].value;

    const newStudent = {
      ID: id,
      name: name,
      age: age,
      grade: grade,
      degree: degree,
      email: email,
    };

    if (students.length > 0) {
      students.push(newStudent);
      clearTable();
      showData(students);
    } else {
      noDataTitle.hidden = true;
      table.style.display = "table";
      students.push(newStudent);
      showData(students);
    }
  }
});

const deleteRecord = (id) => {
  students = students.filter((item) => {
    return item.ID != id;
  });
  clearTable();
  showData(students);
};

const editRecord = (id) => {
  var index = students.findIndex((o) => {
    return o.ID == id;
  });
  form.elements["name"].value = students[index].name;
  form.elements["age"].value = students[index].age;
  form.elements["email"].value = students[index].email;
  form.elements["grade"].value = students[index].grade;
  form.elements["degree"].value = students[index].degree;
  form.elements["id"].value = students[index].ID;
  submitBtn.innerText = "Edit Student";
};



const showData = (data) => {
  if (data.length == 0) {
    noDataTitle.hidden = false;
    table.style.display = "none";
  } else {
    console.log(data);
    for (let index = 0; index < data.length; index++) {
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      console.log(students[index].ID);
      cell1.innerHTML = `<p>${data[index].ID}</p>`;
      cell2.innerHTML = `<p>${data[index].name}</p>`;
      cell3.innerHTML = `<p>${data[index].email}</p>`;
      cell4.innerHTML = `<p>${data[index].age}</p>`;
      cell5.innerHTML = `<p>${data[index].grade}</p>`;
      cell6.innerHTML = ` <div class="degreecont">
            ${data[index].degree}
            <div>
              <button onClick = "deleteRecord(${data[index].ID})" class="deletebtn">
                <img class="trashimg" src="trash-2 1.png" />
              </button>
              <button onClick= "editRecord(${data[index].ID})" class="deletebtn">
                <img class="trashimg"  src="Vector.png" />
              </button>
            </div>
        </div>`;
    }
  }
};

const clearTable = () => {
    for (var i = 1; i < table.rows.length; ) {
      table.deleteRow(i);
    }
  };




if (students.length == 0) {
    table.style.display = "none";
  } else {
    noDataTitle.style.display = "none";
    showData(students);
  }
