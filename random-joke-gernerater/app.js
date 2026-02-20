const jokeText = document.getElementById('joke-text');
const jokeImg = document.getElementById('joke-img');
const btn = document.getElementById('get-joke');

async function getJoke() {
    jokeText.innerText = "Loading...";
    try {
        const jokeResponse = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
        const jokeData = await jokeResponse.json();

        const randomNum = Math.floor(Math.random() * 1000);
        jokeImg.src = `https://picsum.photos/500/300?random=${randomNum}`;

        if (jokeData.joke) {
            jokeText.innerText = jokeData.joke;
        } else {
            jokeText.innerText = "Oops! Try again.";
        }
    } catch (error) {
        jokeText.innerText = "Error fetching joke. Please try again later.";
    }
}

btn.addEventListener('click', getJoke);