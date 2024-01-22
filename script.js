const tableEmpty = document.getElementById("table-empty");
const searchBar = document.getElementById("searchbar");
let filterOption = "name";
let userList = [];

const fetchData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  userList = await response.json();
  filterSearch();
};

const filterSearch = () => {
  const inputValue = searchBar.value.toLowerCase();
  const filteredList = userList.filter((user) => {
    const fieldToSearch = user[filterOption].toLowerCase();
    return fieldToSearch.includes(inputValue);
  });

  updateTable(filteredList);
};

const updateTable = (filteredData) => {
  const tableHead = `
    <thead>
        <tr>
            <th scope='col'>name</th>
            <th scope='col'>username</th>
            <th scope='col'>email</th>
        </tr>
    </thead>`;

  const tableBody = `
    <tbody>
        ${filteredData.map(
          (element) => `
            <tr>
                <td>${element.name}</td>
                <td>${element.username}</td>
                <td>${element.email}</td>
            </tr>`
        )}
    </tbody>`;

  tableEmpty.innerHTML = tableHead + tableBody;
};

const handleDropdownItemClick = (selectedOption) => {
  filterOption = selectedOption;
  filterSearch();
};

searchBar.addEventListener("input", filterSearch);

document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", () => handleDropdownItemClick(item.id));
});

fetchData();
