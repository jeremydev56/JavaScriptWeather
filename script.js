/*
API CALLS (in FAHRENHEIT)
By city name :
api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=imperial
By city id :
api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}&units=imperial
By geographic coordinates
api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=imperial
*/
let cityName = '';

const weather = {
  apiKey: 'Your OpenWeather APIKey !',

  async fetchWeather(city) {
    const endpoint = 'http://api.openweathermap.org/data/2.5/weather';
    const url = `${endpoint}?q=${city}&units=imperial&appid=${this.apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    this.displayWeather(data);
  },

  // création d'une fonction d'afichage de la météo
  displayWeather(data) {
    // on renvoie ce qui est contenu dans le json
    const { name } = data;
    // icône et description contenues dans la branche weather du json
  
    console.log(data.weather);
    
    if(data.weather) {
      const { description, icon } = data.weather[0];
      // température et humidité contenues dans la branche main du json
      const { temp, humidity } = data.main;
      // vitesse contenue dans la branche wind du json
      const { speed } = data.wind;
      // console.log(name,icon,description,temperature,humidity,speed);
    
      // Appel des différents éléments JS dans les variables HTML
      document.querySelector('.city').innerText = 'Weather in ' + name;
      // Afficher la localité
      document.querySelector('.description').innerText = description;
      // Afficher la description
      document.querySelector('.icon').src =
        'https://openweathermap.org/img/wn/' + icon + '.png';
      // Afficher l'icône
      document.querySelector('.temperature').innerText = temp + ' °F';
      // Afficher la température
      document.querySelector('.humidity').innerText =
        'Humidity : ' + humidity + ' %';
      // Afficher l'humidité
      document.querySelector('.wind').innerText =
        'Wind speed : ' + speed + ' km/h';
      // Afficher la description
  }
    else{
      console.log("Your city is not found");
    }
  },


  // création d'une fonction de recherche
  async search() {
    // on récupère les informations de la météo
    cityName = document.querySelector('.search-bar').value;
    await this.fetchWeather(cityName);
    // Pour une image qui s'actualise selon la ville renseignée
    // console.log(cityName);
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + cityName + "')";
    // via ce qui est renseigné dans la barre de recherche
  },
};

// Ajout d'un événement pour le bouton de recherche
document
  .querySelector('.search button')
  .addEventListener('click', async function () {
    // si on clique sur le bouton de recherche{
    await weather.search();
    // on renvoie la fonction search
  });

// Ajout d'un événement pour la localisation
document.querySelector('.weather').classList.remove('loading');

// Ajout d'un événement pour la barre de recherche
document
  .querySelector('.search-bar')
  .addEventListener('keyup', async function (event) {
    // si on tape entrée après la recherche
    if ((event.target = 'Enter')) {
      await weather.search();
      // on renvoie la fonction de recherche
    }
  });

weather.fetchWeather('city');
