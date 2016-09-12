// TO-DOs

// 1: Make it so timeline width fills out the width of parent div.
// see: http://jsfiddle.net/shawnbot/BJLe6/
// use document.getElementById('graph') instead of $('#graph');

// Timeline height can be a fixed px height.

// 2: Set up graph to start from the middle of y-axes rather than bottom

angular.module('smartNews.services', ['ngCookies'])

.factory('renderGraph', function($rootScope) {
  var selectedDate = {
    startDate: 'NOW-2DAYS',
    endDate: 'NOW'
  };

  var renderGraph = function(dataObj) {

    data = dataObj.data.timeSeries;

    //clear out contents of graph prior to rendering, to prevent stacking graphs
    // using 'window' is necessary here due to lexical scope.
    if (window.graph.innerHTML !== undefined) {
      window.graph.innerHTML = '';
    }

    // set graph dimensions and margins
    var margin = { top: 0, right: 50, bottom: 50, left: 50 };

    // fixed size graph. These values are shorter than true innerWidth / innerHeight:
    var graph = document.getElementById('graph');
    var width = window.innerWidth - margin.left - margin.right;
    var height = window.innerHeight * 0.5 - margin.top - margin.bottom;

    // parse UTC date/time
    var parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

    // set X & Y range
    // range is the raw data values scaled to fit the graph dimensions
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var svg = d3.select('#graph')
      .append('div')
      // .classed('svg-container', true) //container class to make it responsive
      .append('svg')
      // responsive SVG needs these two attr's and an absence of height and width attr's
      // .attr('preserveAspectRatio', 'xMinYMin meet') // preserves aspect ratio by 'fitting' the viewbox to the viewport, rather than filling
      // .attr('viewBox', '0 0 ' + (window.innerWidth) + ' ' + (window.innerHeight))
      .attr('viewBox', '0 0 ' + (window.innerWidth) + ' ' + 400 )
      // append group element
      .append('g')
      // center group element on page by subtracting viewbox length from viewport length, halving, and spacing that many pixels
      .attr('transform', 'translate(' + ((window.innerWidth - width) / 2) + ',0)')
      .classed("svg-content-responsive", true);

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

    // filled area definition
    var dataFill = d3.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.value); });

    // set min and max values of data
    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));
    y.domain([0, d3.max(data, function(d) {
      return d.value;
    })]);

    // create filled area
    svg.append('path')
      .datum(data)
      .attr('class', 'datafill')
      .attr('d', dataFill);

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
        d3.select(this)
          .classed('tooltip-target-on', true);
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
        d3.select(this)
          .classed('tooltip-target-on', false);
        div.transition()
          .duration(250)
          .style('opacity', 0);
      })
      .on('click', function(d) {
        var startDate = d.publishedAt.split('T')[0];
        selectedDate.startDate = new Date(startDate).toISOString();
        var endDate = new Date(startDate);
        endDate = endDate.setDate(endDate.getDate() + 1);
        selectedDate.endDate = new Date(endDate).toISOString();
        $rootScope.$broadcast('user:clickDate', selectedDate);
      });

    // add x-axis labels
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // add y-axis labels
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + '0' + ')')
      .call(d3.axisLeft(y));
  };

  return {
    renderGraph: renderGraph,
    selectedDate: selectedDate
  };
})

.factory('isAuth', function($cookies) {
  return function() {
    var auth = $cookies.get('authenticate');
    if (auth && auth !== 'undefined') {
      var parsedAuth = JSON.parse(auth.slice(2)).user;
      return {
        firstname: parsedAuth.firstname,
        lastname: parsedAuth.lastname,
        picture: parsedAuth.picture,
      };
    }
    return null;
  };
})

.factory('saveArticle', function($http) {
  return function(article) {
    $http({
        method: 'POST',
        data: article,
        url: '/article'
      })
      .then(function(data) {
        console.log('success posting', data);
      });
  };
})

.factory('unsaveArticle', function($http) {
  return function(article, cb) {
    var url = '/unsavearticle/' + article._id;
    $http({
      method: 'DELETE',
      url: url
    })
    .then(function(data){
      console.log('success deleting', data);
      cb();
    });
  };
})

.factory('getSavedSearches', function($http) {
  return function(cb) {
    $http({
      method: 'GET',
      url: '/profile'
    })
    .then(function(data){
      data.data.forEach(function(e){
        e.formattedPublishDate = moment(e.publishDate).format('MMM DD YYYY');
        e.formattedSavedDate = moment(e.savedDate).format('MMM DD YYYY');
      });
      cb(data.data);
    });
  };
})

.factory('TopTrendsFactory', function($http, $sanitize) {
  var topTrends = [];
  var primaryArticle = [];

  var formattedTopic = function(topic) {
    return {
      topic: topic.title[0],
      articleTitle: topic['ht:news_item'][0]['ht:news_item_title'][0],
      traffic: topic['ht:approx_traffic'][0],
      img: 'http://' + topic['ht:picture'][0].slice(2),
      articleLink: topic['ht:news_item'][0]['ht:news_item_url'][0],
      articleSource: topic['ht:news_item'][0]['ht:news_item_source'][0]
    };
  };

  var getPrimaryArticle = function(topic) {
    var publishStart = 'NOW-2DAYS';
    var publishEnd = 'NOW';

    var url = '/seearticle?input=' + topic + '&start=' + publishStart + '&end=' + publishEnd + '&limit=1';
    return $http({
        method: 'GET',
        url: url
      })
      .then(function(article) {
        return article;
      });
  };

  var topTrendsGoogleTrends = function() {
    return $http({
        method: 'GET',
        url: '/api/news/topTrendsDetail'
      })
      .then(function(response) {
        response.data.forEach(function(topic, index) {
          if (index === 0) {
            var title = sanitizeTitle(formattedTopic(topic).articleTitle);
            getPrimaryArticle(title)
              .then(function(article) {
                primaryArticle.push(article.data.stories[0]);
              });
          }
          topTrends.push(formattedTopic(topic));
        });
      });
  };

  var setPrimaryArticle = function(article) {
    primaryArticle[0] = article;
  };

  var sanitizeTitle = function(title) {
    return title.replace('<b>', '')
      .replace('</b>', '')
      .replace('&#39;', '');
  };

  topTrendsGoogleTrends();

  return {
    topTrends: topTrends,
    primaryArticle: primaryArticle,
    setPrimaryArticle: setPrimaryArticle,
    getPrimaryArticle: getPrimaryArticle,
    sanitizeTitle: sanitizeTitle
  };
});



// window.update = update;
