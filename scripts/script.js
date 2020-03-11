let $itemInCart;

function Order(date,time,items,sum){
    this.date = date,
    this.time = time,
    this.items = items,
    this.sum = sum
}

$(document).ready(function () {
    $clear = $('#clear');

//fyller sidan från Json
    $.getJSON("data/data.json", function (response, status, xhr) {
        console.log(response.products.length);
        let $divcontent="";
        for(let i = 0; i< response.products.length; i++) {
        $divcontent += "<div class='items'"+"id=p"+(i+1)+">" + 
                            "<div class='pImg'>"+
                                 "<img src=" + response.products[i].image + ">" + 
                            "</div>"+
                            "<div class='pInfo'>"+
                                "<p class='name'>" + response.products[i].name + "</p>" +
                                "<p class='price'>" + response.products[i].price + "KR</p>" +
                            "</div>"+
                            "<div class='amount'>"+
                                "<button class='add' onclick='addNum(this)'>+</button>"+
                                "<input type='text' id='num' placeholder='0'></input>"+
                                "<button class='minus' onclick='minusNum(this)'>-</button>" +
                            "</div>"+
                        "</div> ";
            }
        $("#products").html($divcontent);
        
    });

    $clear.click(function(){
        localStorage.clear();
        $('#myList').empty();
        $(".items").find("input#num").val('0');
    });

    $('#confirm').on('click',(function(){
        let  dateInfo = new Date();
        let date = dateInfo.toLocaleDateString();
        let time = dateInfo.toLocaleTimeString();
        let items = [];
        let $orders = $('#myList .itemsCart');
        $orders.each(function(index,order){
            //console.info(order)
            let src = $(order).find("img").attr('src');
            let name = $(order).find('p.name').text();
            let price = $(order).find('p.price').text();
            let amount = $(order).find('input#num').val();
            //console.info(src +", "+name+", "+price+", "+amount);
            items.push({img:src, name:name,price:price,amount:amount});
        });
        let sum = $('p#sum').text().substr(5);

        let order = new Order(date,time,items,sum);
        console.info(sum);
        localStorage.setItem('order',JSON.stringify(order));
        window.open('order.html');
    }));
});

//Make + button rise the number
function addNum(obj) {
    let $cartlist = $('#myList');
    let value = $(obj).next().val(); 
    let idCart = $(obj).parents('div[class=items]').attr('id')+'Cart';   
    value++;
    
    if(value==1) {
        $itemInCart = $(obj).parents('div[class=items]').clone(true);
        
        $itemInCart.attr('id',idCart).attr('class','itemsCart');
        //Add onclick property
        $itemInCart.find("button:first").attr('onclick','addCartNum(this)');
        $itemInCart.find("button:last").attr('onclick','minusCartNum(this)');
        $cartlist.append($itemInCart);
    }
    
    $(obj).next().val(value);
    $itemInCart = $('div#'+idCart);
    $itemInCart.find('input#num').val(value); 
    showSumma();
}

//Make - button lower the number
function minusNum(obj){
    let value = $(obj).prev().val();
    let pIdCart;
    if(value > 0){
        let pId = $(obj).parents('div[class=items]').attr('id');
        pIdCart = pId + 'Cart';
        value--;
        console.log(pIdCart + " , " +$('div#'+pIdCart).attr('id'));
        $('div#'+pIdCart).find('input#num').val(value);
    }

    if(value == 0 ){
        $('div#'+pIdCart).remove();
    }
 
    $(obj).prev().val(value);
    showSumma();
}

function addCartNum(obj) {
    let value = $(obj).next().val();
    value++;
    $(obj).next().val(value);
    let idCart = $(obj).parents('div[class=itemsCart]').attr("id");
    let end = idCart.lastIndexOf('C');
    let id = idCart.substr(0,end);
    $('div#'+id).find('input#num').val(value);
    showSumma();
}

function minusCartNum(obj) {
    let value = $(obj).prev().val();
    if(value > 0){
        value--;
    }
    $(obj).prev().val(value);
    if(value == 0){
        $(obj).parents('div[class=itemsCart]').remove();  
    }
    let idCart = $(obj).parents('div[class=itemsCart]').attr("id");
    let end = idCart.lastIndexOf('C');
    let id = idCart.substr(0,end);
    $('div#'+id).find('input#num').val(value);
    showSumma();
}

function showSumma (){
    let sum = 0;
    let $allProducts = $('div[class=items]');
    $allProducts.each(function(index,product){
        let price = $(product).find('p.price').text();
        let end = price.lastIndexOf('K');
        price = parseInt(price.substr(0,end));
        let amount = $(product).find('input#num').val();
        console.log("price: "+ price +",amount: "+amount); 
        sum += price * amount;
        console.log("Sum: "+sum);
    });
    $('div.orderControll > p').text('Sum: '+sum);
}