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
    this.margin = {top: 50, right: 400, bottom: 100, left: 50},
    this.width = 850,
    this.height = 330;

    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
ResultVis.prototype.initVis = function(){

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

    // this.color = d3.scale.category20();

    this.xScale = d3.scale.linear()
      .range([0, this.width]);

    this.yScale = d3.scale.ordinal()
      .rangeRoundBands([0, this.height], .8, 0);

    this.svg = d3.select("body").append("svg")
                .attr("width", this.width+this.margin.left+this.margin.right)
                .attr("height", this.height+this.margin.top+this.margin.bottom);
 
    this.g = this.svg.append("g")
                .attr("transform", "translate("+this.margin.left+","+this.margin.top+")");

    // filter, aggregate, modify data
    this.wrangleData();

    // call the update method
    this.updateVis();
}



/**
 * Method to wrangle the data. In this case it takes an options object
  */
ResultVis.prototype.wrangleData= function(){
    that = this;
    // displayData should hold the data which is visualized
    // pretty simple in this case -- no modifications needed

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



/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
ResultVis.prototype.updateVis = function() {
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
  
}
ResultVis.prototype.accessor_name = function(d) { return d.name; };

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







