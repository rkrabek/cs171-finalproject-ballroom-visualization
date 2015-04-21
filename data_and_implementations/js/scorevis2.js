/**
 * Created by Hendrik Strobelt (hendrik.strobelt.com) on 1/28/15.
 */

//Leila's additions: added color scale l.63

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
    this.margin = {top: 20, right: 2000, bottom: 6000, left: 50},
    this.width = 850,
    this.height = 330;

    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
ScoreVis.prototype.initVis = function(){

    var that = this; // read about the this

    //TODO: implement here all things that don't change
    //TODO: implement here all things that need an initial status
    // Examples are:
    // - construct SVG layout
    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

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
        // Trigger selectionChanged event. You'd need to account for filtering by time AND type
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
    this.displayData = this.data;

}



/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
ScoreVis.prototype.updateVis = function(){
    that = this;
    // updates scales
    this.x.domain(d3.extent(this.displayData.events, function(d) { return d.date; }));
    this.y.domain(d3.extent(this.displayData.events, function(d) { return d.score; }));

    this.xScale.domain(d3.extent(this.displayData.events, function(d) { return d.date; }));
    this.yScale.domain(d3.extent(this.displayData.events, function(d) { return d.score; }));

    // updates axis
    this.svg.select(".x.axis")
        .call(this.xAxis);

    this.svg.select(".y.axis")
        .call(this.yAxis)

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
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { debugger; return that.xScale(d.date); })
        .y(function(d) { return that.yScale(d.score); });


  var city = svg.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});

           /* var couple1 = d3.svg.line()
                .x(function(d) { return that.xScale(d.date); })
                .y(function(d) { return that.yScale(d.score); })
                .interpolate("cardinal");

            this.svg.append('svg:path')
              .attr('d', couple1(this.displayData.events))
              .attr('stroke', 'green')
              .attr('stroke-width', 2)
              .attr('fill', 'none'); */


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

var getInnerWidth = function(element) {
    var style = window.getComputedStyle(element.node(), null);

    return parseInt(style.getPropertyValue('width'));
}



/**
 * creates the y axis slider
 * @param svg -- the svg element
 */
ScoreVis.prototype.addSlider = function(svg){
    var that = this;

    // TODO: Think of what is domain and what is range for the y axis slider !!
    var sliderScale = d3.scale.linear().domain([0,200]).range([0,200])

    var sliderDragged = function(){
        var value = Math.max(0, Math.min(200,d3.event.y));

        var sliderValue = sliderScale.invert(value);

        // TODO: do something here to deform the y scale
        console.log("Y Axis Slider value: ", sliderValue);


        d3.select(this)
            .attr("y", function () {
                return sliderScale(sliderValue);
            })

        that.updateVis({});
    }
    var sliderDragBehaviour = d3.behavior.drag()
        .on("drag", sliderDragged)

    var sliderGroup = svg.append("g").attr({
        class:"sliderGroup",
        "transform":"translate("+0+","+30+")"
    })

    sliderGroup.append("rect").attr({
        class:"sliderBg",
        x:5,
        width:10,
        height:200
    }).style({
        fill:"lightgray"
    })

    sliderGroup.append("rect").attr({
        "class":"sliderHandle",
        y:0,
        width:20,
        height:10,
        rx:2,
        ry:2
    }).style({
        fill:"#333333"
    }).call(sliderDragBehaviour)


}






