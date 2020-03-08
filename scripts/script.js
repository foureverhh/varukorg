let $itemInCart;

$(document).ready(function () {
    $clear = $('#clear');
    $array=JSON.parse(localStorage.getItem("myList"));
    $add = $('.add');


    //om array är null (localstorage är tom) vi får undefined. Så, vi behöver initiera arrayen
    if ($array==null)
            $array = [];
    
    //RELOAD kopplad med .ready, så att det händer i början

    for(let i=0; i<$array.length; i++){
            $name= JSON.parse(localStorage.getItem("myList"))[i].name;
            $price= JSON.parse(localStorage.getItem("myList"))[i].price;
            $('#myList').append("<li class='list-group-item'><div>"+$name +"<br>" + $price + "</div></li>");
        }


//fyller sidan från Json
    $.getJSON("data/data.json", function (response, status, xhr) {
        console.log(response.products.length);
        //console.log(status);
        //console.log(xhr);
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

    //det ska bli nåt annat... 

    $("#prova").click(function(){
       
        //let $input = $("#input").val();
        //if ($input !=""){
            $('#myList').append("<li class='list-group-item'><div>" +"variabel namn<br>variabelpris"   /*$input*/ + "</div></li>");
            $array.push({name: "variabelnam", price: "variabel pris"});
            //$('#input').val('');
            localStorage.setItem("myList", JSON.stringify($array));
        //}

    });

    $clear.click(function(){
        console.log("klikkade!")
        localStorage.clear();
        $('#myList').empty();
        $array = [];
    });
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
    //console.log($itemInCart.find('input#num').val()+', '+$itemInCart.find('input#num').attr('id') + ',' +value,+ ',' + idCart);  
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
    //console.log($allProducts);
    $allProducts.each(function(index,product){
        let price = $(product).find('p.price').text();
        let end = price.lastIndexOf('K');
        price = parseInt(price.substr(0,end));
        let amount = $(product).find('input#num').val();
        //console.log(amount); 
        sum += price * amount;
    });
    $('div.orderControll > p').text('Sum: '+sum);
}
/*
        
        $clear = $('#clear');
        $array=JSON.parse(localStorage.getItem("myList"));

        if ($array==null)
                $array = [];
        
        for(let i=0; i<$array.length; i++){
                $element= JSON.parse(localStorage.getItem("myList"))[i].name;
                $('#list').append("<li class='list-group-item'>" + $element + "</li>");
            }


        $add.click(function(){
            let $input = $("#input").val();
            if ($input !=""){
                $('#list').append("<li class='list-group-item'>" + $input + "</li>");
                $array.push({name: $input, price: 200});
                $('#input').val('');
                localStorage.setItem("myList", JSON.stringify($array));
            }

        });


        $clear.click(function(){
            localStorage.clear();
            $('#list').empty();
            $array = [];
        });

        */