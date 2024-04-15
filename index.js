const play=document.getElementById('play')
const reset=document.getElementById('reset')
const labBtn=document.querySelector('.lap-btn')
let lapCount = 0;
let timer;
let running = false;
let startTime;
let pausedTime = 0;

function startTimer() {
  if (!running) {
    startTime = Date.now() - pausedTime;
    timer = setInterval(updateDisplay, 1000);
    running = true;
  }
}

function pauseTimer() {
  clearInterval(timer);
  pausedTime = Date.now() - startTime;
  running = false;
}

function resetTimer() {
  clearInterval(timer);
  document.querySelector('.numTime').textContent = '00:00:00';
  pausedTime = 0;
  running = false;

   // Clear lap items from display container
   document.querySelector('.item').innerHTML = '';
  
   // Reset lap count
   lapCount = 0;
   
   // Clear lap count display
   document.querySelector('.lapTime').textContent = '';
}

function updateDisplay() {
  let elapsedTime = Date.now() - startTime;
  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  document.querySelector('.numTime').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function lap() {
  if (running) {
    let lapTime = Date.now() - startTime;
    let hours = Math.floor(lapTime / (1000 * 60 * 60));
    let minutes = Math.floor((lapTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((lapTime % (1000 * 60)) / 1000);
    let lapItem = document.createElement('p');
    lapItem.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

     // Append lapItem to the element with class 'item'
    document.querySelector('.item').appendChild(lapItem);

    // Scroll the display container to the top
    document.querySelector('.display-container').scrollTop = 0;

    lapCount++;
    let laptimecount=document.createElement('p');
    laptimecount.textContent=`${lapCount}`
    document.querySelector('.lapTime').appendChild(laptimecount)

  }
}

play.addEventListener('click', () => {
  if (!running) {
    startTimer();
    play.classList.remove('fa-solid', 'fa-play');
    play.classList.add('fa-solid', 'fa-pause');
  } else {
    pauseTimer();
    play.classList.remove('fa-solid', 'fa-pause');
    play.classList.add('fa-solid', 'fa-play');
  }
});

reset.addEventListener('click',()=>{
  play.classList.add('fa-solid', 'fa-play')
  resetTimer();
 
})

labBtn.addEventListener('click',()=>{
   lap();
}) 