function Footer() {
    return `
    <footer class="footer">
      <div class="footer-content">

        <div class="footer-links">
          <span>Início</span>
          <span>Séries</span>
          <span>Filmes</span>
        </div>

        <div class="footer-copy">
          © 2026 Netflix Clone
        </div>

      </div>
    </footer>
  `
}


let footerStyleLoaded = false

function injectFooterStyles() {
    if (footerStyleLoaded) return

    const style = document.createElement("style")

    style.innerHTML = `
        .footer {
            margin-top: 50px;
            padding: 30px 20px;
            background: #111;
            color: #aaa;
            font-size: 16px;
        }

        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1000px;
            margin: 0 auto;
        }

        .footer-links {
            display: flex;
            gap: 50px;
        }

        .footer-links span {
            cursor: pointer;
            transition: 0.2s;
        }

        .footer-links span:hover {
            color: white;
        }
    `

    document.head.appendChild(style)
    footerStyleLoaded = true
}


function loadFooter() {
    injectFooterStyles()

    const container = document.getElementById("footer")
    container.innerHTML = Footer()
}
