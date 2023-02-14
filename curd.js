let pid = document.getElementById("productid");
let pname = document.getElementById("productname");
let pimage = document.getElementById("productimage");
let pprice = document.getElementById("productprice");
let pdesc = document.getElementById("productdesc");
let product, newProduct;
document.onload = viewproduct();

function validation(id) {
    let validimg = /(\.jpg|\.jpeg|\.png|\.jfif|\.gif)$/i;
    if (isNaN(pid.value) || pid.value < 1) {
        document.getElementById('idvalidate').innerHTML = "*Please input a number only!!";
    }
    else if (pname.value == null || pname.value == "") {
        document.getElementById('namevalidate').innerText = "*Please input a product name!!";
    }
    else if (!validimg.exec(pimage.files[0].name)) {
        document.getElementById('imagevalidate').innerText = "*File type is not allowed!!";

    }
    else if (isNaN(pprice.value) || pprice.value < 1) {
        document.getElementById('pricevalidate').innerText = "*Please input a number only!!";
    }
    else if (pdesc.value == null || pdesc.value == "") {
        document.getElementById('descvalidate').innerText = "*Please input a product Description!!";
    }
    else {
        if (id == 'submit') {
            insertion(id)
            alert('Product added successfull!!');
        }
        else {

        }

    }
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
                    <td><button class='btn btn-primary' onclick='productUpdate(this.id)' id='${i}'>Edit</button> <button class='btn btn-danger' onclick='productDelete(this.id)' id='${i}'>Delete</button></td>
                  </tr>`;
    });
    document.getElementById("seeproducts").innerHTML = table;

}