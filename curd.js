let pid = document.getElementById("productid");
let pname = document.getElementById("productname");
let pimage = document.getElementById("productimage");
let pprice = document.getElementById("productprice");
let pdesc = document.getElementById("productdesc");
let product, newProduct, updateid;
document.onload = viewproduct();

function validation(id) {
    let validimg = /(\.jpg|\.jpeg|\.png|\.jfif|\.gif)$/i;
    if (isNaN(pid.value) || pid.value < 1) {
        document.getElementById('idvalidate').innerHTML = "*Please input a number only!!";
    }
    else if (pname.value == null || pname.value == "") {
        document.getElementById('namevalidate').innerHTML = "*Please input a product name!!";
    }
    else if (pimage.files[0].name == "" || !validimg.exec(pimage.files[0].name)) {
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
            viewproduct();
        }
        else if (id == 'update') {

            setupdatedata(updateid);

        }

    }
}

function duplicatecheck() {

    product = JSON.parse(localStorage.getItem("productDetail")) ?? [];



    product.forEach(function (element) {


        if (element.pid == pid.value) {

            document.getElementById('idvalidate').innerHTML = "*Product ID should be unique";

            if (document.getElementById("submit").id == "submit") {

                document.getElementById("submit").disabled = true;
            }
            else {
                document.getElementById("update").disabled = true;
            }

        }
        else {
            document.getElementById('idvalidate').innerHTML = "";
            if (document.getElementById("submit").id == "submit") {
                document.getElementById("submit").disabled = false;
            }
            else {
                document.getElementById("update").disabled = false;
            }


        }



    })

}
function duplicatecheck1() {

    product = JSON.parse(localStorage.getItem("productDetail")) ?? [];



    product.forEach(function (element) {

        if (element.pname == pname.value) {
            document.getElementById('namevalidate').innerHTML = "*Product name should be unique";
            if (document.getElementById("submit").id == "submit") {
                document.getElementById("submit").disabled = true;
            }
            else {
                document.getElementById("update").disabled = true;
            }

        }
        else {
            document.getElementById('namevalidate').innerHTML = "";
            if (document.getElementById("submit").id == "submit") {
                document.getElementById("submit").disabled = false;
            }
            else {
                document.getElementById("update").disabled = false;
            }


        }



    })

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
function viewproduct() {
    let table = "";
    product = JSON.parse(localStorage.getItem("productDetail")) ?? [];
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