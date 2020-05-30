class Triangle {
  constructor(position) {
    console.log(position.y);
    mainContainer
      .append("path")
      .attr("id", "triangle")
      .attr("d", d3.symbol().type(d3.symbolTriangle))
      .attr("transform", `translate(${position.x}, ${position.y})`);
  }
}

class Line {
  constructor(x, id) {
    mainContainer
      .append("line")
      .attr("id", id)
      .attr("x1", x)
      .attr("y1", screen_h - 20)
      .attr("x2", x)
      .attr("y2", screen_h * 0.1);
  }
}

class Curve {
  constructor(options) {
    Object.assign(this, options);

    if (this.position === "top") {
      this.offset = $(".minigraph").innerHeight() + 1;
      this.hasError = false;
      this.mainFill = "transparent";
    } else {
      this.offset = $(".maingraph").innerHeight() - 20;
      this.hasError = true;
      this.mainFill = `rgba(${this.color}, .60)`;
    }

    const replot = (id) => {
      // Only clear and readd path if this curve isnt the one being dragged
      this.removePath() && this.addPath();
    };

    this.addPath();
    channel.on("change", replot);
    channel.on("drag", replot);
  }

  /**
   * Coordinate calculating an array of values to draw a normal distribution curve.  Position parameter is to specify that we're drawing a flattened curve in the top pane
   */
  generateCurve() {
    let { std, n } = p;
    const l_bound = p[this.center] - 4 * std;
    const u_bound = p[this.center] + 4 * std;
    const array = [];
    const step = (8 * std) / 30;
    if (this.position === "top") n = 1.25;

    for (let k = l_bound; k < u_bound; k += step) {
      const x = screenScale(k);
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
      validate(changed) && setValuesNew(changed, "drag") && (d.x = d3.event.dx);

      d3.selectAll(`#${this.id},#${this.id}-error`).attr(
        "transform",
        `translate(${d.x},${this.offset}) scale(1,-1)`
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
    const interp = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveBasis);

    this.hasError &&
      containers[this.position]
        .append("g")
        .attr("id", `clip-wrapper-${this.id}`)
        .attr("clip-path", `url(#rect-clip-${this.clip})`)
        .append("path")
        .attr("id", `${this.id}-error`)
        .attr("d", interp(this.generateCurve()))
        .attr("fill", `rgba(${this.color}, .70)`)
        .attr("transform", `translate(0, ${this.offset}) scale(1,-1)`);

    const path = containers[this.position]
      .append("path")
      .attr("id", this.id)
      .attr("d", interp(this.generateCurve()))
      .attr("fill", this.mainFill)
      .attr("stroke", `rgba(${this.color}, 1)`)
      .attr("stroke-width", "1.5px")
      .attr("transform", `translate(0, ${this.offset}) scale(1,-1)`);

    if (this.draggable) {
      path.data([{ x: 0 }]).call(this.drag());
    }
  }

  removePath() {
    $(".bar,#sampleMeanLine,#triangle").remove();
    $(`#clip-wrapper-${this.id}`).remove();
    $(`#${this.id},#${this.id}-error`).remove();
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
