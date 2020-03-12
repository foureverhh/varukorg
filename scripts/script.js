let $itemInCart;

function Order(date,time,items,sum){
    this.date = date,
    this.time = time,
    this.items = items,
    this.sum = sum
}

$(function () {
    $clear = $('#clear');
    $(":input").css('cursor','pointer');
    //fyller sidan från Json
    $.getJSON("data/data.json", function (response, status, xhr) {
        //console.log(response.products.length);
        for(let i = 0; i< response.products.length; i++) {
            let  divcontent = "<div class='items'"+"id=p"+(i+1)+">" + 
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

            $("#products").append(divcontent);
        }

    
        console.info($('.items').length);
        $('.items').each(function(index,item){
            //console.info(index + ", "+$(item).attr('id'));
            $(item).find('input#num').on('keyup',function(){
                let value = $(this).val()
                let id = $(this).parents('div[class=items]').attr('id');
                if(isNaN(value) || value < 0 || parseInt(value) != value){
                    alert("Illegal input, only integer larger than 0 is accepted");
                }else{
                    if($("#"+id+'Cart').length){ //if item is already in Cart
                        if(value == 0){
                            $("#"+id+'Cart').remove();
                        }else{
                            console.info($("#"+id+'Cart'));
                            $("#"+id+'Cart').find('input#num').val(value);
                        }
                    }else if(value !=0 ){               //item is not in Cart and amount is not 0
                        let idCart = id+"Cart";
                        //console.log(idCart);
                        $cartlist = $('#myList');
                        $itemInCart = $(this).parents('div[class=items]').clone(true);
                        $itemInCart.attr('id',idCart).attr('class','itemsCart');
                        //Add onclick property
                        $itemInCart.find("button:first").attr('onclick','addCartNum(this)');
                        $itemInCart.find("button:last").attr('onclick','minusCartNum(this)');
                        $cartlist.append($itemInCart);
                        
                        //Modify amount in Cart
                        let $itemsCart = $('.itemsCart');
                        console.log($itemsCart);
                        $itemsCart.each(function (index,itemCart) {  
                            $(itemCart).find('#num').on('keyup',function(){
                                let value = $(this).val();
                                let idCart = $(this).parents('div.itemsCart').attr("id");
                                let end = idCart.lastIndexOf('C');
                                let id = idCart.substr(0,end);
                                if(value == 0){
                                    $(this).parents('div.itemsCart').remove();
                                }
                                $('div#'+id).find('#num').val(value); 
                            });
                        });

                    }
                    showSumma();
                }
            }); 
        }); 
    });

    $clear.click(function(){
        localStorage.clear();
        $('#myList').empty();
        $(".items").find("input#num").val('0');
        $("p#sum").text("sum: 0");
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
        if( $(".itemsCart").length == 0){
            alert("You have chosen nothing!");
        } else {
            let order = new Order(date,time,items,sum);
            console.info(sum);
            localStorage.setItem('order',JSON.stringify(order));
            window.open('order.html');
        }
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
        //console.log("price: "+ price +",amount: "+amount); 
        sum += price * amount;
        //console.log("Sum: "+sum);
    });
    $('div.orderControll > p').text('Sum: '+sum);
}


