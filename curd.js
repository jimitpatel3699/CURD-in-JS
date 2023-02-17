let pid = document.getElementById("productid");
let pname = document.getElementById("productname");
let pimage = document.getElementById("productimage");
let pprice = document.getElementById("productprice");
let pdesc = document.getElementById("productdesc");
let product, newProduct, updateid;
document.onload = viewproduct();

function validation(id) {
    console.log(pimage.files[0]);
    let validimg = /(\.jpg|\.jpeg|\.png|\.jfif|\.gif)$/i;
    if (isNaN(pid.value) || pid.value < 1) {
        document.getElementById('idvalidate').innerHTML = "*Please input a number only!!";
    }
    else if (pname.value == null || pname.value == "") {
        document.getElementById('namevalidate').innerHTML = "*Please input a product name!!";
    }
    else if (pimage.files[0] == null || !validimg.exec(pimage.files[0].name)) {
        document.getElementById('imagevalidate').innerHTML = "*File type is not allowed or image not set!!";

    }
    else if (isNaN(pprice.value) || pprice.value < 1) {
        document.getElementById('pricevalidate').innerHTML = "*Please input a number only & Positive value!!";
    }
    else if (pdesc.value == null || pdesc.value == "") {
        document.getElementById('descvalidate').innerHTML = "*Please input a product Description!!";
    }
    else {
        if (id == 'submit') {
            insertion(id)
            alert('Product added successfull!!');
            reseterror();
            viewproduct();
        }
        else if (id == 'update') {

            setupdatedata(updateid);
            reseterror();
            location.reload();

        }

    }
}
function reseterror()
{
    document.getElementById('descvalidate').innerHTML = "";
    document.getElementById('pricevalidate').innerHTML = "";
    document.getElementById('imagevalidate').innerHTML = "";
    document.getElementById('namevalidate').innerHTML = "";
    document.getElementById('idvalidate').innerHTML = "";
}
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
function duplicatecheck1() {

    let duplicatename = document.getElementById("productname").value;
    let duplicateid = document.getElementById("productid").value;

    product = JSON.parse(localStorage.getItem("productDetail")) ?? [];
    // let findid = product.filter((productSearch) => productSearch['pid'].toLowerCase().includes(searchid.toLowerCase()));
    let findname = product.filter((productSearch) => productSearch['pname'].includes(duplicatename));
    let findid = product.filter((productSearch) => productSearch['pid'].includes(duplicateid));
    //productSearch['id'].toLowerCase().includes(searchData.toLowerCase()));
    console.log("pname" + findname.length);
    console.log("pid" + findid.length);
    if (findname.length > 0 || findid.length > 0) {
        if (findname.length > 0 && duplicatename != "") {
            document.getElementById('namevalidate').innerHTML = "*Product name should be unique";
        }
        if (findid.length > 0 && duplicateid != "") {
            document.getElementById('idvalidate').innerHTML = "*Product ID should be unique";
        }
        if (document.getElementById("submit").id == "submit") {
            document.getElementById("submit").disabled = true;
        }
        else {
            document.getElementById("update").disabled = true;
        }
    }
    if (findname.length == 0 && findid.length == 0) {
        document.getElementById('namevalidate').innerHTML = "";
        document.getElementById('idvalidate').innerHTML = "";

        if (document.getElementById("submit").id == "submit") {
            document.getElementById("submit").disabled = false;
        }
        else {
            document.getElementById("update").disabled = false;
        }
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

}
function insertion(id) {

    if (id == "submit") {

        newProduct = {
            "pid": pid.value,
            "pname": pname.value,
            "pprice": String(pprice.value),
            "pimage": pimage.files[0].name,
            "pdesc": pdesc.value
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

    console.log(id);
    if(id)
    {
        if (id == 1234) {
            product = JSON.parse(localStorage.getItem("productDetailsort")) ?? [];
            console.log(1);
        }
        else{
            product=id;
        }
    }
    
    else {
        product = JSON.parse(localStorage.getItem("productDetail")) ?? [];
        console.log(0);
    }

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
        document.getElementById("submit").id = "update";
        pid.value = product[id].pid;
        pname.value = product[id].pname;
        //document.getElementById("productimage").files[0].name=product[id].pimage;
        pprice.value = Number(product[id].pprice);
        pdesc.value = product[id].pdesc;
        updateid = id;
    }

}
function setupdatedata(id) {
    if (id) {
        product[id].pid = pid.value;
        product[id].pname = pname.value;
        product[id].pimage = pimage.files[0].name;
        product[id].pprice = pprice.value;
        //product[id].pprice=document.getElementById("productprice").value;
        product[id].pdesc = pdesc.value;
        localStorage.setItem('productDetail', JSON.stringify(product));
        //document.getElementById("myForm").reset();
        //document.getElementById("productid").value="";
        document.getElementById("update").id = "submit";
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
        console.log(findid.length);
        if (findid.length > 0) {
            viewproduct(findid);
            document.getElementById("proidvalidate").innerHTML = '';
        }
        else if (findid.length == 0) {
            // viewproduct(findid);
            document.getElementById("proidvalidate").innerHTML = 'Product Data Not Availbale or ID not Exists';
        }

    }
    else if (id == "clear") {
        location.reload();
    }

}
function sortdata(id) {
    let data = JSON.parse(localStorage["productDetail"]);
    if (id == "sortid") {
        data.sort((a, b) => { return a.pid - b.pid; });

    }
    else if (id == "sortname") {

        data.sort((a, b) => { return a.pname.toString().localeCompare(b.pname.toString()); });

    } else if (id == "sortprice") {
        data.sort((a, b) => { return a.pprice - b.pprice; });

    }
    localStorage.setItem('productDetailsort', JSON.stringify(data));
    let cid = 1234;
    viewproduct(cid);

}