const list_product = [
    { hinh: "mwcnu(1).jpg", tensp: " Sản Phẩm 5", gia: "300000 VND", giaV: 300000 },
    { hinh: "mwcnu(2).jpg", tensp: " Sản Phẩm 6", gia: "400000 VND", giaV: 400000 },
    { hinh: "mwcnu(3).jpg", tensp: " Sản Phẩm 7", gia: "500000 VND", giaV: 500000 },
    { hinh: "mwcnu(4).jpg", tensp: " Sản Phẩm 8", gia: "600000 VND", giaV: 600000 },

]

const list_product_sale = [
    { hinh: "mwcnam(1).jpg", tensp: " Sản Phẩm 1", gia: "300000 VND", giaV: 300000 },
    { hinh: "mwcnam(2).jpg", tensp: " Sản Phẩm 2", gia: "400000 VND", giaV: 400000 },
    { hinh: "mwcnam(3).jpg", tensp: " Sản Phẩm 3", gia: "500000 VND", giaV: 500000 },
    { hinh: "mwcnam(4).jpg", tensp: " Sản Phẩm 4", gia: "600000 VND", giaV: 600000 },
]
let str2 = '';
for (let i = 0; i < list_product_sale.length; i++) {
    var pro = JSON.stringify(list_product_sale[i]);
    console.log(pro);

    str2 += `
        <div class="sp">
            <img class="hinh" src="img/${list_product_sale[i].hinh}" alt="">
            <h4 class="tensp">${list_product_sale[i].tensp}</h4>
            <h4 class="gia">${list_product_sale[i].giaV}</h4>
            <input class="sl type="number" name="" id="" min="1" value="1">
            <button onclick='addcart(this)'>Thêm Vào Giỏ Hàng</button> <br> <br>
            <button onclick=\'xem(\`${pro}\`)\'>Xem chi tiết</button>
        </div>
    `
}
document.getElementById("list_sp_sale").innerHTML = str2;
let str = '';
for (let i = 0; i < list_product.length; i++) {
    var pro = JSON.stringify(list_product[i])
    str += `
        <div class="sp">
            <img src="img/${list_product[i].hinh}" alt="">
            <h4>${list_product[i].tensp}</h4>
            <h4>${list_product[i].giaV}</h4>
            <input type="number" name="" id="" min="1" value="1">
            <button onclick="addcart(this)">Thêm Vào Giỏ Hàng</button>  <br> <br>
            <button onclick=\'xem(\`${pro}\`)\'>Xem chi tiết</button>
        </div>
    `
}
document.getElementById("list_sp").innerHTML = str;
//xem chitiet
function xem(x) {
    console.log(x);
    localStorage.setItem("sp", x);
    window.location = "chitietSP.html";
}
//giohang
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// cart = [];
function addcart(button) {
    // cart = [];
    let div = button.parentElement.children;//truy xuat toi the div chua tt sp
    let hinh = div[0].src;
    let ten = div[1].innerHTML;
    let gia = div[2].innerHTML;
    let soluong = div[3].value;
    soluong = Number(soluong);
    // console.log(div);
    // console.log(hinh + ", " + ten + ", " + gia + ", " + soluong);

    const item = [ten, gia, soluong, hinh];
    console.log("Item:    " + item);

    let check = true;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] == item[0]) {
            check = false;
            soluong += cart[i][2];
            cart[i][2] = soluong;
            break;
        }
    }
    if (check == true) {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("gio hang: " + cart);
    UpdateSlCart();
}
window.onload = function () {
    UpdateSlCart();
};

function UpdateSlCart() {
    const soluong = document.getElementById("soluong_sp");
    let tongSoluong = 0;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0]) {
            tongSoluong++;
        }
    }
    soluong.textContent = tongSoluong;

}


//sp chitiet

// // Them sp vao gio hang
// const cart = [];
// function addcart(button) {
//     let div = button.parentElement.children;//truy xuat toi the div chua tt sp
//     let hinh = div[0].src;
//     let ten = div[1].innerHTML;
//     let gia = div[2].innerHTML;
//     let soluong = div[3].value;
//     soluong = Number(soluong);
//     console.log(div);
//     console.log(hinh + ", " + ten + ", " + gia + ", " + soluong);

//     const item = [hinh, ten, gia, soluong];
//     let check = true;
//     for (let i = 0; i < cart.length; i++) {
//         if (cart[i][1] == item[1]) {
//             check = false;
//             soluong += cart[i][3];
//             cart[i][3] = soluong;
//             break;
//         }
//     }
//     if (check == true) {
//         cart.push(item);
//     }
//     // console.log(item);
//     console.log(cart);
//     show_cart();
// }
// // Show gio hang
// function show_cart() {
//     let row = "";
//     let tong = 0;
//     for (let i = 0; i < cart.length; i++) {
//         let tt = cart[i][2] * cart[i][3];
//         tong += tt;
//         row += `
//             <tr>
//                 <td>${i + 1}</td>
//                 <td><img src="${cart[i][0]}"></td>
//                 <td>${cart[i][1]}</td>
//                 <td>${cart[i][2]}</td>
//                 <td><input onchange="update(this,${i})" type="number" min=1 value="${cart[i][3]}"></td>
//                 <td>${tt.toLocaleString('de-DE')}</td>
//                 <td ><i id="del-gh" class="fa-solid fa-trash fa-bounce"  onclick="del(this,${i})"></i></td>
//             </tr>
//         `
//     }
//     document.getElementById('tb').innerHTML = row;
//     document.getElementById('total').innerHTML = tong.toLocaleString('de-DE');
// }
// //Ẩn hiện cart
// let open_cart = document.querySelector(".fa-bag-shopping")
// let close_cart = document.querySelector(".fa-circle-xmark")

// document.getElementById("cart").style.display = 'none';
// //Hien gio hang
// open_cart.addEventListener('click', function () {
//     document.getElementById("cart").style.display = 'block';
// });
// close_cart.addEventListener('click', function () {
//     document.getElementById("cart").style.display = 'none';
// })

//slider

const hinh = [
    "mwc.jpg", "mwc2.jpg", "marh7-2.png"
]

// const desc = [
//     "Mô tả sản phẩm 1", "Mô tả sản phẩm 2", "Mô tả sản phẩm 3"
// ]

let i = 0;
function next() {
    i++;
    if (i == hinh.length) {
        i = 0;
    }
    document.getElementById("hinh").src = `img/${hinh[i]}`;
}
function back() {
    i--;
    if (i < 0) {
        i = hinh.length - 1;
    }
    document.getElementById("hinh").src = `img/${hinh[i]}`;
}
setInterval(next, 3000);

//xoa sp khoi gio hang
function del(x, i) {
    let tr = x.parentElement.parentElement;
    tr.remove();
    cart.splice(i, 1);
    show_cart();
}

function update(x, i) {
    cart[i][3] = x.value * 1;
    show_cart();
}

let user = JSON.parse(localStorage.getItem("user"));
document.getElementById("ten").innerHTML = user[0];
// SALE

let countdown = setInterval(
    function () {
        let saleDateInput = new Date('2024-09-09 00:00:00');
        let now = new Date().getTime();
        let d = saleDateInput - now;
        // console.log(d);
        let days = Math.floor(d / (24 * 60 * 60 * 1000));
        // console.log(days);
        let hours = Math.floor(d / (60 * 60 * 1000));
        let minutes = Math.floor(d / (60 * 1000));
        let seconds = Math.floor(d / (1000));
        //Dam bao hien thi 1 ngay co 24h, 1h 60p, 1p 60s
        hours %= 24;
        minutes %= 60;
        seconds %= 60;
        document.getElementById('ngay').innerHTML = days;
        document.getElementById('gio').innerHTML = hours;
        document.getElementById('phut').innerHTML = minutes;
        document.getElementById('giay').innerHTML = seconds;
        // console.log(days, hours, minutes, seconds);
        if (days < 0) {
            clearInterval(countdown);
            document.getElementById('ngay').innerHTML = "00";
            document.getElementById('gio').innerHTML = "00";
            document.getElementById('phut').innerHTML = "00";
            document.getElementById('giay').innerHTML = "00";
        }
    }, 1000
)
//Dung Dem nguoc


