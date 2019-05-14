document.addEventListener('DOMContentLoaded', () => {

	const changeStyles = (oldStyle, newStyle) => {

		const linkElements = document.getElementsByTagName('link');
		const links = [...linkElements].map(link => link.href.split('/').pop());

		const stylesheet = linkElements[links.indexOf(oldStyle)];

		stylesheet.href = 'css/' + newStyle;

	}

	const displayCountdown = (timer, value) => {

		for(let i = 0; i < timer.length; i++){
			timer[i].innerHTML = value[i];
		}

	}

	const addHieroglyphs = () => {

		for(let second of timerSeconds){
			second.classList.add('timer-red');
			second.style.color = '#ac141c';
		}
	
		for(let minute of timerMinutes){
			minute.style.color = '#151515';
		}
	
		for(let i = 0; i < timerNumber.length; i++){
			timerNumber[i].innerHTML += `<img src="img/timer/h${i + 1}.png">`;
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

						let failureText = '';

						for(let i = 0; i < 300; i++){
							failureText += 'System Failure ';
						}
					
						systemFailureText.innerHTML = failureText;

						clearInterval(countdown);
						clearInterval(secondsCountdown);

						addHieroglyphs();

					}

				}, 1000);
			}

			/* Play beep or alarm */

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
    const cursor = document.getElementById('blink');

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
	const timerNumber = document.querySelectorAll('.timer-number');
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
	
	/* Fullscreen */

	const fullscreenBtn = document.getElementsByClassName('fullscreen-btn')[0];

	fullscreenBtn.addEventListener('click', (e) => {
		e.preventDefault();
		changeStyles('styles.css', 'fullscreen.css');
		body.classList.add('fullscreen');
	});

	body.addEventListener('keyup', (e) => {
		if(e.keyCode == 27 && body.classList.contains('fullscreen')){
			changeStyles('fullscreen.css', 'styles.css');
		}
	});

});