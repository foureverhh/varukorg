$(function() {
    let $date = $('.date span');
    let $time = $('.time span'); 
    let $orderDetails = $('.orderDetails');
    let order = JSON.parse(localStorage.getItem('order'));
    console.log(order);
    $date.text(order.date);
    $time.text(order.time);
    let items = order.items;
    //items.each(function(item){
    items.map((item) =>{
        let orderItem = '<div class="orderItem">' +
                            '<div class="itemImage">' + 
                                '<img src="' + item.img +'"/>' +
                            '</div>' +
                            '<div class ="itemName">' +
                                '<p>' + item.name + '</p>' +
                            '</div>' +
                            '<div class ="itemPrice" >' +
                                '<p>' + item.price + '</p>' +
                            '</div>' +
                            '<div class ="itemAmount">' +
                                '<p>' + item.amount + '</p>' +
                            '</div>' +
                        '<div/>';
        $orderDetails.append(orderItem);  
        console.info("price" + item.price+ " , amount" + item.amount )              
    });
    let sum = order.sum;
    $('.content').append('<div>Sum: '+ '<span>' + sum + '</span></div>');
    
});

