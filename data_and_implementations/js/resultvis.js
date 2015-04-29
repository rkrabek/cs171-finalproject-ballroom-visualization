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

    // displayData should hold the data which is visualized
    // pretty simple in this case -- no modifications needed
    this.displayData = this.data[0]
    /*this.displayData[0] = this.data[100];
    this.displayData[1] = this.data[200];
    this.displayData[2] = this.data[300];
    this.displayData[3] = this.data[400];
    this.displayData[4] = this.data[500];
    this.displayData[5] = this.data[600]; */
    debugger;

    // Filter data

}



/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
ResultVis.prototype.updateVis = function() {
    var that = this;

    var scoreMin = d3.min(this.displayData.events, function(d) { return d3.min(d.results, function(e) { return parseInt(e.score); }); });
    var scoreMax = d3.max(this.displayData.events, function(d) { return d3.max(d.results, function(e) { return parseInt(e.score); }); });

    xScale.domain([min, max]);
    yScale.domain(data.map(function(d) { return d.name; }));
    
    var rows = g.append("g")
                    .selectAll("g.row")
                    .data(data)
                  .enter()
                    .append("g")
                    .attr("class", "row")
 
        var bars = rows
                    .append("rect")
                    .attr("width", function(d) { return xScale(d.population); })
                    .attr("height", 5)
                    .attr("x", xScale(min))
                    .attr("y", function(d) { return yScale(d.name); })
                    .text(function(d) { return d; }); 
  
}

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







