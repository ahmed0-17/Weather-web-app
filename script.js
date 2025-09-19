function getWeatherEmoji(status, temp) {
    status = status.toLowerCase();

    if (status.includes("sunny")) return "☀️";
    if (status.includes("clear")) return "🌙";   // you can replace with ☀️ for daytime
    if (status.includes("partly") || status.includes("cloud")) return "🌤️";
    if (status.includes("overcast")) return "☁️";
    if (status.includes("rain")) return "🌧️";
    if (status.includes("thunder")) return "⛈️";
    if (status.includes("snow")) return "❄️";
    if (status.includes("fog") || status.includes("mist") || status.includes("haze")) return "🌫️";



    return "🌍"; // default
}




// api handling and dom manipulation


document.getElementById('getWeather').addEventListener('click',

    function getWeather() {
        document.getElementById('weather').style.display = "block";




        const apiKey = 'e626cc7e51514a04b8a200209250608';
        // const city = 'Berlin';
        const city = document.getElementById('cityInput').value.trim();
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('weather').textContent = `API Error: ${data.error.message} Code: ${data.error.code}`;
                    document.getElementById('status').textContent = '';
                    return;
                }

                console.log(data);
                const temp = data.current.temp_c;
                const cloudCoverage = data.current.cloud; // Cloud coverage percentage
                const status = data.current.condition.text;
                const emoji = getWeatherEmoji(status, temp);

                // document.getElementById('weather').textContent = `${temp}°C`;
                document.getElementById('weather').innerHTML = "<h1>" + `${temp}°C` + "</h1>";
                document.getElementById('statuss').textContent = `Status: ${status}`;
                const h1Element = document.getElementById('h1');
                h1Element.textContent = `Weather of ${city}`.toUpperCase();

                document.getElementById("weather-condition").innerText = ` ${emoji}`;
                if (data.current.is_day === 0) {
                    document.body.style.background = "linear-gradient(to bottom, #0d1836, #1d1d2d, #4b4b8d, #030342, #27185b)";
                }
                else {
                    document.body.style.background = "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
                }

                // Show/Hide clouds and wind based on weather condition


                if (cloudCoverage > 20) {
                    document.getElementById('cloud1').classList.remove('hidden');
                    document.getElementById('cloud2').classList.remove('hidden');

                    document.getElementById('wind1').classList.remove('hidden');
                    document.getElementById('wind2').classList.remove('hidden');
                    document.getElementById('wind3').classList.remove('hidden');
                }


            })




            .catch(error => {
                console.error('Error fetching weather data:', error.message);
                document.getElementById('weather').textContent = 'Failed to load weather data.';
            });

    })



// star animation
const starCount = 150; // Number of stars
const container = document.getElementById('star-container');

for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random size between 1px to 3px
    const size = Math.random() * 2 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';

    // Random position within viewport
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';

    // Random animation duration between 1.5s and 3.5s
    star.style.animationDuration = (Math.random() * 2 + 1.5) + 's';

    // Random animation delay so stars don't twinkle together
    star.style.animationDelay = (Math.random() * 5) + 's';

    container.appendChild(star);
}



function createBrokenStar(container) {
    const starContainer = document.createElement('div');
    starContainer.classList.add('broken-star');

    // Random start position along top-left area
    starContainer.style.top = '-40px';
    starContainer.style.left = Math.random() * window.innerWidth * 0.7 + 'px';

    // Random duration between 3.5s to 5s
    const duration = Math.random() * 1.5 + 3.5;
    starContainer.style.animationDuration = duration + 's';

    // Create 5 pieces
    for (let i = 0; i < 5; i++) {
        const piece = document.createElement('div');
        piece.classList.add('star-piece');

        // Scatter pieces inside container
        piece.style.top = (10 + Math.random() * 15) + 'px';
        piece.style.left = (10 + Math.random() * 15) + 'px';

        // Random break apart movement and rotation
        const moveX = (Math.random() - 0.5) * 100 + 'px';
        const moveY = (Math.random() - 0.5) * 100 + 'px';
        const rotate = (Math.random() * 720 - 360) + 'deg';

        piece.style.setProperty('--x', moveX);
        piece.style.setProperty('--y', moveY);
        piece.style.setProperty('--r', rotate);

        // Break apart starts after 60% of fall duration
        piece.style.animationDuration = (duration * 0.4) + 's';
        piece.style.animationDelay = (duration * 0.6) + 's';

        starContainer.appendChild(piece);
    }

    container.appendChild(starContainer);

    // Remove after animation ends
    starContainer.addEventListener('animationend', () => {
        starContainer.remove();
    });
}

// Example usage: 
// Pass your star container element here
const starContainer = document.getElementById('star-container');

setInterval(() => {
    createBrokenStar(starContainer);
}, Math.random() * 2000 + 3000);


