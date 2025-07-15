const btnAdd = document.getElementById('addCounter')


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
    const div = document.createElement('div');
    div.classList.add('counter')
    console.log(Date().toString().split('T')[0])

    const inputDate = document.createElement('input');
    inputDate.type = "date";
    inputDate.min = new Date().toISOString().split('T')[0];

    const submitButton = document.createElement('button');
    submitButton.classList.add('submitCounter');
    submitButton.textContent = 'submit';

    const inputTime = document.createElement('input');
    inputTime.type = "time";


    div.appendChild(inputDate);
    div.appendChild(inputTime);
    div.appendChild(submitButton)
    document.body.appendChild(div);

    btnAdd.style.display = "none";
}

const submitCounter = () =>
{
    
}

btnAdd.addEventListener('click', createCounter);
const submitButton = document.getElementsByClassName('submitCounter');

submitButton.addEventListener('click', submitCounter);


