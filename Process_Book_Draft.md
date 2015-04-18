# CS 171 Project Process Book Draft
#### Robert Krabek and Leila Hofer   April 17, 2015

## Table of Contents
1. Overview and Motivation
2. Related Work
3. Driving Questions
4. Exploratory Data Analysis
5. Implementation
	- C3 Visualization 1 Prototype
	- D3 Visualization 1 Prototype
6. Evaluation

## Overview and Motivation

There are tens of thousands of ballroom dancers around the world who compete regularly in events where they are judged by a panel of professionals against their competitors and given placements accordingly. The need to track ones progress is paramount for dancers aiming to assess the effectiveness of their training regimes or simply to see how they measure up against their peers. The current web-based infrastructure that presents information on dancers’ results does not aggregate or display data in a way that makes comparisons over time or between couples easy and intuitive. This project therefore aims to meet the need for an intuitive, user-friendly way for dancers to see where they stand in the world of competitive ballroom.

## Related Work

This project was heavily inspired by the article that came out in the New York Times highlighting Peyton Manning's record breaking touchdown career. Both the content (showing progress over time) and the style of the visualziation (simple line charts with color highlights) seemed appropriate and desirable for our project as we are also aiming to track progress over time and highlihgt individuals.

The following is the inspiration for the major visualization of our data.
#####Visualization 1 Inspiration 
![alt text] (https://github.com/rkrabek/cs171-finalproject-ballroom-visualization/blob/master/Images/Visualization1_Inspiration.png)
See Images/Visualization1_Inspiration if image does not appear
source: http://www.nytimes.com/interactive/2014/10/19/upshot/peyton-manning-breaks-touchdown-passing-record.html?_r=0&abt=0002&abg=1

Instead of touchdowns, our visualization will be tracking world rankings in ballroom dance based on points compiled through an analysis of results in competition. Instead of individuals, the lines in our dataset will track couples. Our visualization will have the option of letting the user customize their visualization to their needs. There will be functionality for the user to opt to display data that compares them to the five couples above and below them currently, that compares them to all of the dancers in their country at their level and style, to compare themselves with the top dancers in the world, and to compare themselves to a customized set of other dancers. The simplicity of this design combined with its ability to convey a large amount of information effectively is why we were attracted to this design. We will use bolded lines and color when necessary to highlight the couples in question, possibly shades of red to point out the five most similar couples that are below the user in ranking and shades of green to point out the five most similar couples that are above the user in ranking. Like this image, additional information about less emphasized lines will be available on mouse-over. To 

Additionally, this article gave us the inspiration for snapshots comparing the users to other specific dancers could be a feature available to the user, again similar in design to snapshot visualizations relating to touchdown passes shown below.

#####Visualization 4 Inspiration
![alt text] (https://github.com/rkrabek/cs171-finalproject-ballroom-visualization/blob/master/Images/Visualization4_Inspiration.png)
Source: http://www.nytimes.com/interactive/2014/10/19/upshot/peyton-manning-breaks-touchdown-passing-record.html?_r=0&abt=0002&abg=1)

Obviously there would have to be two highlighted lines per snapshot in our visualization as they are meant to compare the user to another couple specifically.


## Driving Questions

#####Summary
- How has my ranking as a couple changed throughout my dancing career?
- How has my ranking changed compared to other couples I know?
- How have specific competitions affected my ranking as a dancer?

As stated above, this project aims to allow dancers to track their progress and compare themselves to other dancers over time. These comparisons will be customizable so that dancers can either compare themselves to similar level dancers around the world or in their country, or choose specific couples with whom to compare results. To contextualize these smaller-scale comparisons, we aim to ground users of our product in the trends of the ballroom community as a whole. This will be accomplished first by displaying overall trends among the top couples in the world. Second, so that dancers know how their local field compares to the ballroom community as a whole, we intend to integrate a comparison of the countries that produce the most successful dancers at any given time. 

Our goal is to produce a visualization that is customizable and answer a variety of questions about dancers’ progress over time and relative to others. To accomplish this we intend to implement a series of coordinated displays pertaining both to the individual dancer and to overall trends in the ballroom world.  Through this project we hope to better our understanding of how to manipulate and present data with JavaScript and d3 and to create a useful product for ballroom dancers around the world. 

## Exploratory Data Analysis

We are currently in the stage of exploratory Data Analysis. We originally experimented with the [C3](http://c3js.org/) charting library that is based on D3 but provides more streamlined, simplified code. Our [first prototype of visualization 1](https://github.com/rkrabek/cs171-finalproject-ballroom-visualization/blob/master/final_project_testing/project_test_c3.html) was generated in C3 for two couples at different competitions. Although it provided an easy means of charting the data, C3 did not prove versitile enough to implement the fully integrated designed view that we were aiming to produce so we began our [second prototype of visualziation 1] using the D3 library. 

Our data is fully collectd and properly formatted. The reshaping process takes data broadly with the form:

[
	{
		competition name:
		competition id:
		competition events: [
			{
				event style:
				event date:
				event results: [
					{
						result:
						couple:
						couple score:
					},
					...
				]
			},
			...
		]
	},
	...
]

and gives it the structure below.

[
	{
		couple name:
		couple id:
		couple events: [
			{
				competition name:
				competition id:
				event style: 
				couple score: 
			},
			...
		]
	},
	...
]

We chose this structure because it allows us to index the data by couple and have events objects ready for each couple so that if that couple is chosen for visualization we have ready an object for each competitor with all of their scores and the date that they recieved the scores. When we began the visualization process we found that we had over 1500 unique couples from over 70 competitions.

## Design Evolution

In progress, little evolution as of yet.

## Implementation

###### C3 Visualization 1 Implementation Prototype

- Provides comparisons of couples
- "Show" and "hide" functionality from C3 allows the focus to change from an individual couple's progress over time to a comparison of one couples progress to other couple's progress. Buttons are used to trigger this.
- Mouseover of points on line chart provide a tooltip showing the exact scores of each couple at each point
- This visualization has only been implemented using a tiny subset of mock-data for two couples but has not been integrated with our actual dataset

###### D3 Visualization 1 Implementation Prototype

- Prototpye in progress
- Data is properly reshaped and this visualization uses all the data we hoped it would
- Dropdown menue is currently populated with an alphabetical list of all couples
- Filtering by selection is currently in the proccess of being implemented
- Show and hide functionality is currenlty in the process of being implemented

###### Evaluation
Currently needs a lot of work both on fucntionality and styling. The data turned out to be MUCH messier than we expected so we are currently about half a week behind our desired schedule. Now that the data is set however we are on track to catch up and meet our goals. 


