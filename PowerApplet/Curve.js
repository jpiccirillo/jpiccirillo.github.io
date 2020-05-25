class Curve {
  constructor(options) {
    Object.assign(this, options);
    this.top = $(".minigraph").innerHeight();
    this.bottom = $(".maingraph").innerHeight() - 20;
    this.addPath();

    channel.on("change", () => this.removePath() && this.addPath());
  }

  /**
   * Coordinate calculating an array of values to draw a normal distribution curve.  Position parameter is to specify that we're drawing a flattened curve in the top pane
   * @param {String} position "top" or undefined
   */
  generateCurve(position) {
    let { std, n } = p;
    const l_bound = p[this.center] - 4 * std;
    const u_bound = p[this.center] + 4 * std;
    const array = [];
    const step = (8 * std) / 30;
    if (position === "top") n = 1.25;

    for (let k = l_bound; k < u_bound; k += step) {
      const x = screenScale({ ...p, x: k });
      const y = verticalScale({
        ...p,
        y: pdf(k, p[this.center], std / Math.sqrt(n)),
      });
      array.push({ x, y });
    }
    this.array = array;
    return array;
  }

  drag() {
    let _this = this;
    return d3.drag().on("drag", (d) => {
      const newMu = p[_this.center] + (d3.event.dx * 8 * p.std) / screen_w;
      const changed = { [_this.center]: newMu };
      if (validate(changed)) {
        d.x += d3.event.dx;
        setValuesNew(changed, "drag");
      }

      d3.selectAll(`#${this.id},#${this.id}-error`).attr(
        "transform",
        `translate(${d.x},${this.bottom}) scale(1,-1)`
      );
      d3.selectAll(`#${this.id}top`).attr(
        "transform",
        `translate(${d.x},${this.top}) scale(1,-1)`
      );
    });
  }

  /**
   * Append 3 SVGs to the screen
   * - One in the top pane
   * - One in the bottom pane, the main curve
   * - One curve with a darker background, representing the alpha error
   */
  addPath() {
    this.hasError &&
      mainContainer
        .append("g")
        .attr("id", "clip-wrapper")
        .attr("clip-path", `url(#rect-clip-${this.clip})`)
        .append("path")
        .attr("id", `${this.id}-error`)
        .attr("d", interp(this.generateCurve()))
        .attr("fill", `rgba(${this.color}, .70)`)
        .attr("transform", `translate(0, ${this.bottom}) scale(1,-1)`);

    const path = mainContainer
      .append("path")
      .attr("id", this.id)
      .attr("d", interp(this.generateCurve()))
      .attr("fill", `rgba(${this.color}, .60)`)
      .attr("stroke", `rgba(${this.color}, 1)`)
      .attr("stroke-width", "1.5px")
      .attr("transform", `translate(0, ${this.bottom}) scale(1,-1)`);

    const topPath = topContainer
      .append("path")
      .attr("id", `${this.id}top`)
      .attr("d", interp(this.generateCurve("top")))
      .attr("fill", "rgba(0, 0, 0, 0)")
      // .attr("fill-opacity", "0")
      .attr("stroke", `rgba(${this.color}, 1)`)
      .attr("stroke-width", "2px")
      .attr("transform", `translate(0, ${this.top}) scale(1,-1)`);

    if (this.draggable) {
      path.data([{ x: 0 }]).call(this.drag());
    }
  }

  removePath() {
    $(`#${this.id},#${this.id}-error`).remove();
    $(`#${this.id}top`).remove();
    return true;
  }

  addText() {
    topContainer
      .append("text")
      .attr("id", this.id + "text")
      .attr("x", -100)
      .attr("y", -200)
      .text(this.text);
  }
}
