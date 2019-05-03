$(document).ready(function(){ 
    checkUsername();
    checkPassword();
    checkEmail();
    var signup = $(".btn#signup");
    var uErr = $(".user.error");
    var emErr = $(".email.error");
    var pwErr = $(".pass.error");
    var cpwErr = $(".cnfmPass.error");
    function checkEmail(){
        $("input#email").on('keyup', function(){
            var email = $("#email").val();
            $.ajax({ 
            url: "https://api.mlab.com/api/1/databases/events/collections/users?apiKey=6tUOcgEycXkPBDS6QAVDF13wOHcNnf3O",
            data: JSON.stringify({
                "email": email
            }),
            type: "GET",
            contentType: "application/json",
            success:function(response) {
                for (var i = 0; i < response.length; i++) {
                    if (email == response[i].email){
                        error = "Email address has been taken. Please try another email address."
                        emErr.html(error);
                        signup.removeClass("emailValid");
                    } else {
                        error = "";
                        emErr.html(error);
                        signup.addClass("emailValid");
                    }
                }
            }, error:function(response) {
                console.log("Failed to sign up: " + response);
            }
        })
        })
    }
    function checkUsernameTaken(){
        $.ajax({ 
            url: "https://api.mlab.com/api/1/databases/events/collections/users?apiKey=6tUOcgEycXkPBDS6QAVDF13wOHcNnf3O",
            data: JSON.stringify({
                "username": username
            }),
            type: "GET",
            contentType: "application/json",
            success:function(response) {
                for (var i = 0; i < response.length; i++) {
                    if (username == response[i].username){
                        error = "Username has been taken. Please try another username.";
                        uErr.html(error);
                        signup.removeClass("userValid");
                    } else {
                        error = "";
                        uErr.html(error);
                        signup.addClass("userValid");
                    }
                }
                
            }, error:function(response) {
                console.log("Failed to sign up: " + response);
            }
        })
    }
    function checkUsername(){
    $("input#username").on('keyup', function(){
        var username = $("#username").val();
        var error = "";
        var illegalChars = /\W/; // allow letters, numbers, and underscore
        
        if (username == "") {
            error = "&bull; Please enter Username<br>";
            uErr.html(error);
            signup.removeClass("userValid");
        } else if ((username.length < 5) || (username.length > 15)) {
            error = "&bull; Username must have 5-15 characters<br>";
            uErr.html(error);
            signup.removeClass("userValid");
        } else if (illegalChars.test(username)) {
        error = "&bull; Please enter valid Username. Use only numbers and alphabets<br>";
            uErr.html(error);
            signup.removeClass("userValid");

        } else {
            checkUsernameTaken();
            }
        })
            
        }
    
    function checkPassword(){
    $("input#password").on('keyup', function(){
        var password = $("#password").val();
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;  
        var numbers = /[0-9]/g;
        var error = "";
        if (password == ""){
            error = "&bull; Please enter your password<br>";
            pwErr.html(error);
            signup.removeClass("passValid");
        } else if (!lowerCaseLetters.test(password)){ 
            error = "The password must contain a minimum of 1 lower case letter [a-z]";
            pwErr.html(error);
            signup.removeClass("passValid");
        } else if (!upperCaseLetters.test(password)){
            error = "The password must contain a minimum of 1 upper case letter [A-Z]";
            pwErr.html(error);
            signup.removeClass("passValid");
        } else if (!numbers.test(password)){
            error = "The password must contain a minimum of 1 numeric character [0-9]";
            pwErr.html(error);
            signup.removeClass("passValid");
        } else if (password.length < 8){
            error = "Passwords must be at least 8 characters long.";
            pwErr.html(error);
            signup.removeClass("passValid");
        } else {
            error = "";
            pwErr.html(error);
            signup.addClass("passValid");
            return true;

        };
        
        $("input#cnfmPassword").on('keyup', function(){
            var password = $("#password").val();
            var cnfmPassword = $("#cnfmPassword").val();
            console.log(cnfmPassword)
            if (password !== cnfmPassword){
                error = "Password mismatch.<br>"
                cpwErr.html(error);
                signup.removeClass("cnfmPassValid");
            } else {
                error = "Password matched.";
                cpwErr.html(error);
                signup.addClass("cnfmPassValid");
                return true;
            }
        })
    });
    }
    

    signup.on('click', function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var email = $("#email").val();
        checkUsernameTaken();
        if
            (signup.hasClass("userValid") && signup.hasClass("passValid") && signup.hasClass("cnfmPassValid") &&
            signup.hasClass("emailValid"))
        {
            $.ajax({ 
                url: "https://api.mlab.com/api/1/databases/events/collections/users?apiKey=6tUOcgEycXkPBDS6QAVDF13wOHcNnf3O",
                data: JSON.stringify({
                    "username": username,
                    "password": password,
                    "email": email
                }),
                type: "POST",
                contentType: "application/json",
                success:function(response) {
                    alert("Great! You have successfully signed up. You may now login.")
                    console.log("Signed up!"); 
                }, error:function(response) {
                    console.log("Failed to sign up: " + response);
                }
                })
         
        
            console.log("can!" + username + password + email);
            
            
        };

    })


//--------------------end of sign up-----------------//

//-------------------sign in begins here----------------------//
var lgBtn = $(".btn#login");
var userId;
var userLogin;

$("input#userLogin").on('keyup', function(){
    var userLogin = $("#userLogin").val();
    var emailLogin = $("#userLogin").val();
    $.ajax({ 
            url: "https://api.mlab.com/api/1/databases/events/collections/users?apiKey=6tUOcgEycXkPBDS6QAVDF13wOHcNnf3O",
            data: JSON.stringify({
                "username": userLogin,
                "email": emailLogin
            }),
            type: "GET",
            contentType: "application/json",
            success:function(response) {
                for (var i = 0; i < response.length; i++) {
                    if(userLogin == response[i].username){
                        console.log(response);
                        lgBtn.addClass("userValid");
                        userId = response[i]._id.$oid;
                        break;
                    } else if (emailLogin == response[i].email){
                        lgBtn.addClass("userValid");
                        userId = response[i]._id.$oid;
                        break;
                    } else {
                        lgBtn.removeClass("userValid");           
                    }
                }
        
            }, error:function(response) {
                console.log("Failed to sign up: " + response);
            }
    })
    
   
})

$("input#pwLogin").on('keyup', function(){
    var pwLogin = $("#pwLogin").val();

    $.ajax({ 
            url: "https://api.mlab.com/api/1/databases/events/collections/users?apiKey=6tUOcgEycXkPBDS6QAVDF13wOHcNnf3O",
            data: JSON.stringify({
                "password": pwLogin
            }),
            type: "GET",
            contentType: "application/json",
            success:function(response) {
                for (var i = 0; i < response.length; i++) {
                    if(pwLogin == response[i].password){
                        console.log(response);
                        localStorage.setItem("password", pwLogin)
                        lgBtn.addClass("passValid");
                        break
                    } else {
                        lgBtn.removeClass("passValid");
                    }
                }
        
            }, error:function(response) {
                console.log("Failed to sign up: " + response);
            }
    })
})

    $(lgBtn).on('mouseover', function(){
        if
            ($(this).hasClass("userValid") && $(this).hasClass("passValid")){
                console.log("Can log in!")
                $(this).addClass("check");
            } else {
                $(this).removeClass("check");
            }
    })
    $("input").on('change', function(){
        if
            (signup.hasClass("userValid") && signup.hasClass("passValid") && signup.hasClass("cnfmPassValid") &&
            signup.hasClass("emailValid")){
                signup.addClass("check");
            } else {
                signup.removeClass("check");
            }
        
        
    })
    
lgBtn.on('click', function(){
    if(lgBtn.hasClass("userValid") && lgBtn.hasClass("passValid")){
        var url = "https://api.mlab.com/api/1/databases/events/collections/users/"+userId+"?apiKey=6tUOcgEycXkPBDS6QAVDF13wOHcNnf3O";
        alert(url);
        $.ajax({ 
            url: url,
            data: JSON.stringify({ "$set": {"signed-in" : true} }),
            type: "PUT",
            contentType: "application/json",
            success:function(response){
                alert("Update successful:" + response);
                window.location.href = "loggedin.html";
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (regex.test(userLogin)){
                    $.ajax({ 
                    url: "https://api.mlab.com/api/1/databases/events/collections/users?apiKey=6tUOcgEycXkPBDS6QAVDF13wOHcNnf3O",
                    data: JSON.stringify({
                        "email": userLogin
                    }),
                    type: "GET",
                    contentType: "application/json",
                    success:function(response) {
                        for (var i = 0; i < response.length; i++) {
                            if(userLogin == response[i].email){
                                var username = response[i].username;
                                localStorage.setItem("username", username);
                                 var userName = localStorage.getItem("username", username)
                                console.log(userName);
                                $("span.name").text(userName);  
                            }
                        }

                    }, error:function(response) {
                        console.log("Failed to sign up: " + response);
                    }
                    })
                } else { 
                    localStorage.setItem("username", userLogin);
                    $("span.name").html(userLogin)
                }
            }
        });
        
        
        
    }
})
    
});
