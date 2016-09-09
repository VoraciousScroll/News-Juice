// TO-DOs

// 1: Make it so timeline width fills out the width of parent div.
// see: http://jsfiddle.net/shawnbot/BJLe6/
// use document.getElementById('graph') instead of $('#graph');

// Timeline height can be a fixed px height.

// 2: Set up graph to start from the middle of y-axes rather than bottom

angular.module('smartNews.services', [])

.factory('renderGraph', function() {

  var renderGraph = function(dataObj) {
    data = dataObj.data.timeSeries;

    // set graph dimensions and margins
    // var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    
    // delete this when testing is complete
    var margin = { top: 0, right: 0, bottom: 0, left: 0 };

    // fixed size graph:
    var graph = document.getElementById('graph');
    // var width = window.innerWidth - margin.left - margin.right;
    // var height = 200 - margin.top - margin.bottom;
    var width = 500
    var height = 500;

    // parse UTC date/time
    var parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

    // set X & Y range
    // range is the raw data values scaled to fit the graph dimensions
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // // append svg graph object to div with id='graph'
    // var svg = d3.select('#graph')
    //   .append('svg')
    //   .attr('width', width + margin.left + margin.right)
    //   .attr('height', height + margin.top + margin.bottom)
    //   // append group element
    //   .append('g')
    //   // move group element to top left margin
    //   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var widthz = 2000;
    var heightz = 2000;

    var svg = d3.select('#graph')
      .append('div')
      .classed('svg-container', true) //container class to make it responsive
      .append('svg')
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr('preserveAspectRatio', 'xMinYMin meet')
      // .attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('viewBox', '0 0 1000 1000')
      .append('g')
      //class to make it responsive
      .classed('svg-content-responsive', true);

    // div element for tooltip
    var div = d3.select('#graph').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // format data
    data.forEach(function(d) {
      d.date = parseTime(d.publishedAt);
      d.value = d.count;
    });

    // create line and set x/y values
    var valueline = d3.line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.value);
      });

    // set min and max values of data
    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));
    y.domain([0, d3.max(data, function(d) {
      return d.value;
    })]);

    // add valueline path to graph
    svg.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', valueline);

    svg.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('width', width / data.length)
      .attr('height', height)
      .attr('x', function(d) {
        return x(d.date - (width / data.length / 2));
      })
      .attr('y', 0)
      .attr('class', 'tooltip-target')
      .on('mouseover', function(d) {
        div.transition()
          .duration(100)
          .style('opacity', 0.75);
        div.html(
            '<span class="tooltip-date">' + moment(d.date).format("MM/DD/YYYY") + '<br/>' + '<span class="tooltip-value">' + d.value + ' articles'
          )
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
      })
      .on('mouseout', function(d) {
        div.transition()
          .duration(250)
          .style('opacity', 0);
      });

    // add x-axis labels
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // add y-axis labels
    svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y));
  };

  return renderGraph;
});
