import { Link } from "@tanstack/react-router";

/** Slider Black Friday do site original (slider puro em CSS, sem JS). */
export function SliderBlackFriday() {
  return (
    <section className="bf-slider" aria-label="Black Friday Deals">
      <input type="radio" name="bfs" id="bfs1" className="bf-radio" defaultChecked />
      <input type="radio" name="bfs" id="bfs2" className="bf-radio" />
      <input type="radio" name="bfs" id="bfs3" className="bf-radio" />

      <div className="bf-viewport">
        <div className="bf-track">
          <div className="bf-slide">
            <Link to="/cat.php" search={{ cat: "drugs" }}>
              <img
                src="/pic/bf_sale_wide.jpg"
                width={1648}
                height={800}
                alt="Black Friday Sale — up to 20% off"
                className="bf-img"
                decoding="async"
              />
            </Link>
            <Link to="/cat.php" search={{ cat: "drugs" }} className="details-button2">
              Black Deals
            </Link>
          </div>
          <div className="bf-slide">
            <Link to="/cat.php" search={{ cat: "drugs" }}>
              <img
                src="/pic/bf_shipping_wide.jpg"
                width={1648}
                height={800}
                alt="Black Friday — free shipping on select vendors"
                className="bf-img"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <Link to="/cat.php" search={{ cat: "drugs" }} className="details-button2">
              Shop Now
            </Link>
          </div>
          <div className="bf-slide">
            <Link to="/escrow-overview.php">
              <img
                src="/pic/bf_escrow_wide.jpg"
                width={1648}
                height={800}
                alt="100% escrow — 10 days buyer protection"
                className="bf-img"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <Link to="/escrow-overview.php" className="details-button2">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div className="bf-dots">
        <label htmlFor="bfs1" className="bf-dot bf-dot1" aria-label="Slide 1" />
        <label htmlFor="bfs2" className="bf-dot bf-dot2" aria-label="Slide 2" />
        <label htmlFor="bfs3" className="bf-dot bf-dot3" aria-label="Slide 3" />
      </div>
    </section>
  );
}
