/* 
    get total 
    create product 
    save local storage 
    clear inputs 
    read 
    count 
    delete
    update 
    search
    clean data  
 */

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit_ptn = document.getElementById("submit");

let mood = "create";
let temp;
// when typing this event is onkeyup 
// get total 
function getTotal() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";

        return result;
    }
    else {
        total.innerHTML = '';
        total.style.background = "";
    }

}

//create product 
let dataProduct = [];
console.log(dataProduct);
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
}
else {
    dataProduct = [];
}


// create element 
submit_ptn.onclick = () => {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML, // make sure total is not value 
        count: count.value,
        category: category.value.toLowerCase(),
    };
    if (title.value != "" && price.value != "" && category.value != "" && newProduct.count < 100) {
        if (mood === "create") {
            if (newProduct.count > 1) {
                console.log("this kdksf");
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            }
            else {
                dataProduct.push(newProduct);
            }
        }
        else {
            dataProduct[temp] = newProduct;
            mood = "create";
            submit_ptn.textContent = "Create";
            count.style.display = "";
        }
        clearData();
    }

    // save data to local storge
    localStorage.setItem("product", JSON.stringify(dataProduct));


    readData();
}


//     clear inputs 
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



// read 

function readData() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})"  id="update">Update</button></td>
        <td><button onclick ="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }

    document.getElementById("tbody").innerHTML = table;
    let delete_All = document.querySelector(".deleteAll")
    if (dataProduct.length > 0) {
        delete_All.innerHTML = `
        <button onclick="deleteAll()"  id="delet_All_btn">Delete All (${dataProduct.length})</button>
        `;
    }
    else {
        delete_All.innerHTML = '';
    }

}
// onclick="deleteAll()"
readData()

// Delete Data 

function deleteData(i) {
    console.log(i);
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    readData()
}
let deleteAll_btn = document.getElementById("delet_All_btn");


// Delet all data
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    readData();
}


// update Element 
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataProduct[i].category;
    submit_ptn.textContent = "Update";
    mood = "update";
    temp = i;
}



//   search 
let searchMood = "title";
function getSearchMood(id) {
    // console.log(id); 
    let search = document.getElementById("search");

    if (id === "search_title") {
        searchMood = "title";
        search.placeholder = "Search by Title";
    }
    else {
        searchMood = "category";
        search.placeholder = "Search by Category";
    }

    search.focus();
    search.value = "";
    readData();
}


function searchData(value) {
    let table = '';
    if (searchMood == "title") {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${[i]}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})"  id="update">Update</button></td>
                <td><button onclick ="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                `;
            }
        }
    }
    else {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${[i]}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})"  id="update">Update</button></td>
                <td><button onclick ="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                `;
            }
        }
    }







    document.getElementById("tbody").innerHTML = table;
}


// Clean Data 

