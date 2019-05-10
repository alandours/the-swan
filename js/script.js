document.addEventListener('DOMContentLoaded', () => {

	const displayCountdown = (timer, value) => {

		for(let i = 0; i < timer.length; i++){
			timer[i].innerHTML = value[i];
		}

	}

	const startCountdown = () => {

		let seconds = 60;
		const beepTime = 4;
		const alarmTime = 1;
		const systemFailureTime = 0;

		return setInterval(() => {

			minutes--

			displayCountdown(timerMinutes, minutes.toString().padStart(3, '0'));

			if(minutes === 1){

				secondsCountdown = setInterval(() => {

					seconds--

					timerMinutes[2].innerHTML = '0';

					displayCountdown(timerSeconds, seconds.toString().padStart(2, '0'));

					if(seconds == systemFailureTime){

						clearInterval(playAlarm);

						playSystemFailure = setInterval(() => {
							systemFailure.play();
						}, 100);
		
						textInput.disabled = true;
						systemFailureText.innerHTML = 'System FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem FailureSystem Failure';

						clearInterval(countdown);
						clearInterval(secondsCountdown);

					}

				}, 1000);
			}

			if(minutes == beepTime){

				playBeep = setInterval(() => {
					beep.play();
				}, 1500);

				textInput.disabled = false;
	
			}else if(minutes == alarmTime){

				clearInterval(playBeep);
	
				playAlarm = setInterval(() => {
					alarm.play();
				}, 1000);
	
			}
	
		}, 60000);

	}

    const textInput = document.getElementById('textInput');
    const body = document.getElementsByTagName('body')[0];
    const cursor = document.getElementById('cursor');

	textInput.value = '';
	textInput.disabled = true;
	textInput.focus();
	
    body.addEventListener('click', () => {
        textInput.focus();
	})
	
	let blinkCursor = setInterval(() => {
		if(cursor.classList.contains('hidden')){
            cursor.classList.remove('hidden');
        }else{
            cursor.classList.add('hidden');
        }
    }, 750);
	
	const beep = document.getElementById('beepAudio');
	const alarm = document.getElementById('alarmAudio');
	const reset = document.getElementById('resetAudio');
	const key = document.getElementById('keyAudio');
	const systemFailure = document.getElementById('systemFailureAudio');
	
	beep.volume = 0.15;
	alarm.volume = 0.15;
	reset.volume = 0.15;
	key.volume = 0.15;
	systemFailure.volume = 0.15

	const screenText = document.getElementById('screen-text');
	const systemFailureText = document.getElementById('system-failure-text');
	const timerMinutes = document.querySelectorAll('#minutes .timer-number');
	const timerSeconds = document.querySelectorAll('#seconds .timer-number');

	let minutes = 108;
	displayCountdown(timerMinutes, minutes.toString().padStart(3, '0'));

	let countdown, playBeep, playAlarm;

	countdown = startCountdown();
    
    textInput.addEventListener('keyup', (e) => {

		key.play();

		if(e.keyCode == 13){

			e.preventDefault();

			clearInterval(playBeep);	

			if(screenText.innerHTML.replace(/\s/g,'') == '4815162342'){

				textInput.value = '';
				screenText.innerHTML = '';
				systemFailureText.innerHTML = '';
				clearInterval(playAlarm);
				clearInterval(playSystemFailure);
				clearInterval(countdown);
				timer.innerHTML = 108;
				reset.play();

				countdown = startCountdown();

			}else{

				intervalAlarm = setInterval(() => {
					alarm.play();
				}, 1000);
				
			}

		}else{
			screenText.innerHTML = textInput.value;
		}

	});
	
    textInput.addEventListener('keydown', (e) => {

		if(e.keyCode == 8){
			screenText.innerHTML = textInput.value;
		}
		
    });

});