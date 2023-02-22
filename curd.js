let pid = document.getElementById("productid");
let pname = document.getElementById("productname");
let pimage = document.getElementById("productimage");
let pprice = document.getElementById("productprice");
let pdesc = document.getElementById("productdesc");
let pdisplayimg = document.getElementById("displayimg");
let product, newProduct, updateid;
let btnval = "add";
let imgurl = null;
let seturl = null;


document.onload = viewproduct();
 

function validation(id) {

    let description = pdesc.value;
    let productname = pname.value;
    //console.log("p description length " + description.trim().length);
    //console.log(pimage.files[0]);
    let validimg = /(\.jpg|\.jpeg|\.png|\.jfif|\.gif)$/i;
    let validpname = /^[A-Za-z0-9\s]*$/;
    //console.log(validpname.exec(productname.trim()));
    if (isNaN(pid.value) || pid.value < 1) {
        document.getElementById('idvalidate').innerHTML = "*Please provide a number only!";
    } else if (pname.value == null || pname.value == "") {
        document.getElementById('namevalidate').innerHTML = "*Please provide a product name!";
    } else if (pimage.files[0] == null && imgurl == null) {
        document.getElementById('imagevalidate').innerHTML = "Image not set!!";
    }else if (pimage.files.length > 0 && !validimg.exec(pimage.files[0].name)) {
        document.getElementById('imagevalidate').innerHTML = "*Please select .jpg/.jpeg/.png/.jfif file only!";
    }else if (isNaN(pprice.value) || pprice.value < 0) {
        document.getElementById('pricevalidate').innerHTML = "*Please provide a number only & positive value!";
    } else if (pdesc.value == null || pdesc.value == "") {
        document.getElementById('descvalidate').innerHTML = "*Please provide a product description!!";
    } else if (description.trim().length < 10) {
        document.getElementById('descvalidate').innerHTML = "*Please provide minimum 10 character in description!";
    } else if (productname.trim().length < 3) {
        document.getElementById('namevalidate').innerHTML = "*Please provide minimum 3 character in Product name!";
    } else if (!validpname.exec(productname.trim())) {
        document.getElementById('namevalidate').innerHTML = "*special char(!, @, #, $, %, ^, &, *...) not allowed!";
    }else {
        if (id == 'submit') {
            insertion(id)
            //alert('Product added successfull!!');
            reseterror();
            viewproduct();
            location.reload();

        } else if (id == 'update') {
            setupdatedata(updateid);
            reseterror();
            location.reload();
        }

    }
}
//console.log(pimage.name)

function setimage() {
    pdisplayimg.style.display = "block";
    pdisplayimg.src = "/images/" + pimage.files[0].name;
}
function reseterror() {

    if (btnval == "update") {
        document.getElementById("update").disabled = false;
        document.getElementById("update").innerHTML = "ADD";
        document.getElementById("update").id = "submit";
        pdisplayimg.style.display = "none";
    }
    if (btnval == "add") {
        document.getElementById("submit").disabled = false;
    }
    document.getElementById('descvalidate').innerHTML = "";
    document.getElementById('pricevalidate').innerHTML = "";
    document.getElementById('imagevalidate').innerHTML = "";
    document.getElementById('namevalidate').innerHTML = "";
    document.getElementById('idvalidate').innerHTML = "";
}

function duplicatecheckid() {
    //let duplicatename = document.getElementById("productname").value;
    let duplicateid = document.getElementById("productid").value;
    product = JSON.parse(localStorage.getItem("productDetail")) ?? [];
    let findid = product.filter((productSearch) => productSearch['pid'].includes(duplicateid));
    //console.log("available id " + findid);
    //console.log("duplicate id:-" + duplicateid)
    //console.log(duplicateid == findid);
    findid.forEach(function (element) {
        //console.log(element.pid);
        //console.log(duplicateid);
        //console.log(element.pid == duplicateid);
        if (element.pid == duplicateid) {
            document.getElementById('idvalidate').innerHTML = "*Product id should be unique";
            if (btnval == "add") {
                document.getElementById("submit").disabled = true;
            }
            else if (btnval == "update") {
                document.getElementById("update").disabled = true;
            }
            //console.log(btnval=="add");
        }

    })
    if (findid.length == 0) {
        document.getElementById('namevalidate').innerHTML = "";
        document.getElementById('idvalidate').innerHTML = "";
        if (btnval == "add") {
            document.getElementById("submit").disabled = false;
        }
        else if (btnval == "update") {
            document.getElementById("update").disabled = false;
        }
    }
}


function duplicatecheckname() {

    let duplicatename = document.getElementById("productname").value;
    product = JSON.parse(localStorage.getItem("productDetail")) ?? [];
    let findname = product.filter((productSearch) => productSearch['pname'].includes(duplicatename));
    //console.log("available id " + findid);
    //console.log("duplicate id:-" + duplicateid)
    //console.log(duplicateid == findid);
    findname.forEach(function (element) {
        //console.log(element.pname);
        //console.log(duplicatename);
        //console.log(element.pname == duplicatename);
        if (element.pname == duplicatename) {
            document.getElementById('namevalidate').innerHTML = "*Product name should be unique";
            if (btnval == "add") {
                document.getElementById("submit").disabled = true;
            }else if (btnval == "update") {
                document.getElementById("update").disabled = true;
            }
            //console.log(btnval=="add");
        }
    })
    if (findname.length == 0) {
        document.getElementById('namevalidate').innerHTML = "";
        document.getElementById('idvalidate').innerHTML = "";

        if (btnval == "add") {
            document.getElementById("submit").disabled = false;
        }
        else if (btnval == "update") {
            document.getElementById("update").disabled = false;
        }
    }
}


function insertion(id) {

    if (id == "submit") {

        newProduct = {
            "pid": pid.value,
            "pname": pname.value.trim(),
            "pprice": String(pprice.value),
            "pimage": pimage.files[0].name,
            "pdesc": pdesc.value.trim()
        };
        //alert(newProduct);
        product = JSON.parse(localStorage.getItem('productDetail')) ?? [];
        product.push(newProduct);
        //alert(product);
        localStorage.setItem('productDetail', JSON.stringify(product));

    }
}

function viewproduct(id) {
    let table = "";

    //console.log(id);
    if (id) {
        if (id == 1234) {
            product = JSON.parse(localStorage.getItem("productDetailsort")) ?? [];
            //console.log(1);
        } else {
            product = id;
        }
    } else {
        product = JSON.parse(localStorage.getItem("productDetail")) ?? [];
        //console.log(0);
    }
    //console.log("product lenhth " + product.length);
    if (product.length > 0) {
        product.forEach(function (element, i) {
            table += `<tr>
                    <td>${element.pid}</td>
                    <td>${element.pname}</td>
                    <td><img src="images\\${element.pimage}" width="160px" height="128px"/></td>
                    <td>${element.pprice} </td>
                    <td>${element.pdesc}</td>
                    <td><button class='btn btn-primary' onclick='Update(this.id)' id='${i}'>Edit</button> <button class='btn btn-danger' onclick='productDelete(this.id)' id='${i}'>Delete</button></td>
                  </tr>`;
        });

    }
    else {
        table += `<tr>
    <td colspan='6' class='text-center text-warning'>${"No product available yet!"}</td>
         </tr> `;

    }
    document.getElementById("seeproducts").innerHTML = table;
}

function productDelete(id) {
    product = JSON.parse(localStorage.getItem("productDetail")) ?? [];
    if (id) {
        if (confirm("You want to delete your data!")) {
            product.splice(id, 1);
            localStorage.setItem("productDetail", JSON.stringify(product));
        }
    }
    viewproduct();
}

function Update(id) {
    if (id) {
        document.getElementById('namevalidate').innerHTML = "";
        document.getElementById('idvalidate').innerHTML = "";
        document.getElementById("submit").id = "update";
        document.getElementById("update").innerHTML = "UPDATE";
        btnval = "update";
        pid.value = product[id].pid;
        pname.value = product[id].pname;
        //document.getElementById("productimage").files[0].name=product[id].pimage;
        pprice.value = Number(product[id].pprice);
        pdesc.value = product[id].pdesc;
        updateid = id;
        pdisplayimg.style.display = "block";
        pdisplayimg.src = "/images/" + product[id].pimage;
        imgurl = product[id].pimage;

    }

}

function setupdatedata(id) {
    if (id) {
        let imagepath = null;
        product[id].pid = pid.value;
        product[id].pname = pname.value.trim();
        if (pimage.files.length > 0) {
            imagepath = pimage.files[0].name;
        } else {
            imagepath = imgurl;
        }

        product[id].pimage = imagepath;
        product[id].pprice = pprice.value;
        //product[id].pprice=document.getElementById("productprice").value;
        product[id].pdesc = pdesc.value.trim();
        localStorage.setItem('productDetail', JSON.stringify(product));
        //document.getElementById("myForm").reset();
        //document.getElementById("productid").value="";
        document.getElementById("update").id = "submit";
        document.getElementById("submit").innerHTML = "ADD";
        btnval = "add";
        viewproduct();

    }
}

function findproduct(id) {
    if (id == "search") {
        let searchid = document.getElementById("searchproduct").value;
        product = JSON.parse(localStorage.getItem("productDetail")) ?? [];
        // let findid = product.filter((productSearch) => productSearch['pid'].toLowerCase().includes(searchid.toLowerCase()));
        let findid = product.filter((productSearch) => productSearch['pid'].includes(searchid));
        //productSearch['id'].toLowerCase().includes(searchData.toLowerCase()));
        //console.log(findid.length);
        if (findid.length > 0) {
            viewproduct(findid);
            document.getElementById("proidvalidate").innerHTML = '';
        } else if (findid.length == 0) {
            // viewproduct(findid);
            document.getElementById("proidvalidate").innerHTML = 'Product data not availbale or id does not exists';
        }

    } else if (id == "clear") {
        location.reload();
    }

}

function sortdata(id) {
    let data = JSON.parse(localStorage["productDetail"]);
    if (id == "sortid") {
        data.sort((a, b) => { return a.pid - b.pid; });

    } else if (id == "sortname") {
        data.sort((a, b) => { return a.pname.toString().localeCompare(b.pname.toString()); });
    } else if (id == "sortprice") {
        data.sort((a, b) => { return a.pprice - b.pprice; });
    }
    localStorage.setItem('productDetailsort', JSON.stringify(data));
    let cid = 1234;
    viewproduct(cid);

}
// product.forEach(function (element) {

// console.log(element.pname === pname.value);

//     if (element.pname == pname.value) {
//         document.getElementById('namevalidate').innerHTML = "*Product name should be unique";
//         if (document.getElementById("submit").id == "submit") {
//             document.getElementById("submit").disabled = true;
//         }
//         else {
//             document.getElementById("update").disabled = true;
//         }

//     }
// else {
//     document.getElementById('namevalidate').innerHTML = "";
//     if (document.getElementById("submit").id == "submit") {
//         document.getElementById("submit").disabled = false;
//     }
//     else {
//         document.getElementById("update").disabled = false;
//     }


// }



// })

// if (findname.length > 0 || findid.length > 0) {
    //     if (findname.length > 0 && duplicatename != "") {
    //         document.getElementById('namevalidate').innerHTML = "*Product name should be unique";
    //     }
    //     if (findid.length > 0 && duplicateid != "") {
    //         document.getElementById('idvalidate').innerHTML = "*Product ID should be unique";
    //     }
    //     if (document.getElementById("submit").id == "submit") {
    //         document.getElementById("submit").disabled = true;
    //     } else {
    //         document.getElementById("update").disabled = true;
    //     }
    // }
    // if (findname.length == 0 && findid.length == 0) {
    //     document.getElementById('namevalidate').innerHTML = "";
    //     document.getElementById('idvalidate').innerHTML = "";

    //     if (document.getElementById("submit").id == "submit") {
    //         document.getElementById("submit").disabled = false;
    //     } else {
    //         document.getElementById("update").disabled = false;
    //     }
    // }
    // function duplicatecheck() {

//     product = JSON.parse(localStorage.getItem("productDetail")) ?? [];



//     product.forEach(function (element) {


//         if (element.pid == pid.value) {

//             document.getElementById('idvalidate').innerHTML = "*Product ID should be unique";

//             if (document.getElementById("submit").id == "submit") {

//                 document.getElementById("submit").disabled = true;
//             }
//             else {
//                 document.getElementById("update").disabled = true;
//             }

//         }
//         else {
//             document.getElementById('idvalidate').innerHTML = "";
//             if (document.getElementById("submit").id == "submit") {
//                 document.getElementById("submit").disabled = false;
//             }
//             else {
//                 document.getElementById("update").disabled = false;
//             }


//         }



//     })

// }