class Curve {
  constructor(options) {
    Object.assign(this, options);

    this.palette = d3
      .select(`#${this.anchor}`)
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    this.addPath();

    channel.on("change", () => this.removePath() && this.addPath());
  }

  static generateCurve() {
    const { mu1, std, n } = p;
    const l_bound = mu1 - 4 * std;
    const u_bound = mu1 + 4 * std;
    const array = [];
    const step = (8 * std) / 30;

    for (let k = l_bound; k < u_bound; k += step) {
      const x = screenScale(k);
      const y = verticalScale(pdf(k, mu1, std / Math.sqrt(n)));
      array.push({ x, y });
    }
    return array;
  }

  drag() {
    let initial = 0;
    return d3
      .drag()
      .on("start", (d) => (initial = d.x))
      .on("drag", (d) => {
        d.x += d3.event.dx;
        const movement = `translate(${d.x},${screen_h - 20}) scale(1,-1)`;
        d3.select(`#${this.id}`).attr("transform", movement);
      })
      .on("end", function (d) {
        const newMu1 = p.mu1 + ((d.x - initial) * 8 * p.std) / screen_w;
        setValuesNew({ id: "mu1", value: newMu1 });
        channel.emit("change", newMu1);
      });
  }

  addPath() {
    const path = this.palette
      .append("path")
      .attr("id", this.id)
      .attr("d", interp(Curve.generateCurve()))
      .attr("transform", "translate(0," + (screen_h - 20) + ") scale(1,-1)");

    if (this.draggable) {
      path.data([{ x: 0 }]).call(this.drag());
    }
  }

  removePath() {
    return $(`#${this.id}`).remove().length;
  }
}
