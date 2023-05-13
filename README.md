# JS Movie Guide


JS Movie Guide is a simple web application built with JavaScript, HTML, and CSS that allows users to search for movies and view their details. It uses the Open Movie Database (OMDb) API to fetch movie data and display it in an organized and user-friendly manner.

## Features

- Search for movies by title or view top trending movies
- View detailed information about a movie, including title, year of release, plot summary, rating, and more
- Dynamic and responsive design that works well on both desktop and mobile devices

## Video Showcase

Check out a showcase of the site [here](https://youtu.be/sS8othUvrZY).

## Installation

To install and run JS Movie Guide locally, follow these steps:

1. Clone this repository:
   ```
   git clone https://github.com/blueswizzle/js-movie-guide.git
   ```

2. Navigate to the project directory:
   ```
   cd js-movie-guide
   ```

3. Register for API keys from [The Movie Database](https://developers.themoviedb.org/3/getting-started/introduction) and paste your key in the index.js file for the variable
  ```
  const APIKEY = "YOUR_KEY_HERE";
  
  ```
4. Again register for another API key from [The Open Movie Database](https://www.omdbapi.com/apikey.aspx) and do the same for
  ```
  const OMDB_KEY = "YOUR_KEY_HERE";
  ```
 
5. Open `index.html` in your web browser.

That's it! You should now see the JS Movie Guide web application running in your browser.

## Usage

Once you have the application running, you can use it to search for movies and view their details. Here's how:

1. Enter a movie title in the search bar and press "enter".

2. The search results will be displayed below. Click on a movie card to view more details about that movie.

3. The movie details will be displayed, including the title, year of release, plot summary, rating, and other relevant information.


## Acknowledgements

JS Movie Guide was built using the following technologies and resources:

- JavaScript
- HTML
- CSS
- Open Movie Database (OMDb) API
- The Movie Database (TMDB) API
