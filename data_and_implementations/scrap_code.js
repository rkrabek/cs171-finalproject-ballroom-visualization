  
  
// return max and min temperatures in values array
  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
  ]);



    /*uniqueIDs.map(function(c, i) {
        allData.map(function(d) {
            d.events.map(function(e) {
                e.results.map(function(r) {
                    couples[i]["coupleid"] = c;
                    couples[i]["score"] = r["score"];
                    couples[i]["change"] = r["change"];
                    couples[i]["date"] = e["date"];
                    couples[i]["style"] = e["style"];
                    couples[i]["compid"] = d["compid"];
                    couples[i]["compname"] = d["name"];
                })
            })
        })
    })
    debugger; */
    // double 238259

    //debugger;
//Attempt 1 (d3.nest)
/*
            var nested_rows = d3.nest()
                .key(function() { 
                    allData.map(function(d,i) {
                        d.events.map(function(e,j) {
                            e.results.map(function(r,k) {
                                return r.coupleid; 
                            }) 
                        })
                    })
                })
              .rollup(function() { 
                    allData.map(function(d,i) {
                        d.events.map(function(e,j) {
                            e.results.map(function(r,k) {
                                //debugger;
                                return {
                                    //"coupleid": r.coupleid,
                                    "score": r.score,
                                    "change": r.change,
                                    "date": e.date,
                                    "style": e.style,
                                    "compid": d.compid,
                                    "compname": d.name
                                };
                            })
                        })
                    })
                }) 
                .entries(allData);
    
    console.log(nested_rows) */

//ATTEMPT 2 
   /* var eventResults;
    var allResults = [];

    allData.map(function(d,i) {
        d.events.map(function(e,j) {
                    debugger;
            e.results.map(function(r,k) {
                console.log(r["coupleid"])
                allResults.push {
                    coupleid: r["coupleid"],
                    score: r["score"],
                    change: r["change"],
                    date: e["date"],
                    style: e["style"],
                    compid: d["compid"],
                    compname: d["name"]
                };
            })
        })
    }); debugger;

console.log(allResults) 



      function update_aggregate() {
        d3.selectAll(".filter_radio").each(function(d) {   
          // if continent is checkedd, return aggregated data
          console.log(d)
          if (d3.select(this).attr("id") == "continent" && d3.select(this).node().checked) {
            var nested_rows = d3.nest()
              .key(function(d) { 
                console.o
                return d.continent; })
              .rollup(function(d) { 
                return {
                  "name": d[0].continent,
                  "continent": d[0].continent,
                  "gdp":d3.mean(d,function(g) { return +g.gdp;}),
                  "life_expectancy":d3.mean(d,function(g) { return +g.life_expectancy}),
                  "population":d3.mean(d,function(g) { return +g.population}),
                  "year": d3.median(d, function(g){return g.year})
                };
              })
              .entries(filtered_data); 
            // format data as array
            aggregate_data = nested_rows.map(function(d) {
              return { 
                name: d.values["name"],
                continent: d.values["continent"],
                gdp: d.values["gdp"],
                life_expectancy: d.values["life_expectancy"],
                population: d.values["population"],
                year: d.values["year"]
              }; 
            });

          d3.select("table").remove();
            update_table(aggregate_data);
          };
        });
      } */


// if you take out the this.svg.append('g') then both of these sections work

//-------------------------- THIS WORKS : START ---------------------------------------------//
   /* var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return that.x(d.date); })
        .y(function(d) { return that.y(d.score); })

  var couple = this.svg.selectAll(".couple")
      .data(this.displayData)
    .enter().append("g")
      .attr("class", "couple");

  var iterator = 0;
  couple.append("path")
      .attr("class", "line")
      .attr('d', function(d) { return line(d.events); })
      .attr('stroke', function(d, j) {
            iterator ++;
            return "hsl(" + iterator*50 + ",100%,50%)";
        })
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      //.style("stroke", function(d) { return this.color(d.coupleid); });

  couple.append("text")
      .datum(function(d) { return {coupleid: d.coupleid, event: d.events[d.events.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + that.x(d.event.date) + "," + that.y(d.event.score) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.coupleid; });*/
//-------------------------- THIS WORKS : END ---------------------------------------------//

//-------------------------- THIS WORKS 2 : START -----------------------------------------//
 /* var line = d3.svg.line()
    .x(function(d) { return that.x(d.date); })
    .y(function(d) { return that.y(d.score); })
    .interpolate("basis");

  this.displayData.forEach(function(d,i) {
    that.svg.append('svg:path')
      .attr('d', line(d.events))
      .attr('stroke', function(d,j) { return "hsl(" + i/6 * 200 + ",100%,50%)"; })
      .attr('stroke-width', 2)
      .attr('id', 'line_'+d.coupleno)
      .attr('fill', 'none')
      //.on('mouseover', function() {})

    //console.log(that.width)
    that.svg.append("text")
      .attr("x", function() { return i%3*that.width/4+100 })
      .attr("y", function() { return i%2*20 + that.height + 50})
      .style("fill", "black")
      .attr("class","legend")
      .on('click',function(){
          var active   = d.active ? false : true;
          var opacity = active ? 0 : 1;
          d3.select("#line_" + d.coupleno).style("opacity", opacity);
          d.active = active;
      })
      .text(d.coupleid);
});*/
//-------------------------- THIS WORKS 2 : END -----------------------------------------//
