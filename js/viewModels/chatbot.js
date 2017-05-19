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
            return jsId;
        }


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
                        'session_id': getJSessionId()
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
