/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * chatbot module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox',
    'ojs/ojinputtext', 'ojs/ojbutton'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function chatbotContentViewModel() {
        var self = this;

        self.userMsg = ko.observable();

        if (self.userMsg() !== undefined)
            console.log(self.userMsg());


//        $('#button').click(function () {
//            $.ajax('/', function (list) {
//                $.ajax({
//                    type: 'POST',
//                    url: '/do-work',
//                    data: $('#myField').text(),
//                    success: function (result) {
//                        console.log('Response:', result);
//                    }
//                });
//            });
//        });



        function getJSessionId() {
            var jsId = document.cookie.match(/JSESSIONID=[^;]+/);
            if (jsId !== null) {
                if (jsId instanceof Array)
                    jsId = jsId[0].substring(11);
                else
                    jsId = jsId.substring(11);
            }
            console.log("SESSION ID!!!!!!!!");
            console.log(jsId);
            return jsId;
        }

        $(document).ready(function () {

            var queryResponse;
            $.ajax({
                url: 'http://localhost:8080/RestTest/resources/com.airhacks.chatline/userId/2',
                method: 'GET',
                dataType: "xml",
                crossDomain: true,
                success: function (responseXML) {
                    var xmlFromQuery = responseXML;

                    var txt = "";
                    var x = responseXML.getElementsByTagName('chatLine');
                    console.log(x);
                    for (i = 0; i < x.length; i++) {
                        //txt += x[i].find('chatLine').find('botResponse').text();

                        var Robotxt = x[i].firstChild.innerHTML;
                        var Usertxt = x[i].getElementsByTagName('lineText')[0].textContent;
                        console.log(Robotxt);
                        $(".chat").append('<li class="self"><div class="avatar"></div><div class="msg"><p>' + Usertxt + '</p></div></li>');
                        $(".chat").append('<li class="other"><div class="avatar"></div><div class="msg"><p>' + Robotxt + '</p></div></li>');
                    }

                    console.log("-------------------");
                    var chatLine = $(responseXML).find("chatLines").find('chatLine').find('botResponse').text();
                    console.log(chatLine);



                    console.log("APEL QUERY DB --------------");
                    console.log(responseXML);
                    queryResponse = responseXML;
                    console.log(queryResponse.getElementsByTagName('chatLines')[0].firstChild.nodeValue);
                    
                }
            });

        })

        //ON PRESSING THE "ENTER" KEY
        $(document).keypress(function (e) {


            if (e.keyCode === 13) {
                $('#userfield').val('');
            }


            if (e.which === 13) {
//                alert("BAM");
//                var allLi = document.getElementsByTagName('li');

                var li = document.createElement("li");
                li.class = "self";
//                console.log(document.getElementByClassName("chat")[0]);
                var container = document.getElementsByTagName("ol")[0];
                var lastchild = container.lastChild;
                console.log(lastchild);

                function receive(saveData) {
                    if (saveData === null) {
                        console.log("DATA IS UNDEFINED!");  // displays every time
                    }
                    console.log("Success is " + saveData);  // 'Success is undefined'
                }

                var botResponse;
                $.ajax({
                    url: 'http://127.0.0.1:5000/converse',
                    data: {
                        'q': self.userMsg(),
                        'session_id': '1243'
                    },
                    method: 'GET',
                    crossDomain: true,
                    success: function (response) {
                        console.log("A MERS");
                        console.log(response, response.msg);
                        botResponse = JSON.stringify(response.msg);
                        console.log(botResponse);
                        $(".chat").append('<li class="other"><div class="avatar"></div><div class="msg"><p>' + botResponse + '</p></div></li>');
                    }
                });

                $(".chat").append('<li class="self"><div class="avatar"></div><div class="msg"><p>' + self.userMsg() + '</p></div></li>');

            }
        });









    }

    return chatbotContentViewModel;
});
