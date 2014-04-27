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