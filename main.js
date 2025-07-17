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
    counterContainer.style.display = 'block';
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
    //counterContainer.appendChild(div);
    counterContainer.insertBefore(div, counterContainer.firstChild);

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
    const counterContainer = document.getElementById('counterContainer');
    const topDiv = counterContainer.firstElementChild;
    if(topDiv && (!topDiv.children[0]?.value.trim() || !topDiv.children[1]?.value.trim() || !topDiv.children[2]?.value.trim())) // ? - sprawdzanie czy istnieje  trim() = sprawdzanie czy pole jest puste, usuwa niepotrzebne spacje
    {
        topDiv.remove();
    }

    counterContainer.style.display = 'none';
    document.getElementById('addCounter').style.display = 'block';

    const div = document.createElement('div');
    div.classList.add('timerDiv');

    const btnStart = document.createElement('button');
    btnStart.textContent = 'Start'

    const btnRecord = document.createElement('button');
    btnRecord.textContent = 'Pomiar'
    btnRecord.disabled = true

    const btnStop = document.createElement('button');
    btnStop.textContent = 'Stop'
    btnStop.disabled = true

    const timeArea = document.createElement('div');
    timeArea.textContent = 'Pomiar czasu: '

    const divRecords = document.createElement('div');

    div.appendChild(btnStart);
    document.body.appendChild(div);

    let interval;
    let startTime;
    let currentTime;
    let elapsedBeforePause = 0; //potrzebne do wznawiania
    let recordCount = 1;

    startRecord = () =>
    {       
        btnRecord.disabled = false
        btnStop.disabled = false

        if (btnStart.textContent === "Restart") 
        {
            clearInterval(interval);

            interval = null;
            elapsedBeforePause = 0;
            startTime = null;

            timeArea.textContent = "Pomiar czasu: 0:0:0";
            btnStart.textContent = "Start";

            div.children[3]?.remove();
            div.children[2]?.remove();
            div.children[1]?.remove();  

            recordCount = 1;

            return;
        }

        if(interval) return;

        div.appendChild(btnRecord);
        div.appendChild(btnStop);
        div.appendChild(timeArea);


        startTime = Date.now() - elapsedBeforePause;

        interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const minutes = Math.floor(elapsed / (60000));
            const seconds = Math.floor((elapsed % 60000) / 1000);
            const miliseconds = elapsed % 1000;

            currentTime = timeArea.textContent = `${minutes}:${seconds}:${miliseconds}`;
        }, 10)
            
        btnStart.textContent = "Restart"
    }

    recordInterwal = () =>
    {   
        if (!startTime) return;
        const record = document.createElement('p');
        record.textContent = `Pomiar ${recordCount}: ${currentTime}`

        recordCount++;

        div.appendChild(divRecords);
        divRecords.appendChild(record);
    }

    stopRecord = () =>
    {
        if (!startTime) return;
        if(btnStop.textContent == "Stop")
        {
            btnStop.textContent = "Renew"

            elapsedBeforePause = Date.now() - startTime;

            clearInterval(interval);
            interval = null;
        }
        else if(btnStop.textContent == "Renew")
        {
            btnStop.textContent = "Stop";

            btnStart.textContent = "Start";
            startRecord();
        }
    }

    btnStart.addEventListener('click', startRecord);
    btnRecord.addEventListener('click', recordInterwal);
    btnStop.addEventListener('click', stopRecord);
}

btnAdd.addEventListener('click', createCounter);
btnTimer.addEventListener('click', startTimer);


