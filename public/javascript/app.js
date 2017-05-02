$(document).ready(function() {
  $('.sidebar-nav').hide();
    $.ajax({
        url: "http://localhost:8081/session",
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log("jgh", data.session);
            console.log(data);
            if (data.session == true) {
                loginSuccessPage();
            }
        }
    });
    // $("#menu-toggle").click(function(e) {
    //         e.preventDefault();
    //         $("#wrapper").toggleClass("toggled");
    //     });
    /**/
    // var makecard = function(){
    //     var st =  ;
    //     return st;
    // }
    function generateWholeNo(number) {
        return Math.floor((Math.random() * number));
    }
    // function makeArray(count, content) {
    //    var result = [];
    //    if(typeof content == "function") {
    //       for(var i = 0; i < count; i++) {
    //          result.push(content(i));
    //       }
    //    } else {
    //       for(var i = 0; i < count; i++) {
    //          result.push(content);
    //       }
    //    }
    //    return result;
    // }
    $(function($) {
        $.fn.editableContent = function() {
            return this.html().replace("<div>", "<br>");
        };
    });
    var readcards = function() {
        $.ajax({
            type: "GET",
            // data: carddata,
            dataType: "json",
            url: "http://localhost:8081/readcard",
            success: function(data) {
                console.log("data", data);
                if (data.status == true) {
                    console.log(data.message);
                    $('.notes').html('');

                    for (var i = data.message.length - 1; i >= 0; i--) {
                        tit = "title" + i;
                        con = "content" + i;
                        console.log(tit);

                        // var div = $("<div class='note' id=''><div class='card-2'><div class='title' id=" + tit + "></div><div id='content'><div class='insidecontent' id="+ con +"></div></div></div>").appendTo(".notes");
                        var div = $("<div class=' note'><div class='note-inner' ><div class='title' id=" + tit + "></div><div id='content'><div class='insidecontent' id=" + con + "></div></div></div>").appendTo('.notes');
                        var border = div.css('word-wrap', 'break-word').css('width','228');
                        $("#" + con).append(data.message[i].description);
                        $("#" + tit).append(data.message[i].title);

                        var pckry = new Packery('.notes', {
                            itemSelector: '.note',
                            gutter: 20
                        });

                        pckry.getItemElements().forEach(function(itemElem) {
                            var draggie = new Draggabilly(itemElem);
                            pckry.bindDraggabillyEvents(draggie);
                        });


                        // $(".slides").sortable({
                        //         placeholder: 'slide-placeholder',
                        //         axis: "z",
                        //         revert: 150,
                        //
                        //         start: function(e, ui) {
                        //           console.log("start method");
                        //             console.log(ui.item.outerHeight());
                        //             placeholderHeight = ui.item.outerHeight();
                        //             ui.placeholder.height(placeholderHeight + 15);
                        //             console.log(ui.placeholder);
                        //             $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
                        //
                        //         },
                        //         change: function(event, ui) {
                        //           console.log("change method");
                        //
                        //             ui.placeholder.stop().height(0).animate({
                        //                 height: ui.item.outerHeight() + 15
                        //             }, 300);
                        //
                        //             placeholderAnimatorHeight = parseInt($(".slide-placeholder-animator").attr("data-height"));
                        //
                        //             $(".slide-placeholder-animator").stop().height(placeholderAnimatorHeight + 15).animate({
                        //                 height: 0
                        //             }, 300, function() {
                        //                 $(this).remove();
                        //                 placeholderHeight = ui.item.outerHeight();
                        //                 $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
                        //             });
                        //         },
                        //         stop: function(e, ui) {
                        //           console.log("stop method");
                        //             $(".slide-placeholder-animator").remove();
                        //         },
                        //     });
                    }
                } else {}
            },
            error: function(error) {

            }
        });
    }
    var savecards = function(carddata) {
        $.ajax({
            type: "POST",
            data: carddata,
            dataType: "json",
            url: "http://localhost:8081/createcard",
            success: function(data) {
                console.log("data", data);
                if (data.status == true) {
                    readcards();
                } else {

                }
            },
            error: function(error) {

            }
        });
    }

    $(document).on('click', "#donecard", (function(e) {
        console.log("hiiiiiiiiiii");
        var title = $('#taketitle').html();
        var description = $('#takecontent').html();
        var height = $('#inputbox1').height();
        var width = $('.notes').width()
        var w = width / 3;
        console.log(height);
        console.log(w);
        var data = {
            title: title,
            description: description,
            height: height,
            width: w
        }
        $("#taketitle").html('');
 $("#takecontent").html('');
        if (title == undefined && description == undefined || title == null && description == null || title == "" && content == "") {
            return;
        } else {
            savecards(data);
        }
    }));


    $(document).on('click', "#cretetodo", (function(e) {
        $("#inputbox1").show();
        $("#todonote").hide();
    }));

    $(document).on('keypress', "#taketitle", (function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
        }
    }));

    $(document).on('keyup', "#taketitle", (function(e) {
        var code = e.keyCode || e.which;
        if ($("#taketitle").html().trim().length == 0) {
            $("#btext").show();
        } else {
            $("#btext").hide();
        }
    }));

    $(document).on('keyup', "#takecontent", (function(e) {

        var code = e.keyCode || e.which;
        if ($("#takecontent").html().trim().length == 0) {
            $("#bcontent").show();
        } else {
            $("#bcontent").hide();
        }
    }));

    $("body").click(function(event) {
        if (event.target.id == "taketitle" || event.target.id == "takecontent" || event.target.id == "takeupdate") {
            return;
        }
        $("#inputbox1").hide();
        $("#todonote").show();

    });

    function validateForm() {
        var firstname = $('#exampleInputFirstNamelog').val();
        var lastname = $('#exampleInputLastName').val();
        var email = $('#exampleInputEnterEmail').val();
        var password = $('#exampleInputCreatePassword').val();
        var mobileno = $('#exampleInputMobileNo').val();
        var newmobileno = parseInt(mobileno);
        var nameval = /^[A-Za-z]+$/;
        var passval = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/;
        var emailval = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var mobileval = /^([7-9]{1}[0-9]{9})$/;
        var flag = true;
        $('.error').hide();
        if (firstname === "") {
            $('#exampleInputFirstNamelog').after('<br><br><span class="error" > Please enter your Name</span>');
            flag = false;
        } else if (!nameval.test(firstname)) {
            $('#exampleInputFirstNamelog').after('<br><br><span class="error"> Letters only</span>');
            flag = false;
        }
        if (lastname === "") {
            $('#exampleInputLastName').after('<br><br><span class="error"> Please enter your lastname</span>');
            flag = false;
        } else if (!nameval.test(lastname)) {
            $('#exampleInputLastName').after('<br><br><span class="error"> Letters only</span>');
            flag = false;
        }
        if (email === "") {
            $('#exampleInputEnterEmail').after('<br><br><span class="error" > Please enter your email address </span>');
            flag = false;
        } else if (!emailval.test(email)) {
            $('#exampleInputEnterEmail').after('<br><br><span class="error"> Please enter a valid email address</span>');
            flag = false;
        }
        if (password === "") {
            $('#exampleInputCreatePassword').after('<br><br><span class="error"> Please enter your  password</span>');
            flag = false;
        } else if (!passval.test(password)) {
            $('#exampleInputCreatePassword').after('<br><br><span class="error">atleast one alphabet,specialsymbol,numeric,uppercase Letters</span>');
            flag = false;
        }
        // if (confromPassword !== creatPassword || confromPassword === "") {
        //     $('#exampleInputConfirmPassword').after('<br><br><span class="error">please enter your password </span>');
        //     flag = false;
        // }
        if (!mobileval.test(newmobileno)) {
            $('#exampleInputMobileNo').after('<br><br><span class="error">please enter correct mobile no </span>');
            flag = false;
        }
        return flag;
    }
    /*
    constructor for create signup object
    */
    var User = function(firstname, lastname, email, password, mobileno) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.mobileno = mobileno;
    };
    var Userlogin = function(email, password) {
        this.email = email;
        this.password = password;
    };

    function loginSuccessPage() {
        window.location.hash = "";
        $.ajax({
            async: true,
            url: "loginValid.html",
            type: "GET",
            dataType: "text",
            success: function(response) {
                // console.log(response);
                $("#body").html(response);
                readcards();
            }
        });
    }

    function indexPage() {
        $.ajax({
            url: "index.html",
            type: "GET",
            dataType: "text",
            success: function(response) {
                $("#body").html(response);
            }
        });
    }
    $('#myNavbar').click('li', function() {
        $('#myNavbar').collapse('hide');
    });
    /*it is calling by login form submit button*/
    $(document).on("submit", "#login", (function(event) {
        var email = $('#exampleInputEmaillog').val();
        var password = $('#exampleInputPasswordpas').val();
        // var credentialsFlag = false;
        var userloginobj = new Userlogin(email, password);
        console.log("userobj is........", userloginobj);
        $.ajax({
            async: true,
            url: "http://localhost:8081/login",
            type: "POST",
            dataType: "JSON",
            data: JSON.stringify(userloginobj),
            contentType: 'application/json',
            success: function(data) {
                console.log("login response is........", data);
                if (data.status != true) {
                    $('span').remove();
                    $('#loginresult').after('<span class="error" id="sp">' + data.msg + '</span><br>');
                } else {
                    // console.log("cncjcjcjjkcjcc");
                    loginSuccessPage();
                }
            }
        });
        event.preventDefault();
    }));
    // $(function($){
    //                   $.fn.editableContent = function() {
    //                   return this.html().replace("<div>","<br>");
    //                     };
    //                 });
    //             $("#yourLink").click(function(e){
    //               var ksfksf = ($('#createtodo').editableContent());
    //               console.log(ksfksf);
    //                 $('#result').html(($('#createtodo').editableContent()));
    //               console.log($('#createtodo'));
    //
    //           });
    // $("#yourLink").click(function(e){
    //   var a = $('#createtodo').html();
    //   console.log(a);
    // });
    /*
    it is calling by signup-form  submit button
    */
    $(document).on("submit", "#signup-form", (function(event) {
        var firstname = $('#exampleInputFirstNamelog').val();
        var lastname = $('#exampleInputLastName').val();
        var email = $('#exampleInputEnterEmail').val();
        var password = $('#exampleInputCreatePassword').val();
        var mobileno = $('#exampleInputMobileNo').val();
        var newMobNo = parseInt(mobileno);
        // console.log("validation method result ",);
        if (validateForm()) {
            var userobj = new User(firstname, lastname, email, password, mobileno);

            $(':input', '#signup-form').not(':submit').val('');
            $.ajax({
                async: true,
                url: "http://localhost:8081/signup",
                type: "POST",
                dataType: "JSON",
                data: JSON.stringify(userobj),
                contentType: 'application/json',
                success: function(data) {
                    console.log(data);
                    $('span').remove();
                    $('#result').after('<span class="error">' + data.msg + '</span>');
                }
            });
        }
        event.preventDefault();
    }));
    /*
    it is calling by logout button fromlogin success page
    */
    $(document).on("click", "#logout-button", (function() {
        $.ajax({
            url: "http://localhost:8081/logout",
            type: "GET",
            success: function(data) {
                console.log("jgh", data.session);
                if (data.session == false) {
                    indexPage();
                }
            }
        });
    }));
    if (typeof window.location.origin === "undefined") {
        window.location.origin = window.location.protocol + "//" + window.location.host;
    }
    var utils = {
        renderPageTemplate: function(templateId, data) {
            console.log("templateId....", templateId);
            console.log("data......", data);
            var _data = data || {};
            var templateScript = $(templateId).html();
            var template = Handlebars.compile(templateScript);
            $("#page-container").empty();
            $("#page-container").append(template(_data));
        },
        pageNotFoundError: function() {
            var data = {
                errorMessage: "404 - Page Not Found"
            };
            this.renderPageTemplate("#error-page-template", data);
        },
    };
    var router = {
        routes: {},
        init: function() {
            this.bindEvents();
            $(window).trigger("hashchange");
        },
        bindEvents: function() {
            $(window).on("hashchange", this.render.bind(this));
        },
        render: function() {
            var keyName = window.location.hash.split("/")[0];
            // if(window.location.hash.split("/")[0]=="")
            // window.location.hash="#home";
            var url = window.location.hash;
            var log = $("#page-container").find(".active").hide().removeClass("active");
            if (this.routes[keyName]) {
                this.routes[keyName](url);
            } else {
                utils.pageNotFoundError();
            }
        }
    };
    var spaRoutes = {
        "": function(url) {
            utils.renderPageTemplate("#login-page-template");
        },
        "#login": function(url) {
            utils.renderPageTemplate("#login-page-template");
        },
        "#signup": function(url) {
            utils.renderPageTemplate("#signup-page-template");
        },
    };
    var spaRouter = $.extend({}, router, {
        routes: spaRoutes
    });
    spaRouter.init();
});


// $('.grid').isotope({
// set itemSelector so .grid-sizer is not used in layout
//   itemSelector: '.grid-item',
//   percentPosition: true,
//   masonry: {
//     // use element for option
//     columnWidth: '.grid-sizer'
//   }
// })
//
