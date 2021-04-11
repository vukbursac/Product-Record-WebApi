$(document).ready(function () {

    //>>>>>>>>>>>>>>>>>GLOBAL VARIABLE INITIALIZATION ON START <<<<<<<<<<<<<<<<<<<<<<<<<
    var host = window.location.host;
    var token = null;
    var headers = {};
    var productsEndpoint = "/api/products";
    

    
    var editingId;
    //--------------------FIRST PAGE LOADING----------------------
    $("#logoutDiv").css("display", "none");
    $("#loginDiv").css("display", "none");
    $("#regForm").css("display", "block");



    //----------------------------------------------
    $("body").on("click", "#btnAlready", LoadLogin);

    function LoadLogin() {
        $("#loginDiv").css("display", "block");
        $("#regForm").css("display", "none");

    }
    //---------------------------------------------



    $("#btnPrijava").click(function () {
        $("#loginDiv").css("display", "block");
        $("#regForm").css("display", "none");
        $("#regPrijLogHead").addClass("hidden");
    });

    var productsUrl = "http://" + host + productsEndpoint;
    

    $.getJSON(productsUrl, setProducts);
    //>>>>>>>>>>>> BUTTONS ON CLICK <<<<<<<<<<<
    $("body").on("click", "#logoutBtn", reset);
    $("body").on("click", "#giveUpBtn", cleanForm);
    $("body").on("click", "#btnDelete", deleteProduct);
    $("body").on("click", "#prodaja", naknadnaProdaja);



    $("body").on("click", "#loginBtn", ulogujSe);


    $("body").on("click", "#regBtn", loadRegistration);

    //>>>>>>>>>>>>>>>> CLEAN FORM <<<<<<<<<<<<<<

    function cleanForm() {
        //$("#createInput1select").val('');
        $("#createInput2").val('');
        $("#createInput3").val('');
        $("#createInput4").val('');
        $("#createInput5").val('');

    }

    //>>>>>>>> LOAD REGISTRATION FORM <<<<<<<<<<
    function loadRegistration() {
        $("#info").empty();
        $("#loginDiv").css("display", "block");
        $("#regForm").css("display", "none");
    }

    //>>>>>>>> LOAD LOGIN FORM<<<<<<<<<<
    $("body").on("click", "#jumpToLogin", reset);

    //>>>>>>>>>>>>>>> LOGOUT <<<<<<<<<<<<<<<
    function reset() {
        if (token != null) {
            token = null;
        }
        $("#loginDiv").css("display", "none");
        $("#regForm").css("display", "none");
        $("#logoutDiv").css("display", "none");
        $("#loggedInParagraph").empty();
        $("#create").addClass("hidden");
        $("#pFirst").empty();
        $("#pSecond").empty();
        $("#loginDiv").css("display", "none");
        $("#regForm").css("display", "block");
        $("#info").empty();

       
     
        $.getJSON(productsUrl, setProducts);

    }

    //----------------------------- REGISTRATION---------------------------

    $("#registration").submit(function (e) {
        e.preventDefault();

        var email = $("#regEmail").val();
        var loz1 = $("#regPass").val();
        var loz2 = $("#regPass2").val();


        var sendData = {
            "Email": email,
            "Password": loz1,
            "ConfirmPassword": loz2
        };

        $.ajax({
            type: "POST",
            url: 'http://' + host + "/api/Account/Register",
            data: sendData

        }).done(function (data) {

            $("#regEmail").val('');
            $("#regPass").val('');
            $("#regPass2").val('');
            $("#loginDiv").css("display", "block");
            $("#regForm").css("display", "none");


            $("#postReg").removeClass("hidden");





        }).fail(function (data) {
            alert("Your Registration failed! Try Again!");
        });
    });
    //-----------------------LOGIN------------------------

    function ulogujSe() {

        var email = $("#loginEmail").val();
        var loz = $("#loginPass").val();

        var sendData = {
            "grant_type": "password",
            "username": email,
            "password": loz
        };

        $.ajax({
            "type": "POST",
            "url": 'http://' + host + "/Token",
            "data": sendData

        }).done(function (data) {
            console.log(data);
            $("#info").empty().append("Logged in user: " + data.userName);

            token = data.access_token;
            console.log(token);
            $("#loginEmail").val('');
            $("#loginPass").val('');
            $("#loginDiv").css("display", "none");
            $("#regForm").css("display", "none");
            $("#loggedInParagraph").append("Logged in user: " + "<b>" + email + "</b>");
            $("#logoutDiv").css("display", "block");
            $.getJSON(productsUrl, setProducts);
            

            $("#data").css("display", "block");
            $("#create").removeClass("hidden");
            $("#search").removeClass("hidden");
            $("#tradition").removeClass("hidden");
            $("#regPrijLogHead").addClass("hidden");
            $("#postReg").addClass("hidden");
            $("#sTrad").removeClass("hidden");


        }).fail(function (data) {
            alert("Your login attempt failed! Try Again!");
        });

    };

    //>>>>>>>>>>>>>> Adding main entity(product) <<<<<<<<<<<<<<<<<<<<<<<<<

    $("#create").submit(function (e) {

        e.preventDefault();




        var naziv = $("#createInput2").val();
        var kupovna = $("#createInput3").val();
        var prodajna = $("#createInput4").val();
        var opis = $("#createInput5").val();
        var profit = prodajna - kupovna;


        
        $("#validationMsgInput1").empty();
        $("#validationMsgInput2").empty();
        $("#validationMsgInput3").empty();


        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        var dataCreate = {

            "Name": naziv,
            "PurchasePrice": kupovna,
            "SellingPrice": prodajna,
            "Profit": profit,
            "Description" : opis

        }
        httpAction = "POST";

        $.ajax({
            "url": productsUrl,
            "type": httpAction,
            "data": dataCreate,
            "headers": headers
        })
            .done(function (data, status) {
                $.getJSON(productsUrl, setProducts);
                //$("#createInput1select").val('');
                $("#createInput2").val('');
                $("#createInput3").val('');
                $("#createInput4").val('0');
                $("#createInput5").val('');

               

              
            })
            .fail(function (data, status) {
                validation();
            })

    })



    

    
    // ---------------- SETTING PRODUCTS IN TABLE ------------------------
    function setProducts(data, status) {
        
        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        var $container = $("#data");
        $container.empty();

        if (status == "success") {
            // ispis naslova
            var div = $("<div></div>");
            div.append(h1);
            // ispis tabele
            var table = $("<table class='table table-bordered'></table>");
            if (token) {
                var h1 = $("<h1 style='text-align:center'>Products</h1>");

                var header = $("<tr class='text-center' style='background-color:Gainsboro'><td  style='padding:7px; width:400px'>Name</td><td style = 'width:150px; padding:7px'>Purchase price</td><td style = 'width:250px; padding:7px'>Selling price</td><td style = 'width:150px; padding:7px'>Profit</td><td style='width:auto'>Description</td><td style='width:auto'>Delete</td></tr>");
            }

            //-----------------------------CODE IF YOU WANT TO SEE TABLE WHEN LOGGED OUT ----------------------------------------------------
            /*else {
            var h1 = $("<h1 style='text-align:center'>Products</h1>");

                var header = $("<tr class='text-center' style='background-color:Gainsboro'><td  style='padding:7px; width:150px'>Name</td><td style = 'width:150px; padding:7px'>Purchase price</td><td style = 'width:150px; padding:7px'>Selling price</td><td style = 'width:150px; padding:7px'>Profit</td><td style='width:auto'>Description</td></tr>");

            }*/
            

            table.append(header);
            tbody = $("<tbody></tbody>");
            for (i = 0; i < data.length; i++) {

                data[i].Profit = data[i].SellingPrice - data[i].PurchasePrice;

                // ----------------------DELETE BUTTON----------------------------
                var stringId = data[i].Id.toString();
                var displayDelete = "<td><button href=\"#\" id=btnDelete class='btn btn-default' style='color:white; background-color: red' name=" + stringId + ">Delete</button></td>";

                //------------------------------------------------------------IF PRODUCT ISN'T SOLD YET THIS IS CODE FOR INPUT AND BUTTON --------------------------------------------

                var displayPrice = "<form action='javascript:void(0)' id='change-selling-price' class='form-inline'><input class='form-control' type='number'  ; style = 'width: 75px' float: left id='prodajnanova'/><button id ='prodaja' class='btn' style='width: 35px; color: black; background-color: lawngreen; float: right; 'name=" + stringId + ">.</button ></form > "
                

                // prikazujemo novi red u tabeli
                var row = "";
                // prikaz podataka
                

                if (data[i].Profit > 0) {

                    var displayData = "<tr style='background-color:PaleGreen'><td style='padding:7px;text-align:center'>" + data[i].Name + "</td><td style='padding:7px;text-align:center'>" + data[i].PurchasePrice + "</td>" + "<td style='width:100px;padding:7px;text-align:center'>" + data[i].SellingPrice + "</td>" + "<td  style='padding:7px;text-align:center'>" + data[i].Profit + "</td>" + "<td  style='padding:7px;text-align:center'>" + data[i].Description + "</td>";


                }

                //------------------------------------------------------------------WHOLE ROW WHEN PRODUCT ISN'T SOLD ------------------------------------------------------
                else {
                    if (data[i].SellingPrice == 0 || data[i].SellingPrice === undefined) {
                        var displayData = "<tr style='background-color:White'><td class='product-name' style='padding:7px;text-align:center'>" + data[i].Name + "</td><td class='product-pp' style='padding:7px;text-align:center'>" + data[i].PurchasePrice + "</td>" + "<td style='padding:7px;text-align:center'>" + displayPrice + "</td>" + "<td  style='padding:7px;text-align:center'></td>" + "<td class='product-desc' style='padding:7px;text-align:center'>" + data[i].Description + "</td>";
                    }
                    else {
                        var displayData = "<tr style='background-color:PaleVioletRed' ><td style='padding:7px;text-align:center'>" + data[i].Name + "</td><td style='padding:7px;text-align:center'>" + data[i].PurchasePrice + "</td>" + " <td style ='padding:7px;text-align:center' > " + data[i].SellingPrice + "</td > " + " <td style = 'padding:7px;text-align:center' > " + data[i].Profit + "</td > " + " <td  style = 'padding:7px;text-align:center' > " + data[i].Description + "</td > ";
                    }

                }



                data[i].SellingPrice = $("#createInput4").val();
               
                
               
                
             //-----------------------------CODE FOR TABLE WHEN LOGGED IN ----------------------------------------------------

                if (token) {
                    row += displayData + displayDelete + "</tr>";
                }
            //-----------------------------CODE IF YOU WANT TO SEE TABLE WHEN LOGGED OUT ----------------------------------------------------

                /*else {
                    row += displayData + "</tr>";
                }*/


                // -------------------------ROW APPEND----------------------------------
                tbody.append(row);
            }
            table.append(tbody);

            div.append(table);
            

            // -------------------NEW CONTENT------------------------------------------
            $container.append(div);
        }
        else {
            var div = $("<div></div>");
            var h1 = $("<h1>Error during your last action!</h1>");
            div.append(h1);
            $container.append(div);
        }
    };





    //>>>>>>>>>>>>>>>>>>>> REMOVING ENTITY FROM TABLE ON BUTTON DELETE <<<<<<<<<<<<<<<<<<<<<<<
    function deleteProduct() {
        var deleteId = this.name;
        console.log(this.name);
        httpAction = "DELETE";

        if (token) {
            headers.Authorization = "Bearer " + token;
        }
        var productsUrl = "http://" + host + productsEndpoint;
        $.ajax({
            "url": productsUrl + "?id=" + deleteId,
            "type": httpAction,
            "headers": headers

        })
            .done(function (data, status) {
                productsUrl = "http://" + host + productsEndpoint;
                $.getJSON(productsUrl, setProducts);

            })
            .fail(function (data, status) {

                alert("Error during your last action!!")
            })

    };
    //------------------------- FUNCTION FOR ADDING SELLING PRICE TO UNSOLD PRODUCT ------------------------------------------

    function naknadnaProdaja() {

       

        if (token) {
            headers.Authorization = "Bearer " + token;
        }
        var editingId = this.name;
        
       
        var prodajna = $("#prodajnanova").val();
        

        var name = $(this).closest("tr").find(".product-name").text();
        var price = $(this).closest("tr").find(".product-pp").text();
        var desc = $(this).closest("tr").find(".product-desc").text();
        var profit = prodajna - price;




       

        var editUrl = productsUrl + "?id=" + editingId;
        var data = {
            "Id": editingId,
            "Name": name,
            "PurchasePrice" : price,
            "SellingPrice": prodajna,
            "Profit": profit,
            "Description": desc
                  
            
        };
        $.ajax({
            "url": editUrl,
            "type": "PUT",
            "data": data,
            "headers": headers
        })
            .done(function (data, status) {

                $.getJSON(productsUrl, setProducts);
            })
            .fail(function (data, status) {
                alert("Error during your last action");
            });






    }
    

});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DATA VALIDATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function validation() {
    
    var name = $("#createInput2").val();
    var purchase = $("#createInput3").val();
    var selling = $("#createInput4").val();

    var pName = $("#validationMsgInput1");
    var pPrice = $("#validationMsgInput2");
    

    var isValid = true;

    if (!name) {
        pName.text("Product name is required!");
        isValid = false;
    }
    if (!purchase || purchase < 0) {
        pPrice.text("Purchase price must bre greater than 1!");
        isValid = false;
    }
    if (selling < 0) {
        pPrice.text("Purchase price must bre greater than 1!");
        isValid = false;
    }

    return isValid;
}