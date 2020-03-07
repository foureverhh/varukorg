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
        $divcontent += "<div class='items'>" + 
                        "<img src=" + response.products[i].image + ">" + 
                        "<p class='name'>" + response.products[i].name +
                        "<p class='price'>" + response.products[i].price + " KR</p>" +
                        "<button class='add'>add</button>" + "</div> ";
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