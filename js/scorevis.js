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
    
    // define all "constants" 
    this.parentElement = _parentElement;
    this.data = _data;
    this.eventHandler = _eventHandler;
    this.displayData = [];
    var selectedIndex = [];  
    this.listCount = 0;  

    this.margin = {top: 50, right: 400, bottom: 100, left: 100},
    this.width = 800,
    this.height = 330;

    this.createButtons();

    this.createDropdown();

    this.displayChange();

    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
ScoreVis.prototype.initVis = function(){

    var that = this;

    // construct SVG layout 
    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      
    // construct parent element for graph
    this.gParent = d3.select("svg").append("g")
        .attr("class", "gParent")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // define axis and scales
    this.x = d3.time.scale()
      .range([0, this.width]);

    this.y = d3.scale.linear()
      .range([this.height, 0]);

    this.color = d3.scale.category10();

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient("bottom");

    this.yAxis = d3.svg.axis()
      .scale(this.y)
      .orient("left");

    this.gParent.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.height + ")")

    this.gParent.append("g")
        .attr("class", "y axis")
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Score");

    this.onSelectionChange(); 

}



/**
 * Method to wrangle the data. In this case it takes an options object
  */
ScoreVis.prototype.wrangleData= function(filteredData){

    // construct display
    if (filteredData != null) {
          this.displayData = filteredData;
    } else if (filteredData == null) {
      this.displayData = this.data;
    }
}



/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
ScoreVis.prototype.updateVis = function(){
   d3.selectAll(".text_loading").remove()
   d3.selectAll("i").remove()

    var that = this;

    // update min and max for scale domains
    dateMin = d3.min(this.displayData, function(d) { return d3.min(d.events, function(e) { return e.date;}); });
    dateMax = d3.max(this.displayData, function(d) { return d3.max(d.events, function(e) { return e.date;}); });
    scoreMin = d3.min(this.displayData, function(d) { return d3.min(d.events, function(e) { return parseInt(e.score); }); });
    scoreMax = d3.max(this.displayData, function(d) { return d3.max(d.events, function(e) { return parseInt(e.score)/*+50*/; }); });

    // updates scales
    this.x.domain([dateMin, dateMax]);  
    this.y.domain([scoreMin, scoreMax]);

    // update color scale
    this.color.domain(this.displayData.map(function(d) {return d.coupleid}));
    
    // update tool tip
    var tip = d3.tip()
      .attr("class", "d3-tip-1")
      .offset([-10, 0])
      .html(function(d) { 
            return "<strong>Comp:</strong> <span style='color:red'>" + d.compname + "</span>";
      });

    // call x axis
    this.gParent.select(".x.axis")
        .call(this.xAxis);

    // call y axis
    this.gParent.select(".y.axis")
        .call(this.yAxis)

    // call tool tip
    this.gParent.call(tip);    

    // define line function
    var line = d3.svg.line()
      .x(function(d) { return that.x(d.date); })
      .y(function(d) { return that.y(d.score); })
     // .interpolate("monotone");

    // create SVG for each couple to hold lines, points, and text for that couple
    var couple = this.gParent.selectAll(".couple")
        .data(this.displayData)

    // generate proper number of couples
    couple.enter().append("g")
        .attr("class", "couple");

    // append lines for each couple
    couple.append("path")
        .attr("d", function(d) { return line(d.events); })
        .attr("class", "line")
        .attr("opacity", 0.5)
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("id", function(d) { return "line_"+d.coupleno }) 
        .style("stroke", function(d) { return that.color(d.coupleid); })
    
    // append text for each couple's name   
    couple.append("text")
        .attr("d", function(d) { return line(d.events); })
        .attr("transform", function(d) { return "translate(" + that.x(d.events[d.events.length - 1].date) + "," + that.y(d.events[d.events.length - 1].score) + ")"; })
        .attr("x", 3)
        .style("fill", function(d) {return that.color(d.coupleid);} )
        .style("font-size","24px")
        .attr("class","linetext")
        .text(function(d) { return d.coupleid; })
        .attr("id", function(d) { return "text_"+d.coupleno });
    
    // create SVG to hold points for each couple
    var point = couple.append("g")
        .attr("class", "point");
    
    // append points for each couple
    point.selectAll('circle')
        .data(function(d){ return d.events})
        .enter().append('circle')
        .attr("r", 4)
        .attr("cx", function(d) { return that.x(d.date) })
        .attr("cy", function(d) { return that.y(d.score) })
        .attr("d", function(d) { return that.displayData; })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
        //.style("fill", function(d) { return that.color(d.coupleid); })

    this.svg.selectAll('circle')
        .on("click", function(d) {
            var selectedStuff = [];
            selectedStuff.push(d.compname);
            selectedStuff.push(d.eventname);
            $(that.eventHandler).trigger("selectionChanged", selectedStuff);
        })

  }

 function remove_graph() {
    d3.selectAll(".couple").remove()
  }
/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
ScoreVis.prototype.onSelectionChange= function (){
    var that = this;
    selectedIndex = []

    if (this.listCount>0) {
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

	    //sorts alphabetically
	    selectedIndex2 = selectedIndex2.sort();
	    //filters out duplicate couples
	    var uniqueIndex = [];
	    for (var i = 0; i < selectedIndex2.length; i++) {
	        if (selectedIndex2[i + 1] != selectedIndex2[i]) {
	            uniqueIndex.push(selectedIndex2[i]);
	        }
	    }
	    var filteredIndex = [];
	    uniqueIndex.map(function (d){
	      that.data.map(function (e){
	        if (e.coupleid == d) {
	          filteredIndex.push(e);
	        } else {
	          return false;
	        }
	      });
	    });
	} else {
		that.displayData = that.data; 	
	};
    
    remove_graph()

	this.wrangleData(filteredIndex);
	
	this.updateVis();
}


/*
 *
 * ==================================
 * From here on only HELPER functions
 * ==================================
 *
 * */

ScoreVis.prototype.displayChange = function(){
  	var that = this;
 	
 	// change display data when selections change change
 	var list = d3.selectAll("#primaryCouple").on("change", function() {
 		selectedIndex = that.onSelectionChange();
 	});

 	// add new list when button is clicked
 	var addCouple = d3.selectAll("#button_0").on("click", function() { 
 		that.createDropdown(); 
 		//that.onSelectionChange(); 
 	});
 	
 	// delete most recent list when button is clicked
 	var deleteCouple = d3.selectAll("#button_1").on("click", function() { 
 		that.deleteDropdown(); 
 		that.onSelectionChange(); 
 	});
 	
 	// show all couples data and delete all lists when button is clicked
 	var showAll = d3.selectAll("#button_2").on("click", function() { 
 		var count = that.listCount
 		for (var i = 0; i < count; i++) {
 			that.deleteDropdown();
 		}; 	
 		that.onSelectionChange(); 
 	});
}

ScoreVis.prototype.createDropdown = function(){
    var that = this;

    // increase list count
    this.listCount++;

    // create new list
    var list = d3.select("#primaryCouple").append("select").attr("id", "dropdown_"+that.listCount)

    //couples.unshift("null");

    // populate list with options for each couple
    list.selectAll("option")
        .data(couplesData)
      .enter().append("option")
        .attr("class", function(d) { return d.coupleid;})
        .text(function(d) {
        return d.coupleid; });
}

ScoreVis.prototype.deleteDropdown = function() {
    var that = this;
    
    // delete dropdown if dropdowns exist
    if (this.listCount>0) {
        d3.select("#dropdown_"+this.listCount).remove();
        that.listCount--;
    };
}

ScoreVis.prototype.createButtons = function(){
    
    // generate button text
    var buttonText = ["Add Couple", "Undo Add", "Show All"];

    // generate buttons
	d3.select("#buttonContainer").selectAll("button")
		.data(buttonText)
	  .enter().append("button")
	    .attr("id", function (d,i) {return "button_"+i})
	    .attr("class","changeCouples")
		.text(function (d){ return d;} );
		//.attr("type","button")

}


