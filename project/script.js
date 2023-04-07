$(function() {
    
    let btnListen = $('#btn-listen');
    let btnSend = $('#btn-send');

    btnListen.click(function() {
        if ($(this).attr('listen') == 'true') {
            $(this).text('Listen');
            $(this).css('background-color', '');
            $(this).attr('listen', 'false');
            recognition.stop();

        } else {
            $(this).text('Stop Listening');
            $(this).css('background-color', 'red');
            $(this).attr('listen', 'true');
            recognition.start();
        }
    })

    btnSend.click(function() {
        sendRequestChatGpt()
    })

    let chat = $('#chat')
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = function (event) {
        let result = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            result += event.results[i][0].transcript;
        }

        console.log(result)
        
        /**
         * Just for test
         */
        // if ((result.toUpperCase()).includes('SEND') && (result.toUpperCase()).includes('MESSAGE')) {
        //     $('#btn-send').click()
        // }

        chat.text('')
        chat.append(` \
            <p author="voice"> \
                ${result} \
            </p> \
        `)
    };

})


function sendRequestChatGpt() {
    console.log('send request')
}

