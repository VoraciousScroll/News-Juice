// data loading from data-test.json
// data source: https://api.newsapi.aylien.com/api/v1/time_series?period=%2B1DAY&text=OBAMA&published_at.start=NOW-1YEAR&published_at.end=NOW

// data storage object to be set by API call
var data = {};

// set graph dimensions and margins
var margin = {top: 20, right: 20, bottom: 30, left: 50};
// var width = (0.95 * window.innerWidth) - margin.left - margin.right;
// var height = (0.5 * window.innerHeight) - margin.top - margin.bottom;
// fixed size graph:
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// parse UTC date/time
var parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

// set X & Y range
// range is the raw data values scaled to fit the graph dimensions
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// create line and set x/y values
var valueline = d3.line()
  .x(function(d) {
    return x( parseTime(d.published_at) );
  })
  .y(function(d) {
    return y(d.value);
  });

// append svg graph object to div with id='graph'
var svg = d3.select('#graph')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
// append group element
.append('g')
  // move group element to top left margin
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var renderGraph = function() {
  // format data
  data.forEach(function(d) {
    d.date = parseTime(d.published_at);
    d.value = d.count;
  });

  // set min and max values of data 
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  // add valueline path to graph
  svg.append('path')
    .data([data])
    .attr('class', 'line')
    .attr('d', valueline);

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

// Retrieve data from API:
/*
d3.request('https://api.newsapi.aylien.com/api/v1/time_series?period=%2B1DAY&text=OBAMA&published_at.start=NOW-1YEAR&published_at.end=NOW')
  .mimeType('application/json')
  .on('error', function(error) {
    console.log('error retrieving data:', error);
  })
  .on('load', function(error, xhr) {
    data = JSON.parse(xhr.time_series);
    console.log('data:', data);
  })
  .send('GET');
*/

// Retreive data from JSON file (for testing) and render graph:
d3.json('data-test.json', function(error, json) {
  if (error) {
    console.log('error retrieving data:', error);
  } else {
    data = json.time_series;
    console.log('data:', data);
    renderGraph();
  }
});