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
ResultVis = function(_parentElement, _data, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.eventHandler = _eventHandler;
    this.compData = [];
    this.displayData = [];

    // TODO: define all "constants" here
    this.margin = {top: 50, right: 50, bottom: 50, left: 50};
    this.width = 600 - this.margin.left - this.margin.right;
    this.height = 480 - this.margin.top - this.margin.bottom;

    this.wrangleData();

    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
ResultVis.prototype.initVis = function(){

    var that = this; 

    this.svg = d3.select("body").append("svg")
        .attr("width", that.width+that.margin.left+that.margin.right)
        .attr("height", that.height+that.margin.top+that.margin.bottom);

    this.g = this.svg.append("g")
        .attr("transform", "translate("+that.margin.left+","+that.margin.top+")");

    this.xScale = d3.scale.linear().range([0, that.width]);
    this.yScale = d3.scale.ordinal().rangeRoundBands([0, that.height]);

    // filter, aggregate, modify data
    this.wrangleData();

    // create table (vertical bar chart)
    this.createVis();

    // update table
    //this.updateVis();
}



/**
 * Method to wrangle the data. In this case it takes an options object
  */
ResultVis.prototype.wrangleData= function(){
    that = this;

    // compData holds all data from that comp (including name of comp, compid etc.)
    this.compData = this.data.filter(function(d) {
            if (d.name == that.data[0].name) {
                return true;
            }
    })[0];

    // displayData holds data for event to be visualized, including the array of result objects 
    this.displayData = that.compData.events.filter(function(e) {
            if (e.name == that.data[0].events[1].name) {
                return true;
            }
    })[0];

}

ResultVis.prototype.createVis = function() {
    var that = this;

    // scale bar height to fill vis
    this.bar_height = this.height/this.displayData.results.length;

    // scale bar width by result
    this.xScale.domain([0, d3.max(that.displayData.results.map(function(d)  { return d.score }))]);
    
    // Vertical list of countries
    this.yScale.domain(that.displayData.results.map(function(d)  { return d.coupleid }));

    this.g = this.svg.append("g")
        .attr("transform", "translate("+that.margin.left+","+that.margin.top+")");

    // Groups for countries
    this.groups = this.g
        .attr("class", "gParent")
        .selectAll("g.group")
        .data(that.displayData.results, function(d) { return d.coupleid });

    // Create a group for each country
    this.groups_enter = this.groups.enter()
        .append("g")
        .attr("class", "group")
        .attr("transform", function(d, i) { 
            return "translate(0, " + that.yScale(d.coupleid) + ")"; 
      });

    // Text for each bar
    this.groups_enter.append("text")
        .attr("class","result")
        .attr("dx", -5)
        .attr("dy", this.bar_height)
        .attr("text-anchor", "end")
        .text(function(d) { return d.result; });

    // Bar details
    this.bars = this.groups_enter
        .append("rect")
        .attr("class","rect")
        //.style("fill", function(d,i){ return color(d.continent) })
        //.transition().duration(200)
        .attr("width", function(d, i) { 
            return that.xScale(d.score); 
        })
        .attr("height", that.bar_height-2)


  }  

function remove_table() {
    d3.select(".gParent").remove()
}  
/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
/*ResultVis.prototype.updateVis = function() {
    var that = this;

    var scoreMin = d3.min(this.displayData.results, function(r) { return parseInt(r.score); }); });
    var scoreMax = d3.max(this.displayData.results, function(r) { return parseInt(r.score); }); });

    this.xScale.domain([scoreMin, scoreMax]);
    this.yScale.domain(this.displayData.map(function(d) { return d.name; }));
    
    groups = g
      .attr("class", "gParent")
      .selectAll("g.group")
      .data(displayData, function(d))

     groups_enter = groups.enter()
      .append("g")
      .attr("class", "group")
      .attr("transform", function(d, i) { 
        return "translate(0, " + yScale(accessor_name(d)) +")"; 
      });
        var bars = rows
                    .append("rect")
                    .attr("width", function(d) { return xScale(d.population); })
                    .attr("height", 5)
                    .attr("x", xScale(min))
                    .attr("y", function(d) { return yScale(d.name); })
                    .text(function(d) { return d; }); 
  
}*/

/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */


/*
 *
 * ==================================
 * From here on only HELPER functions
 * ==================================
 *
 * */





/**
 * creates the y axis slider
 * @param svg -- the svg element
 */







