const btnAdd = document.getElementById('addCounter')
const btnTimer = document.getElementById('timer')
const counterContainer = document.getElementById('counterContainer')

const clock = () =>
{
    const time = new Date();
    const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
    document.querySelector('.clock span').textContent = `${hours}:${minutes}:${seconds}`
}

setInterval(clock, 1000);

const createCounter = () =>
{
    //Tworzenie elementów licznika
    const div = document.createElement('div');
    div.classList.add('counter')
    console.log(Date().toString().split('T')[0])

    const inputDate = document.createElement('input');
    inputDate.type = "date";
    inputDate.min = new Date().toISOString().split('T')[0];

    const inputTime = document.createElement('input');
    inputTime.type = "time";

    const inputText = document.createElement('input');
    inputText.type = "text";
    inputText.style.width = '28%'
    inputText.style.paddingLeft = '1%'
    inputText.style.paddingRight = '1%'

    const submitButton = document.createElement('button');
    submitButton.classList.add('submitCounter');
    submitButton.textContent = 'submit';
    submitButton.disabled = true;

    div.appendChild(inputDate);
    div.appendChild(inputTime);
    div.appendChild(inputText);
    div.appendChild(submitButton)
    counterContainer.appendChild(div);

    // sprawdzanie czy inputy są puste
    const checkInputs = () => {
        if (inputDate.value && inputTime.value && inputText.value) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    };

    // nasluchiwanie zmian w inputach
    inputDate.addEventListener('input', checkInputs);
    inputTime.addEventListener('input', checkInputs);
    inputText.addEventListener('input', checkInputs);

    btnAdd.style.display = "none";

    //funkcja tworząca licznik do wybranej daty
    submitButton.addEventListener('click', () => {
        const selectedDate = inputDate.value
        const selectedTime = inputTime.value

        setInterval(() => {
        const nowTime = new Date().getTime();
        const endTime = new Date(`${selectedDate} ${selectedTime}`).getTime();
        //obliczanie dni, godzin itd.
        const days = Math.floor((endTime / (1000 * 60 * 60 * 24) - ( nowTime / (1000 * 60 * 60 * 24))));
        const hours = Math.floor((endTime / (1000 * 60 * 60) - (nowTime / (1000 * 60 * 60))))%24
        const minutes = Math.floor((endTime / (1000 * 60) - (nowTime / (1000 * 60))))%60
        const seconds = Math.floor((endTime / 1000 - nowTime / 1000)%60)

        btnAdd.style.display = "block";
        div.innerHTML = ''

        const title = document.createElement('h2');
        title.style.padding = '5px';
        const dates = document.createElement('p');

        title.textContent = `${inputText.value} `
        dates.innerHTML = `<strong>${days}</strong> dni, 
        <strong>${hours}</strong> godzin, 
        <strong>${minutes}</strong> minut, 
        <strong>${seconds}</strong> sekund <br> do wyznaczonej daty 
        <strong>${selectedDate}</strong> 
        <strong>${selectedTime}</strong>`;

        div.appendChild(title);
        div.appendChild(dates);
        }, 1000)
    })
}

//stoper
const startTimer = () =>
{
    counterContainer.style.visibility = 'hidden';
    document.getElementById('addCounter').style.display = 'block';

    const div = document.createElement('div');
    div.classList.add('timerDiv');

    const btnStart = document.createElement('button');
    btnStart.textContent = 'Start'

    const btnRecord = document.createElement('button');
    btnRecord.textContent = 'Pomiar'

    const btnStop = document.createElement('button');
    btnStop.textContent = 'Stop'

    const timeArea = document.createElement('div');
    timeArea.textContent = 'Pomiar czasu: '

    div.appendChild(btnStart);
    div.appendChild(btnRecord);
    div.appendChild(btnStop);
    div.appendChild(timeArea);
    document.body.appendChild(div);

    let interval;
    let startTime;

    startRecord = () =>
    {
        if(interval) return;

        startTime = Date.now();
        interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const minutes = Math.floor(elapsed / (60000));
            const seconds = Math.floor((elapsed % 60000) / 1000);
            const miliseconds = elapsed % 1000;

            timeArea.textContent = `${minutes}:${seconds}:${miliseconds}`;
        }, 10)
    }

    stopRecord = () =>
    {
        clearInterval(interval);
        interval = null;
    }

    btnStart.addEventListener('click', startRecord);
    btnStop.addEventListener('click', stopRecord);
}

btnAdd.addEventListener('click', createCounter);
btnTimer.addEventListener('click', startTimer);


