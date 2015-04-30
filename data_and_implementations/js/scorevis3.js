/**
 * Created by Hendrik Strobelt (hendrik.strobelt.com) on 1/28/15.
 */

//Leila"s additions: added color scale l.63

/*
 *
 * ======================================================
 * We follow the vis template of init - wrangle - update
 * ======================================================
 *
 * */

/**
 * CountVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @param _eventHandler -- the Eventhandling Object to emit data to (see Task 4)
 * @constructor
 */
ScoreVis = function(_parentElement, _data, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.eventHandler = _eventHandler;
    this.displayData = [];


    // TODO: define all "constants" here
    this.margin = {top: 50, right: 400, bottom: 100, left: 50},
    this.width = 850,
    this.height = 330;

    /*this.vars = {
    "debug": false,
    //'encoding': "gdp",
    "filter": []
    //'aggregate': [],
    //'year': 1995,
    //'min_year': 1995,
    //'max_year': 2012,
    //'columns': [],
    //'data': null,
    //'sort_by': {'column': 'population', 'asc': true}
  }*/

    var selectedIndex = [];
    this.createDropdown();
    this.createDropdown();
    this.createDropdown();
    this.createDropdown();
    this.createDropdown();
    this.createDropdown();
    this.createDropdown();
    this.createDropdown();

    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
ScoreVis.prototype.initVis = function(){

    var that = this; // read about the this

    //TODO: implement here all things that don"t change
    //TODO: implement here all things that need an initial status
    // Examples are:
    // - construct SVG layout
    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.gLines = this.svg.append("g")

    this.gPoints = this.svg.append("g")

    // creates axis and scales
    this.x = d3.time.scale()
      .range([0, this.width]);

    this.y = d3.scale.linear()
      .range([this.height, 0]);

    this.color = d3.scale.category10();

    this.xScale = d3.time.scale()
      .range([0, this.width]);

    this.yScale = d3.scale.linear()
      .range([this.height, 0]);

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient("bottom");

    this.yAxis = d3.svg.axis()
      .scale(this.y)
      .orient("left");

    this.tip = d3.tip()
      .attr('class', 'd3-tip');

    /*this.area = d3.svg.area()
      .interpolate("monotone")
      .x(function(d) { return that.x(d.time); })
      .y0(this.height)
      .y1(function(d) { return that.y(d.count); });
    */
    // -  implement brushing !!
 /*   this.brush = d3.svg.brush()
      .on("brush", function(){
        var selectedDates = that.brush.extent();
        // Trigger selectionChanged event. You"d need to account for filtering by time AND type
        $(that.eventHandler).trigger("selectionChanged", selectedDates);
      });
*/
    // --- ONLY FOR BONUS ---  implement zooming



    // TODO: modify this to append an svg element, not modify the current placeholder SVG element
    //this.svg = this.parentElement.select("svg");

    this.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.height + ")")

    this.svg.append("g")
        .attr("class", "y axis")
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Score");



    // filter, aggregate, modify data
    this.wrangleData();

    // call the update method
    this.updateVis();
}



/**
 * Method to wrangle the data. In this case it takes an options object
  */
ScoreVis.prototype.wrangleData= function(){

    // displayData should hold the data which is visualized
    // pretty simple in this case -- no modifications needed
    this.displayData = this.data
    /*this.displayData[0] = this.data[100];
    this.displayData[1] = this.data[200];
    this.displayData[2] = this.data[300];
    this.displayData[3] = this.data[400];
    this.displayData[4] = this.data[500];
    this.displayData[5] = this.data[600];*/
}



/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
ScoreVis.prototype.updateVis = function(){
    var that = this;

    // define mins and maxes for scale domains
    dateMin = d3.min(this.displayData, function(d) { return d3.min(d.events, function(e) { return e.date;}); });
    dateMax = d3.max(this.displayData, function(d) { return d3.max(d.events, function(e) { return e.date;}); });
    scoreMin = d3.min(this.displayData, function(d) { return d3.min(d.events, function(e) { return parseInt(e.score); }); });
    scoreMax = d3.max(this.displayData, function(d) { return d3.max(d.events, function(e) { return parseInt(e.score)/*+50*/; }); });

    // updates scale domains
    this.x.domain([dateMin, dateMax]);  
    this.y.domain([scoreMin, scoreMax]);
    this.xScale.domain([dateMin, dateMax]); 
    this.yScale.domain([scoreMin, scoreMax]);

    // color scale ... doesn"t work
    this.color.domain(this.displayData.map(function(d) {return d.coupleid}));

    this.tip.html(function(d) { return d; });
    /*this.tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) { 
            return "<strong>Comp:</strong> <span style='color:red'>" + d.coupleid + "</span>";
          })
      })*/

    // updates axis
    this.svg.select(".x.axis")
        .call(this.xAxis);

    this.svg.select(".y.axis")
        .call(this.yAxis)

    this.svg.call(this.tip);    

    /* updates graph
    var path = this.svg.selectAll(".area")
      .data([this.displayData])

    path.enter()
      .append("path")
      .attr("class", "area");

    path
      .transition()
      .attr("d", this.area);

    path.exit()
      .remove();
  */

  // define line function
  var line = d3.svg.line()
    .x(function(d) { return that.x(d.date); })
    .y(function(d) { return that.y(d.score); })
    .interpolate("monotone");
  
  this.ptext = that.gPoints.selectAll(".ptext");

  // append text for points for competitions to "gPoints"
  var enterCompName = function(i, j) {
    console.log("hi")
      that.ptext
          .data(that.displayData[i].events[j])
        .enter().append("gPoints:text")
           .attr("id", function(e) {return "ptext_" + e.compid; })
           .attr("transform", function(e) { return "translate(" + that.x(e.date) + "," + that.y(e.score) + ")"; })
           .attr("x", 3)
           .attr("dy", ".35em")
           .attr("id", function(e) { return "ptext_"+e.compid; })
           .attr("opacity", 1)
           .text( function(e) { return e.compname; });

      //that.ptext.exit().remove;
  }

  var exitCompNmae = function() {
      that.ptext
          .data([])
        .enter().append("gPoints:text")
           .attr("id", function(e) { return "ptext_" + e.compid; })
           .attr("transform", function(e) { return "translate(" + that.x(e.date) + "," + that.y(e.score) + ")"; })
           .attr("x", 3)
           .attr("dy", ".35em")
           .attr("id", function(e) { return "ptext_"+e.compid; })
           .attr("opacity", 1)
           .text( function(e) { return e.compname; });

      that.ptext.remove;
  }

  // loop through all couples in displayData
  this.displayData.forEach(function(d,i) {

      // append circles for points for competitions to "gPoints"
      that.points = that.gPoints.selectAll(".point")
          .data(that.displayData[i].events)
        .enter().append("gPoints:circle")
           .attr("stroke", function() {return that.color(i);} )
           .attr("id", "point_"+d.coupleno)
           .attr("fill", function() {return that.color(i);} )
           .attr("cx", function(e) { return that.x(e.date) })
           .attr("cy", function(e) { return that.y(e.score) })
           .attr("r", 3.5)
           .on("mouseover",function(e, j) { enterCompName(i, j) })
           .on("mouseout", exitCompNmae());

      // append text for lines for each couple to "gLines"
      that.gLines.append("gLines:text")
          //.datum(function() { return { debugger; coupleid: d.coupleid, one_event: d.events[d.events.length - 1]}; })
          .attr("transform", function() { return "translate(" + that.x(d.events[d.events.length - 1].date) + "," + that.y(d.events[d.events.length - 1].score) + ")"; })
          .attr("x", 3)
          .attr("dy", ".35em")
          .attr("id", "text_"+d.coupleno)
          .attr("opacity", 0)
          .style("fill", function() {return that.color(i);} )
          .style("font-size","24px")
          .attr("class","legend")
          .text(function() { return d.coupleid; });
      
      // append path for lines for each couple to "gLines" and implement mouseover/mouseout functionality for text for that couple
      that.gLines.append("gLines:path")
          .attr("d", line(d.events))
          .attr("opacity", 0.5)
          .attr("stroke", function() {return that.color(i);} )/*function() { return "hsl(" + i/9 * 200 + ",100%,50%)"; })*/
          .attr("stroke-width", 3)
          .attr("id", "line_"+d.coupleno)
          .attr("fill", "none")
          .on("mouseover", function() {
              d3.select("#text_" + d.coupleno).style("opacity", 1);
          })
          .on("mouseout", function() {
              d3.select("#text_" + d.coupleno).style("opacity", 0);
          });

      // append legend and implement on click functionality for line and text for that couple
      that.svg.append("text")
          .attr("x", function() { return i%3*that.width/3+100 })
          .attr("y", function() { return i%2*20 + that.height + 50})
          .on("click",function(){
              var active   = d.active ? false : true;
              var opacity = active ? 0 : 1;
              d3.select("#line_" + d.coupleno).style("opacity", opacity);
              d3.selectAll("#point_" + d.coupleno).style("opacity", opacity);
              d3.select("#text_" + d.coupleno).style("opacity", 0);
              d.active = active;
          })
          .text(d.coupleid);
      });
/*
            var couple1 = d3.svg.line()
                .x(function(d) { return that.xScale(d.date); })
                .y(function(d) { return that.yScale(d.score); })
                .interpolate("cardinal");

            this.svg.append("svg:path")
              .attr("d", couple1(this.displayData.events))
              .attr("stroke", "green")
              .attr("stroke-width", 2)
              .attr("fill", "none"); */


    // TODO: implement update graphs (D3: update, enter, exit)
 
    /*var maxTime = d3.max(selectedTime, function (d) {return d.time;});
    var maxCount = d3.max(selectedTime, function (d) {return d.count;});
    var minTime = d3.min(selectedTime, function (d) {return d.time;});
    var minCount = d3.min(selectedTime, function (d) {return d.count;});

    xTimeScale.domain([minTime, maxTime]);
    yCountScale.domain([minCount, maxCount]);

    var area = d3.svg.area(selectedTime)
        .x(function (d) { return x(d.date); })
        .y0(height)
        .y1(function (d) { return y(d.close); });
*/
}

/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
ScoreVis.prototype.onSelectionChange= function (selectionStart, selectionEnd){

    // TODO: call wrangle function
    this.updateVis
    // do nothing -- no update when brushing


}


/*
 *
 * ==================================
 * From here on only HELPER functions
 * ==================================
 *
 * */

ScoreVis.prototype.createDropdown = function(){
  var that = this;
  var list = d3.select("#primaryCouple").append("select").on("change", function() {selectedIndex = that.displayChange(); console.log(selectedIndex)});
  //couples.unshift("null");
  list.selectAll("option")
        .data(this.data)
        .enter()
        .append("option")
        .attr("class", function(d) {return d.coupleid;})
        .text(function(d) {
        return d.coupleid; })
  }

ScoreVis.prototype.displayChange = function() {
    selectedIndex = []

    selectedIndex = d3.selectAll("option")
        .filter(function(d,i) {
            return this.selected;
        });

    //selectedIndex = list.property('selectedIndex');
    //console.log(selectedIndex);

    var selectedIndex2 = []
    selectedIndex[0].forEach(function(d, i) {
        selectedIndex2[i] = d.className
    })
    return selectedIndex2;

    //selectedIndex = list.property('selectedIndex');
} 


var getInnerWidth = function(element) {
    var style = window.getComputedStyle(element.node(), null);

    return parseInt(style.getPropertyValue("width"));
}









