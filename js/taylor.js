SimpleGraph = function (elemid, options) {
    var self = this;

    this.chart = document.getElementById(elemid);
    this.cx = this.chart.clientWidth;
    this.cy = this.chart.clientHeight;


    this.options = options || {};

    this.options.xmax = options.xmax || this.constants.DEFAULT_XMAX;
    this.options.xmin = options.xmin || this.constants.DEFAULT_XMIN;
    this.options.ymax = options.ymax || this.constants.DEFAULT_YMAX;
    this.options.ymin = options.ymin || this.constants.DEFAULT_YMIN;

    this.padding = {
        top: this.options.title ? this.constants.TOP_LARGE_PADDING : this.constants.TOP_SMALL_PADDING,
        right: this.constants.RIGHT_PADDING,
        bottom: this.options.xlabel ? this.constants.BOTTOM_LARGE_PADDING : this.constants.BOTTOM_SMALL_PADDING,
        left: this.options.ylabel ? this.constants.LEFT_LARGE_PADDING : this.constants.LEFT_SMALL_PADDING
    };

    this.size = {
        width:  this.cx - this.padding.left - this.padding.right,
        height: this.cy - this.padding.top  - this.padding.bottom
    };


    this.x = d3.scale.linear()
        .domain([this.options.xmin, this.options.xmax])
        .range([0, this.size.width]);
    //this.downx = Math.NaN;

    this.y = d3.scale.linear()
        .domain([this.options.ymax, this.options.ymin])
        .nice()
        .range([0, this.size.height])
        .nice();
    //this.downy = Math.NaN;

    //this.dragged = this.selected = null;


    this.line = d3.svg.line()
        .x(function(d, i) { return this.x(this.points[i].x); })
        .y(function(d, i) { return this.y(this.points[i].y); });


    this.vis = d3.select(this.chart).append("svg")
        .attr("width",  this.cx)
        .attr("height", this.cy)
        .append("g")
        .attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")");

    this.zoom = d3.behavior.zoom()
        .x(this.x)
        .y(this.y)
        .on("zoom", this.redraw);

    this.plot = this.vis.append("rect")
        .attr("width", this.size.width)
        .attr("height", this.size.height)
        //.style("fill", "#EEEEEE")
        .style("stroke-width", "1")
        .style("stroke", "rgb(0, 0, 0)")
        .on("mousedown.drag", self.plotDrag)
        .on("touchstart.drag", self.plotDrag)
        .call(this.zoom);


    if (this.options.title) {
        this.vis.append("text")
            .attr("class", "axis")
            .text(this.options.title)
            .attr("x", this.size.width/2)
            .attr("dy","-0.8em")
            .style("text-anchor","middle");
    }

    if (this.options.xlabel) {
        this.vis.append("text")
            .attr("class", "axis")
            .text(this.options.xlabel)
            .attr("x", this.size.width/2)
            .attr("y", this.size.height)
            .attr("dy","2.4em")
            .style("text-anchor","middle");
    }

    if (this.options.ylabel) {
        this.vis.append("text")
            .attr("class", "axis")
            .text(this.options.ylabel)
            .style("text-anchor","middle")
            .attr("transform","translate(" + -40 + " " + this.size.height/2+") rotate(-90)");
    }

    //это для того, чтобы таскать оси.
    //todo: прицепить конкретно к осям.
    d3.select(this.chart)
        .on("mouseMove.drag", self.mouseMove)
        .on("touchmove.drag", self.mouseMove)
        .on("mouseup.drag",   self.mouseup)
        .on("touchend.drag",  self.mouseup);
};

SimpleGraph.prototype.redraw = function () {
    console.log("redraw");
};

SimpleGraph.prototype.plotDrag = function () {
    console.log("plotDrag");
};

SimpleGraph.prototype.mouseMove = function () {
    console.log("mouseMove");
};

SimpleGraph.prototype.mouseup = function () {

};

SimpleGraph.prototype.constants = {
    DEFAULT_XMAX: 30,
    DEFAULT_XMIN: 0,
    DEFAULT_YMAX: 10,
    DEFAULT_YMIN: 0,

    TOP_LARGE_PADDING: 40,
    TOP_SMALL_PADDING: 20,
    RIGHT_PADDING: 30,
    BOTTOM_LARGE_PADDING: 60,
    BOTTOM_SMALL_PADDING: 10,
    LEFT_LARGE_PADDING: 70,
    LEFT_SMALL_PADDING: 45
};