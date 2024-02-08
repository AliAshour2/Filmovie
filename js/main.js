const filmsContinaer = document.getElementById("films-container");
let stars ;
$(document).ready(function () {
  // START AOS
  AOS.init();

  // START NAVBAR
  $(".nav-toggle-icon ").click(function () {
    let sideNavWidth = $(".side-nav").outerWidth();
    if ($(".outer-nav").css("left") == "0px") {
      $(".outer-nav").animate({ left: -sideNavWidth }, 500);
      $(".toggle-icon")
        .addClass("fa-solid fa-bars")
        .removeClass("fa-solid fa-xmark");
    } else {
      $(".outer-nav").animate({ left: 0 }, 500);
      $(".toggle-icon")
        .removeClass("fa-solid fa-bars")
        .addClass("fa-solid fa-xmark");
    }
  });
  //   END NAVBAR

  // START FETCH DATA

  async function fetchData(term = "trending/all/day") {
    const baseUrl = `https://api.themoviedb.org/3/${term}?api_key=`;
    const apiKey = "5410c35b93d50687eecd81b2f5b9a676";
    try {
        let response = await fetch(`${baseUrl}${apiKey}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data.results);
        display(data.results);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}


    $(".side-nav .menu ul li a").click(function () { 
        const term = $(this).attr('attr'); // Get the 'attr' attribute value of the clicked element
        fetchData(term); // Call fetchData again with the new term value
    });

    // Fetch initial data
    fetchData();


 // END FeTCH


  // START DISPLAY
  function display(arr){
    let imgPath = 'https://image.tmdb.org/t/p/w500';
    let itemHolder = ``;
    for (let i = 0; i < arr.length; i++) {
      let overview = arr[i].overview.length > 300 ? arr[i].overview.slice(0, 300) : arr[i].overview;

        itemHolder+=
        `
        <div class="col-sm-12 col-md-6 col-lg-4 ">
                    <div class="film-card overflow-hidden rounded-3">
                        <div class="img-holder position-relative">
                            <img src=${imgPath+arr[i].poster_path} alt="" class="img-fluid">
                            <div class="overlay position-absolute overflow-hidden">
                                <h1 class="text-center animate__fadeInDown">${arr[i].title}</h1>
                                <p class=" animate__animated animate__fadeInRight">${overview}</p>
                                <p class=" animate__animated animate__fadeInLeft">Relase Date : <span class="">${arr[i].release_date}</span></p>
                                <h3>${checkMovieVote(arr[i].vote_average )}</h3>
                                <h3 class=" animate__animated animate__fadeIn vote d-flex align-items-center justify-content-center rounded-circle">
                                ${parseFloat((arr[i].vote_average).toFixed(1))}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
        `
        
    }

    filmsContinaer.innerHTML = itemHolder ;
   
  }
  // END DISPLAY



 
  
 

  // ******** DISPLAY STARTS *********
  function checkMovieVote(value) {
    const maxRating = 10; // Maximum rating
    const numStars = 5; // Total number of stars to display
    const percentage = (value / maxRating) * 100; // Calculate the percentage of the rating

    let stars = '';

    for (let i = 0; i < numStars; i++) {
        if (percentage >= (i + 0.5) * (100 / numStars)) {
            stars += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        } else if (percentage >= (i + 0.25) * (100 / numStars)) {
            stars += `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
        } else {
            stars += `<i class="fa-solid fa-star text-muted fs-6"></i>`;
        }
    }

    return stars;
}
  // >>>> END DISPLAY STARS <<<<

  
  // Fetch TOP RATED MOVIES
  // =========>>>>>>>>>>> i just handle it above there is no need for this function
  async function fetchTopRatedMovies() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDEwYzM1YjkzZDUwNjg3ZWVjZDgxYjJmNWI5YTY3NiIsInN1YiI6IjY1YzI5Yjk2Y2I3NWQxMDE3YzZiYzA1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.He1kcrVx_0rih9FCg7-vFqzNbvIKOeP1sjvBcA03-zI'
      }
    };
  
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
      const data = await response.json();
      console.log( data);
      
      
      return data.results;
    } catch (err) {
      console.error( "Error from top rated fetch"+err);
      return err;
    }
    
  }
  fetchTopRatedMovies();
  // END FETCH TOP RATED

  $("#topRated").click(function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    fetchTopRatedMovies().then(topRatedMovies => {
      display(topRatedMovies);
    }).catch(error => {
      console.error("Error fetching top rated movies:", error);
    });
  });


  
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('#scroll-up').addClass('show-scroll');
    } else {
      $('#scroll-up').removeClass('show-scroll');
    }
  });

  $('#scroll-up').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
  
});



