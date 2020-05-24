class Curve {
  constructor(options) {
    Object.assign(this, options);
    this.top = $(".minigraph").innerHeight();
    this.bottom = $(".maingraph").innerHeight() - 20;
    this.addPath();
    channel.on("change", () => this.removePath() && this.addPath());
  }

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
    let initial = 0;
    let _this = this;
    return d3
      .drag()
      .on("start", (d) => (initial = d.x))
      .on("drag", (d) => {
        d.x += d3.event.dx;
        d3.selectAll(`#${this.id},#${this.id}-error`).attr(
          "transform",
          `translate(${d.x},${this.bottom}) scale(1,-1)`
        );
        d3.selectAll(`#${this.id}top`).attr(
          "transform",
          `translate(${d.x},${this.top}) scale(1,-1)`
        );
      })
      .on("end", function (d) {
        const newMu =
          p[_this.center] + ((d.x - initial) * 8 * p.std) / screen_w;
        setValuesNew({ id: _this.center, value: newMu });
      });
  }

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

    topContainer
      .append("path")
      .attr("id", `${this.id}top`)
      .attr("d", interp(this.generateCurve("top")))
      .attr("fill", "none")
      .attr("stroke", `rgba(${this.color}, 1)`)
      .attr("stroke-width", "2px")
      .attr("transform", `translate(0, ${this.top}) scale(1,-1)`);

    if (this.draggable) path.data([{ x: 0 }]).call(this.drag());
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
