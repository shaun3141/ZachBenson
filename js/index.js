
$(document).ready(function(){
    $('.slider').slider({full_width: true, interval: 3000});
});

// enable smooth scrolling
$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});

// Email Stuff
$(".inputEditable").focus(function() {
    if ($(this).hasClass("placeholderText")) {
        $(this).removeClass("placeholderText");
        $(this).html("");
    }            
});

var numEmailsSent = 0;
var isOnSite = false;

function sendEmailClick() {

    var content = "<b>Name:</b> " + $('#name1').html() + "<br>";
    content += "<b>Email:</b> " + $('#email1').html() + "<br>";
    content += "<b>Message:</b> " + $('#message1').html();

    if ($('#contactName').html() == "" || $('#contactEmail').html()=="" || $('#contactMessage').html()==""){
        alert("Make sure all contact fields are filled out!")
    }
    else{
        if (numEmailsSent > 3 || !isOnSite){
            // do nothing
        }
        else{
            numEmailsSent++;

            // make post to Mandrill to send email
            $.ajax({
                type: "POST",
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                data: {
                    'key': 'vxE8QtaAhO3q7bZbFkq5DA',
                    'message': {
                    'from_email': 'benson.zach@gmail.com',
                    'to': [
                        {
                        'email': 'benson.zach@gmail.com',
                        'type': 'to'
                        }
                    ],
                    'autotext': 'true',
                    'subject': 'New Message from ' + $('#name1').html(),
                    'html': content
                    }
                }
                }).done(function(response) {
                    console.log(response); // if you're into that sorta thing
                    $('#send1').html("Sent!");
            });
        }
    }



}

// button callback
$('#send1').click(function(){
    isOnSite = true;
    sendEmailClick();   
});