//  svg window's sizes
var margin = {top: 30, right: 20, bottom: 30, left: 150},
    width = 1050 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// zero line
var zeroline = { lineValue: 0, label: '0\xB0C' };

// parse CSV data to JavaScript dates
var parseDate = d3.time.format("%Y/%m/%d").parse;

var x = d3.time.scale()
    .range([0, width]);
var y = d3.scale.linear()
    .range([height, 0]);

// define axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// define data line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

// append header div text
var header = d3.select("body")
  .append("div")
  .attr("id", "header")
  .attr("align", "center");
var title = d3.select("#header")
  .append("h2")
  .text("De Bilt - 2010");
var headertext = d3.select("#header")
  .append("p")
  .text("De verticale as geeft de maximale temperatuur in 0.1 graden Celsius aan.")

// append svg to body
var svg = d3.select("body")
  .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
  .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// load csv data
d3.csv("data.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.temperature = +d.temperature;
    })

    // x and y domains
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.temperature; }));

    // add x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // add y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Temperature (0.1\xB0C)");

    // draw graph
    svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(data));

    var xDomain = d3.extent(data, function(d) { return d.date; })
    var yDomain = d3.extent(data, function(d) { return d.temperature; });

    var xScale = d3.time.scale().range([0, width]).domain(xDomain);
    var yScale = d3.scale.linear().range([height, 0]).domain(yDomain);

    // append crosshair
    var crosshair = svg.append('g').style('display', 'none');
    crosshair.append('line')
        .attr('id', 'crosshair_x')
        .attr('class', 'crosshair');
    crosshair.append('line')
        .attr('id', 'crosshair_y')
        .attr('class', 'crosshair');
    crosshair.append('circle')
        .attr('id', 'crosshair_circle')
        .attr('r', 5)
        .attr('class', 'circle crosshair_circle');

    var bisect_date = d3.bisector(function(d) { return d.date; }).left;

    // append divs for crosshair date and temp
    d3.select("body")
      .append("div")
            .attr("id", 'divtemp')
            .style('display', 'none');
    d3.select("body")
      .append("div")
            .attr("id", 'divdate')
            .style('display', 'none');

    // append overlay rectangle/canvas for crosshair
    svg.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', function() { crosshair.style('display', null); })
        .on('mouseout', function() { crosshair.style('display', 'none'); })

        .on('mousemove', function() {

            // hide div elements
            d3.select("divtemp").style('display', 'none');
            d3.select("divdate").style('display', 'none')

            var mouse = d3.mouse(this);
            var mouse_date = xScale.invert(mouse[0]);
            var i = bisect_date(data, mouse_date);
            var d0 = data[i - 1]
            var d1 = data[i];

            // find date closest to mouse
            var d = mouse_date - d0[0] > d1[0] - mouse_date ? d1 : d0;
            var x = xScale(d.date);
            var y = yScale(d.temperature);

            // draw crosshair
            crosshair.select('#crosshair_circle')
                .attr('cx', x)
                .attr('cy', y);
            crosshair.select('#crosshair_x')
                .attr('x1', x).attr('y1', yScale(yDomain[0]))
                .attr('x2', x).attr('y2', yScale(yDomain[1]));
            crosshair.select('#crosshair_y')
                .attr('x1', xScale(xDomain[0])).attr('y1', y)
                .attr('x2', xScale(xDomain[1])).attr('y2', y);

            // clear timeout function
            clearTimeout(drawdivs);

            // set timeout function
            drawdivs = setTimeout(function(){
              // show div blocks
              d3.select("#divtemp").style('display', 'block')
              d3.select("#divdate").style('display', 'block')

              // center temp div relative to residue x axis
              d3.select("#divtemp").style('left', x + "px");
              d3.select("#divtemp").style('top', y + "px");

              // center date div relative to residue y axis
              d3.select("#divdate").style('left', x + "px");
              d3.select("#divdate").style('top', y + "px");
            }, 750);
        });

        // warn line
        svg.append('line')
            .attr('x1', xScale(xDomain[0]))
            .attr('y1', yScale(zeroline.lineValue))
            .attr('x2', xScale(xDomain[1]))
            .attr('y2', yScale(zeroline.lineValue))
            .attr('class', 'zeroline');
        svg.append('text')
            .attr('x', xScale(xDomain[1]))
            .attr('y', yScale(zeroline.lineValue))
            .attr('dy', '1em')
            .attr('text-anchor', 'end')
            .text(zeroline.label)
            .attr('class', 'zerolinetext');
  })
