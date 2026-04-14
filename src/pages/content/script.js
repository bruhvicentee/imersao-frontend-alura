function createRow(title, movies) {
    const section = document.createElement("section")
    section.classList.add("row")

    section.innerHTML = `
    <h2>${title}</h2>

    <div class="carousel-container">
      <button class="arrow left">◀</button>

      <div class="movies"></div>

      <button class="arrow right">▶</button>
    </div>
  `

    const container = section.querySelector(".movies")

    movies.forEach(movie => {
        const card = document.createElement("div")
        card.classList.add("movie-card")

        card.innerHTML = `
            <img 
            class="poster"
            src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
            >

            <div class="trailer-container"></div>
        `

        addHoverEffect(card, movie)

        container.appendChild(card)
    })

    const left = section.querySelector(".left")
    const right = section.querySelector(".right")

    left.addEventListener("click", () => {
        container.scrollBy({ left: -300, behavior: "smooth" })
    })

    right.addEventListener("click", () => {
        container.scrollBy({ left: 300, behavior: "smooth" })
    })

    return section
}


function addHoverEffect(card, movie) {
  let timeout

  card.addEventListener("mouseenter", () => {
    timeout = setTimeout(async () => {
      card.classList.add("active")

      const trailer = await getMovieTrailer(movie.id)

      if (!trailer) return

      const container = card.querySelector(".trailer-container")

      container.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1"
          frameborder="0"
          allow="autoplay; fullscreen"
          class="trailer">
        </iframe>
      `
    }, 400)
  })

  card.addEventListener("mouseleave", () => {
    clearTimeout(timeout)

    card.classList.remove("active")

    const container = card.querySelector(".trailer-container")
    container.innerHTML = ""
  })
}


let trailerCache = {}

async function getMovieTrailer(movieId) {
    if (trailerCache[movieId]) return trailerCache[movieId]

    const res = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    )

    const data = await res.json()
    const trailer = data.results.find(v => v.type === "Trailer")

    trailerCache[movieId] = trailer

    return trailer
}


async function loadHome() {
    const main = document.getElementById("main")

    const popular = await getNetflixPopular()
    const topRated = await getNetflixTopRated()
    const recent = await getNetflixRecent()

    main.appendChild(createRow("Populares na Netflix", popular))
    main.appendChild(createRow("Mais bem avaliados", topRated))
    main.appendChild(createRow("Lançamentos", recent))
}


async function loadBanner() {
    const movies = await getNetflixPopular()

    const random = movies[Math.floor(Math.random() * movies.length)]

    const banner = document.getElementById("banner")

    banner.style.backgroundImage = `
    url(https://image.tmdb.org/t/p/original${random.backdrop_path})
  `

    banner.innerHTML = `
    <h1>${random.title}</h1>
    <p>${random.overview}</p>
  `
}



document.addEventListener("DOMContentLoaded", async () => {
    const profile = JSON.parse(localStorage.getItem("activeProfile"))

    if (!profile) {
        window.location.href = "/index.html"
        return
    }

    loadNavbar(profile)
    loadFooter()

    await loadBanner()
    await loadHome()
})
