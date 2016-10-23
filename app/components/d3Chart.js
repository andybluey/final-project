import React from 'react';
import _ from 'lodash';

var d3Chart = {};

//////// FIRST CHART ///////////////////
d3Chart.createChart = function (el, props, state) {
  if ( !state.data ) {
    return false;
  }

  var diameter = 600; //max size of the bubbles
  var width = 700;
  var height = 500;
  var color = d3.scale.category10(); //color category

  var data = state.data;

  var bubble = d3.layout.pack( state.data )
                  .sort(null)
                  .size([diameter, diameter])
                  .padding(3.0);

  var svg = d3.select( el )
      // .on("touchstart", nozoom)
      // .on("touchmove", nozoom)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "bubble");

      //convert numerical values from strings to numbers
    data = data.map(function(d){ d.value = +d["value"]; return d; });

      //bubbles in specific format, convert data to this.
  var nodes = bubble.nodes({children:data}).filter(function(d) { return !d.children; });

  var force = d3.layout.force()
      .gravity(0.5)
      .charge(-100)
      .friction(0.95)
      .nodes(nodes)
      .size([width, height]);

  force.start();

      //setup the chart
  var bubbles = svg.append("g")
      .attr("transform", "translate(0,0)")
      .selectAll(".bubble")
      .data(nodes)
      .enter();

  //create the bubbles
  bubbles.append("circle")
      .attr("r", function(d){ return d.r; })
      .attr("cx", function(d){ return d.x; })
      .attr("cy", function(d){ return d.y; })
      .style("fill", function(d) { return color(d.value); });

  //format the text for each bubble
  force.on("end", function() {
    bubbles.append("text")
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return d.y + 5; })
        .attr("text-anchor", "middle")
        .text(function(d){ return d["name"]; })
        .style({
            "fill":"black",
            "font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
            "font-size": "12px"
        });
  });

    force.on("tick", function(e) {
      var q = d3.geom.quadtree(nodes),
          i = 0,
          n = nodes.length;

        while (++i < n) q.visit(collide(nodes[i]));

        svg.selectAll("circle")
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    });

    function changeForce(charge, gravity) {
      console.log("force.charge");
     force.charge(charge).gravity(gravity);
    }
    changeForce(30, 0.03);

    // svg.on("mousemove", function() {
    //   var p1 = d3.mouse(this);
    //   root.px = p1[0];
    //   root.py = p1[1];
    //   force.resume();
    // });

    function collide(node) {
      var r = node.radius + 16,
          nx1 = node.x - r,
          nx2 = node.x + r,
          ny1 = node.y - r,
          ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = node.radius + quad.point.radius;
          if (l < r) {
            l = (l - r) / l * .5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    }
};

/////////////               ////////////////////////
///////////// SECOND CHART  ////////////////////////

d3Chart.createSecondChart = function (el, props, state) {
  if (!state) { return false; }

  var svg = d3.select(".ChartTwo").append("svg").attr({ width: 700, height: 500 }),
      margin = {top: 30, right: 30, bottom: 30, left: 30},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scale.ordinal().rangeRoundBands([0, width], .05),
      y = d3.scale.linear().range([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var max = 0;
    for ( var key in state ) {
      if ( state[key] > max ) {
        max = state[key];
      }
    }

    x.domain( Object.keys( state ) );
    y.domain([0, max]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.svg.axis()
          .scale(x)
          .orient("bottom"));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr("dy", "0.71em")
        .attr("text-anchor", "middle");

    let data = [];
    for ( var key in state ) {
      let obj = { key: key, value: state[key] };
      data.push( obj )
    }

    console.log("Height", height);
    g.selectAll("rect.bar")
      .data( data )
      .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) { return x( d.key ); })
        .attr("width", x.rangeBand())
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-color", "white")
        .attr("fill", function(d) {
          return "rgb(9, 188, " + (d.value * 36) + ")";
        })

        .attr("y", function (d, i) {
          return height;
        })
        .attr("height", 0)
			    .transition()
    			.duration(1200)
    			.delay(function (d, i) {
    				return i * 10;
    		})
        .attr("height", function(d) { return (d.value * 20); })
        .attr("y", function(d) { return ( height - (d.value * 20) ); });
  };

  /////////////               ////////////////////////
  ///////////// THIRD CHART  ////////////////////////

d3Chart.createThirdChart = function (el, props, state) {
  console.log(el, props, state);
  function lineChart() { // <-1A
      var _chart = {};
      var _width = 500, _height = 400, // <-1B
              _margins = {top: 30, left: 30, right: 30, bottom: 30},
              _x, _y,
              _data = [],
              _colors = d3.scale.category20(),
              _svg,
              _bodyG,
              _line;
      _chart.render = function () { // <-2A
          if (!_svg) {
              _svg = d3.select(".ChartThree").append("svg") // <-2B
                      .attr("height", _height)
                      .attr("width", _width);
              renderAxes(_svg);
              defineBodyClip(_svg);
          }
          renderBody(_svg);
      };
      function renderAxes(svg) {
          var axesG = svg.append("g")
                  .attr("class", "axes");
          renderXAxis(axesG);
          renderYAxis(axesG);
      }

      function renderXAxis(axesG){
          var xAxis = d3.svg.axis()
                  .scale(_x.range([0, quadrantWidth()]))
                  .orient("bottom");
          axesG.append("g")
                  .attr("class", "x axis")
                  .attr("transform", function () {
                      return "translate(" + xStart() + "," + yStart() + ")";
                  })
                  .call(xAxis);

          d3.selectAll("g.x g.tick")
              .append("line")
                  .classed("grid-line", true)
                  .attr("x1", 0)
                  .attr("y1", 0)
                  .attr("x2", 0)
                  .attr("y2", - quadrantHeight());
      }

      function renderYAxis(axesG){
          var yAxis = d3.svg.axis()
                  .scale(_y.range([quadrantHeight(), 0]))
                  .orient("left");

          axesG.append("g")
                  .attr("class", "y axis")
                  .attr("transform", function () {
                      return "translate(" + xStart() + "," + yEnd() + ")";
                  })
                  .call(yAxis);

           d3.selectAll("g.y g.tick")
              .append("line")
                  .classed("grid-line", true)
                  .attr("x1", 0)
                  .attr("y1", 0)
                  .attr("x2", quadrantWidth())
                  .attr("y2", 0);
      }
      function defineBodyClip(svg) { // <-2C
          var padding = 5;
          svg.append("defs")
                  .append("clipPath")
                  .attr("id", "body-clip")
                  .append("rect")
                  .attr("x", 0 - padding)
                  .attr("y", 0)
                  .attr("width", quadrantWidth() + 2 * padding)
                  .attr("height", quadrantHeight());
      }
      function renderBody(svg) { // <-2D
          if (!_bodyG)
              _bodyG = svg.append("g")
                      .attr("class", "body")
                      .attr("transform", "translate("
                          + xStart() + ","
                          + yEnd() + ")") // <-2E
                      .attr("clip-path", "url(#body-clip)");
          renderLines();
          renderDots();
      }
      function renderLines() {
          _line = d3.svg.line() //<-4A
                          .x(function (d) { return _x(d.x); })
                          .y(function (d) { return _y(d.y); });

          _bodyG.selectAll("path.line")
                      .data(_data)
                  .enter() //<-4B
                  .append("path")
                  .style("stroke", function (d, i) {
                      return _colors(i); //<-4C
                  })
                  .attr("class", "line");
          _bodyG.selectAll("path.line")
                  .data(_data)
                  .transition() //<-4D
                  .attr("d", function (d) { return _line(d); });
      }
      function renderDots() {
          _data.forEach(function (list, i) {
              _bodyG.selectAll("circle._" + i) //<-4E
                          .data(list)
                      .enter()
                      .append("circle")
                      .attr("class", "dot _" + i);
              _bodyG.selectAll("circle._" + i)
                      .data(list)
                      .style("stroke", function (d) {
                          return _colors(i); //<-4F
                      })
                      .transition() //<-4G
                      .attr("cx", function (d) { return _x(d.x); })
                      .attr("cy", function (d) { return _y(d.y); })
                      .attr("r", 4.5);
          });
      }
      function xStart() {
          return _margins.left;
      }
      function yStart() {
          return _height - _margins.bottom;
      }
      function xEnd() {
          return _width - _margins.right;
      }
      function yEnd() {
          return _margins.top;
      }
      function quadrantWidth() {
          return _width - _margins.left - _margins.right;
      }
      function quadrantHeight() {
          return _height - _margins.top - _margins.bottom;
      }
      _chart.width = function (w) {
          if (!arguments.length) return _width;
          _width = w;
          return _chart;
      };
      _chart.height = function (h) { // <-1C
          if (!arguments.length) return _height;
          _height = h;
          return _chart;
      };
      _chart.margins = function (m) {
          if (!arguments.length) return _margins;
          _margins = m;
          return _chart;
      };
      _chart.colors = function (c) {
          if (!arguments.length) return _colors;
          _colors = c;
          return _chart;
      };
      _chart.x = function (x) {
          if (!arguments.length) return _x;
          _x = x;
          return _chart;
      };
      _chart.y = function (y) {
          if (!arguments.length) return _y;
          _y = y;
          return _chart;
      };
      _chart.addSeries = function (series) { // <-1D
          _data.push(series);
          return _chart;
      };
      return _chart; // <-1E
  }
  function randomData() {
      return Math.random() * 9;
  }
  function update() {
      for (var i = 0; i < data.length; ++i) {
          var series = data[i];
          series.length = 0;
          for (var j = 0; j < numberOfDataPoint; ++j)
              series.push({x: j, y: randomData()});
      }
      chart.render();
  }
  var numberOfSeries = 2,
      numberOfDataPoint = 11,
      data = [];
  for (var i = 0; i < numberOfSeries; ++i)
      data.push(d3.range(numberOfDataPoint).map(function (i) {
          return {x: i, y: randomData()};
      }));
  var chart = lineChart()
          .x(d3.scale.linear().domain([0, 10]))
          .y(d3.scale.linear().domain([0, 10]));
  data.forEach(function (series) {
      chart.addSeries(series);
  });
  chart.render();
};

export default d3Chart;
