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
    const apiKey = "REPLACE_WITH_YOUR_KEY";
    let chat = $('#chat')
    let ask = $('#chat p').text().trim()

    let jsonRequest = {
        "model": "davinci", // davinci, curie, babbage, ada, griffin
        "prompt": ask,
        "temperature": 1,
        "max_tokens": 500
    }

    $.ajax({
        url: "https://api.openai.com/v1/completions",
        type: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        data: JSON.stringify(jsonRequest),
        success: function(data) {
            chat.append(` \
                <p author="chat"> \
                    ${data['choices'][0]['text']} \
                </p> \
            `)
        },
        error: function() {
            alert('Request Failed')
        }
    });

}

