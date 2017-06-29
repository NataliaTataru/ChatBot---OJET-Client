/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * chatbot module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox',
    'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojtimezonedata'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function chatbotContentViewModel() {
        var self = this;

        self.userMsg = ko.observable();
        self.botResponseBig = ko.observable();
        
        $('.chat').animate({scrollTop: $('.chat').prop("scrollHeight")}, 1600)



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

            if (self.userMsg() !== undefined) {
                console.log("USER MESSAGE --------------");
                console.log(self.userMsg());
            }
            console.log(self.userMsg());

            var queryResponse;
            $.ajax({
                url: 'http://localhost:8080/RestTest/resources/com.airhacks.chatrest.chatline/userId2/2',
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



                        Robotxt.split(/\s*~\s*/).forEach(function (roboMSG) {
                            console.log(roboMSG);

                            $(".chat").append('<li class="other"><div class="avatar"></div><div class="msg"><p>' + roboMSG + '</p></div></li>');

                        });


                        $(document).scrollTop($(document).height());
                        $('.chat').scrollTop($('.chat')[0].scrollHeight);
                        var d = $('.chat');
                        d.scrollTop(d.prop("scrollHeight"));

//                        var elem = document.getElementsByClassName('chat');
//                        elem = elem.scrollHeight;


//                        $(".chat").append('<li class="other"><div class="avatar"></div><div class="msg"><p>' + Robotxt + '</p></div></li>');



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

        function formToJSON() {
            return JSON.stringify({
                "id": $('#id').val(),
                "name": $('#name').val(),
                "grapes": $('#grapes').val(),
                "country": $('#country').val(),
                "region": $('#region').val(),
                "year": $('#year').val(),
                "description": $('#description').val()
            });
        }


        $.support.cors = true;
        
        
//        function validateSamples() {
//            
//         
//            var inputForTraining1 = [{
//                    "text": "venitul meu este de 3400 RON",
//                    "entities": [
//                        {"entity": "intent",
//                            "value": "get_venit_lunar"},
//                        {"entity": "valoare_venit_lunar",
//                            "start": 21,
//                            "end": 25,
//                            "value": "3400"}],
//                }];
//            
//            return fetch('https://api.wit.ai/samples?v=20170307', {
//            method: 'POST',
//            mode: 'no-cors',
//            headers: {
//              Authorization: 'Bearer H6C3KOBY4KAGASXHC54VLSC3YMKLUFH3',
//              'Content-Type': 'application/json',
//            },
//            body: JSON.stringify(inputForTraining1),
//          })
//            .then(res => res.json());
//        };
//
//            validateSamples()
//                .then(res => console.log(res));
//        
        
        
        function train() {


            var inputForTraining = [{
                    "text": "venitul meu este de 3400 RON",
                    "entities": [
                        {"entity": "intent",
                            "value": "get_venit_lunar"},
                        {"entity": "valoare_venit_lunar",
                            "start": 21,
                            "end": 25,
                            "value": "3400"}],
                }];

             
                
            $.ajax({
                url: 'http://127.0.0.1:5000/samples',
                data: JSON.stringify(inputForTraining),
           
                method: 'GET',
                crossDomain: true,
              
                success: function (response) {
                    console.log("A MERS TRAINING");
                    console.log(response, response.msg);
                    botResponseTraining = JSON.stringify(response.msg);
                    console.log(botResponseTraining);
                }
            });
        }



        function insertConversation() {

//            train();

//            self.value = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(1, 0, 2013)));
            self.value = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
                    createConverter(
                            {
                                pattern: "yyyy-MM-dd HH:MM:SS"
                            }));

            self.value(new Date());

//            var year = date.getFullYear();
//            var month = date.getMonth();
//            var day = date.getDay();
//            var hours = date.getHours();
//            var minutes = date.getMinutes();
//            var seconds = date.getSeconds();
//            var d = new Date(year, month, day, hours, minutes, seconds);

            console.log("DATE************");
            console.log(self.value());

            var dateTime = new Date("2017-05-28 16:27:47");
            self.value("2017-05-28 16:27:47");
//            dateTime = dateTime.replace('T', ' ');

            var botResponseForDB = '';
            if (self.botResponseBig()) {
                console.log('RESPONSE OK');
                botResponseForDB = self.botResponseBig().replace(/['"]+/g, '');
            } else {
                console.log('RESPONSE NOT OK');
                botResponseForDB = 'Va rog sa repetati, nu am inteles.';
            }


            var conversation = {
                'id': 1,
                'chatId': 1,
                'userId': 2,
                'lineText': self.userMsg(),
                'createdAt': self.value().replace('T', ' '),
                'botResponse': botResponseForDB
            };
            console.log(JSON.stringify(conversation));
            console.log("BOT RESPONSE ________");
            console.log(self.botResponseBig().replace(/['"]+/g, ''));

            $.ajax({
                url: 'http://localhost:8080/RestTest/resources/com.airhacks.chatrest.chatline/insertConversationNativeGET2',
                data: JSON.stringify(conversation),
                contentType: "application/json",
                method: 'POST',
                crossDomain: true,
                success: function (response) {
                    console.log("INSERT ____________");

                }
            });
        }

        //ON PRESSING THE "ENTER" KEY
        $(document).keypress(function (e) {


            if (e.keyCode === 13) {
                $('#userfield').val('');
            }


            if (e.which === 13) {


                console.log("USER MESSAGE --------------");
                console.log(self.userMsg());

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

                        //all offers in different messages
//                        var str = botResponse;
//                        var str_array = str.split('~');
//
//                        for (var i = 0; i < str_array.length; i++) {
//                            // Trim the excess whitespace.
//                            str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
//                            // Add additional code here, such as:
//                            alert(str_array[i]);
//                        }


                        if (!botResponse) {
                            $(".chat").append('<li class="other"><div class="avatar"></div><div class="msg"><p class="textBot">' + 'Va rog sa repetati, nu am inteles.' + '</p></div></li>');
                            $('.textBot').html(function (i, v) {
                                return v.replace('\r\n', '</br>');
                            });
                            $('.chat').animate({scrollTop: $('.chat').prop("scrollHeight")}, 900)
                        } else {
                            var botResponseAux = botResponse.replace(/['"]+/g, '');

//                            var botResponseFinal = botResponseAux.replace(/\b([^-]*-[^\b]*?)\b/,"<strong>$1</strong>");

                            botResponseAux.split(/\s*~\s*/).forEach(function (offer) {
                                console.log(offer);
                                setTimeout(function () {
                                    $(".chat").append('<li class="other"><div class="avatar"></div><div class="msg"><p class="textBot">' + offer + '</p></div></li>');
                                    $('.textBot').html(function (i, v) {
                                        return v.replace('\r\n', '</br>');
                                    }, 4000);
                                },
                                    $('.chat').animate({scrollTop: $('.chat').prop("scrollHeight")}, 1600)

                                );
                            });
                        }






                        if (botResponse !== 'undefined') {
                            console.log("NOT UNDEFINED");
                            console.log(botResponse);
                            self.botResponseBig(botResponse);
                            insertConversation();
                        }

                    }
                });

                $(".chat").append('<li class="self"><div class="avatar"></div><div class="msg"><p>' + self.userMsg() + '</p></div></li>');
                $('.chat').animate({scrollTop: $('.chat').prop("scrollHeight")}, 1600)


            }
        });









    }

    return chatbotContentViewModel;
});
