const filmsContinaer = document.getElementById("films-container");
let stars;
$(document).ready(function () {
  // START AOS
  AOS.init();

  // ****************** START NAVBAR ********************
  $(".nav-toggle-icon ").click(function () {
    let sideNavWidth = $(".side-nav").outerWidth();
    if ($(".outer-nav").css("left") == "0px") {
      $(".outer-nav").animate({ left: -sideNavWidth }, 500);
      $(".toggle-icon")
        .addClass("fa-solid fa-bars")
        .removeClass("fa-solid fa-xmark");
      navClose();
    } else {
      $(".outer-nav").animate({ left: 0 }, 500);
      $(".toggle-icon")
        .removeClass("fa-solid fa-bars")
        .addClass("fa-solid fa-xmark");
      navOpen();
    }
  });
  //   ================== END NAVBAR ====================

  // *************** START FETCH DATA ****************
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
  // ================== END FETCH FUNCTION ===================

  // ****************** MAKE IF USER CKICK IN NAV CHNAGE THE DIPLAY ****************************
  $(".side-nav .menu ul li a").click(function () {
    const term = $(this).attr("attr"); // Get the 'attr' attribute value of the clicked element
    fetchData(term); // Call fetchData again with the new term value
    window.scrollTo({ top: 0 });
  });
  // ===================== MAKE IF USER CKICK IN NAV CHNAGE THE DIPLAY ============================

  // Fetch initial data
  fetchData();

  // ****************** START DISPLAY *******************
  function display(arr) {
    let imgPath = "https://image.tmdb.org/t/p/w500";
    let itemHolder = ``;
    for (let i = 0; i < arr.length; i++) {
      let overview =
        arr[i].overview.length > 300
          ? arr[i].overview.slice(0, 300)
          : arr[i].overview;

      itemHolder += `
        <div class="col-sm-12 col-md-6 col-lg-4 animate__animated ">
                    <div class="film-card overflow-hidden rounded-3">
                        <div class="img-holder position-relative">
                            <img src=${
                              imgPath + arr[i].poster_path
                            } alt="" class="img-fluid">
                            <div class="overlay position-absolute overflow-hidden">
                                <h1 class="title text-center  ">${
                                  arr[i].title
                                }</h1>
                                <p class="desc animate__animated ">${overview}</p>
                                <p class="date animate__animated ">Relase Date : <span class="">${
                                  arr[i].release_date
                                }</span></p>
                                <h3>${checkMovieVote(arr[i].vote_average)}</h3>
                                <h3 class="rate animate__animated  vote d-flex align-items-center justify-content-center rounded-circle">
                                ${parseFloat(arr[i].vote_average.toFixed(1))}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    }

    filmsContinaer.innerHTML = itemHolder;
    $(".film-card").mouseenter(cardHoverIn);

    $(".film-card").mouseleave(cardHoverOut);
  }
  // ==================== END DISPLAY =====================

  // ******** DISPLAY STARTS *********
  function checkMovieVote(value) {
    const maxRating = 10; // Maximum rating
    const numStars = 5; // Total number of stars to display
    const percentage = (value / maxRating) * 100; // Calculate the percentage of the rating

    let stars = "";

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
  // async function fetchTopRatedMovies() {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDEwYzM1YjkzZDUwNjg3ZWVjZDgxYjJmNWI5YTY3NiIsInN1YiI6IjY1YzI5Yjk2Y2I3NWQxMDE3YzZiYzA1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.He1kcrVx_0rih9FCg7-vFqzNbvIKOeP1sjvBcA03-zI'
  //     }
  //   };

  //   try {
  //     const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
  //     const data = await response.json();
  //     console.log( data);

  //     return data.results;
  //   } catch (err) {
  //     console.error( "Error from top rated fetch"+err);
  //     return err;
  //   }

  // }
  // fetchTopRatedMovies();
  //****************** */ END FETCH TOP RATED

  // $("#topRated").click(function (event) {
  //   event.preventDefault(); // Prevent default anchor behavior
  //   fetchTopRatedMovies().then(topRatedMovies => {
  //     display(topRatedMovies);
  //   }).catch(error => {
  //     console.error("Error fetching top rated movies:", error);
  //   });
  // });

  $(window).scroll(function () {
    const scrollUp = $("#scroll-up");
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    if ($(this).scrollTop() >= 350) {
      scrollUp.addClass("show-scroll");
    } else {
      scrollUp.removeClass("show-scroll");
    }
  });

  function navOpen() {
    $(".side-nav .menu li")
      .addClass("animate__fadeInUp")
      .removeClass("animate__fadeInDown")
      .end();
  }
  function navClose() {
    $(".side-nav .menu li")
      .addClass("animate__fadeInDown")
      .removeClass("animate__fadeInUp")
      .end();
  }

  function cardHoverIn() {
    $(this)
      .find(".overlay")
      .css({ opacity: "1", visibility: "visible" })
      .find(".title")
      .removeClass("animate__slideOutLeft")
      .addClass("animate__fadeInDown animate__delay-0s")
      .end()
      .find(".desc")
      .removeClass("animate__slideOutLeft")
      .addClass("animate__fadeIn animate__delay-0.5s")
      .end()
      .find(".date, .rate")
      .removeClass("animate__slideOutLeft")
      .addClass("animate__fadeInUp animate__delay-0s");

    $(this).find(".film-card .img-holder img").addClass("animate");
  }

  function cardHoverOut() {
    $(this)
      .find(".overlay")
      .css({ opacity: "0", visibility: "hidden" })
      .find(".title")
      .removeClass("animate__fadeInDown animate__delay-0s")
      .addClass("animate__slideOutLeft")
      .end()
      .find(".desc")
      .removeClass("animate__fadeIn")
      .addClass("animate__slideOutLeft")
      .end()
      .find(".date, .rate")
      .removeClass("animate__fadeInUp animate__delay-0s")
      .addClass("animate__slideOutLeft");

    $(".cardImage img").removeClass("animate");
  }

  let typingTimer; // Timer identifier
  const doneTypingInterval = 500;

  // Add event listener for keyup event on search input
$("#search").on("keyup", function (event) {
  // Check if the pressed key is Enter
  if (event.keyCode === 13) {
    const searchTerm = $("#search").val().trim();
    if (searchTerm !== "") {
      fetchSearch(searchTerm);
    } else {
      // Handle case when search term is empty
    }
  }
});


  async function fetchSearch(term) {
    const baseUrl = `https://api.themoviedb.org/3/search/movie`;
    const apiKey = "5410c35b93d50687eecd81b2f5b9a676";
    try {
      let response = await fetch(`${baseUrl}?query=${term}&api_key=${apiKey}`);
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
});
