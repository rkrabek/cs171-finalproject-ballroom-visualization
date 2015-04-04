# CS 171 Project Proposal
### Robert Krabek and Leila Hofer
### April 3, 2015

* Background and Motivation *

There are tens of thousands of ballroom dancers around the world who compete regularly in events where they are judged by a panel of professionals against their competitors and given placements accordingly. The need to track ones progress is paramount for dancers aiming to assess the effectiveness of their training regimes or simply to see how they measure up against their peers. The current web-based infrastructure that presents information on dancers’ results does not aggregate or display data in a way that makes comparisons over time or between couples easy and intuitive. This project therefore aims to meet the need for an intuitive, user-friendly way for dancers to see where they stand in the world of competitive ballroom.

* Project Objectives *

Project Objectives Summary
- Allow dancers to track their individual progress in competitions over time 
- Allow dancers to compare their results to other similar dancers over time
- Allow customized comparisons of results between dancers.
- Display overall trends in results for the top couples and countries

As stated above, this project aims to allow dancers to track their progress and compare themselves to other dancers over time. These comparisons will be customizable so that dancers can either compare themselves to similar level dancers around the world or in their country, or choose specific couples with whom to compare results. To contextualize these smaller-scale comparisons, we aim to ground users of our product in the trends of the ballroom community as a whole. This will be accomplished first by displaying overall trends among the top couples in the world. Second, so that dancers know how their local field compares to the ballroom community as a whole, we intend to integrate a comparison of the countries that produce the most successful dancers at any given time. 

Our goal is to produce a visualization that is customizable and answer a variety of questions about dancers’ progress over time and relative to others. To accomplish this we intend to implement a series of coordinated displays pertaining both to the individual dancer and to overall trends in the ballroom world.  Through this project we hope to better our understanding of how to manipulate and present data with JavaScript and d3 and to create a useful product for ballroom dancers around the world. 

*Data*

The primary data we are interested in comes from [DancesportInfo.net](http://dancesportinfo.net/), one of the only definitive sources of data for competitive ballroom results. DancesportInfo’s databases currently contain results from 26,353 competitions in 91 countries for over 20,641 registered dancers. The [API](http://www.programmableweb.com/api/dancesportinfo) for procuring data from DancesportInfo.net is linked below. The API allows extraction of the necessary data for this project, e.g. competitor names, results, competitions, etc.

*Data Processing*

We will need to perform some aggregating and sanitizing procedures after we scrape the data before we can begin visualizing. Different types of DanceSport data require different scraping services within the API so we will have to bind results from these different services together into a dataset that we can use. We will also have to figure out how to deal with very recent data as data from recent competitions is not necessarily updated all at once, meaning there can be missing values for these competitions. Once we have our dataset assembled, most of the values we will be deriving from there will be aggregated and averaged values for the countries producing the most competitive dancers. These values will require summing all of the results for dancers from a given country and averaging them over the number of dancers from that country. We will also be allowing filtering by date. The processing will all be done in JavaScript and D3 with calls to the DancesportInfo API.

*Visualization*

The current inspiration for our visualization is based on the New York Times visualization tracking touchdown passes by Payton Manning against other quarterbacks from 1935 to the present.


Visualization 1 
![alt text] (https://github.com/rkrabek/cs171-finalproject-ballroom-visualization/blob/master/Images/Visualization1_Inspiration.png)
See Images/Visualization1_Inspiration if image does not appear
source: http://www.nytimes.com/interactive/2014/10/19/upshot/peyton-manning-breaks-touchdown-passing-record.html?_r=0&abt=0002&abg=1

Instead of touchdowns, our visualization will be tracking world rankings in ballroom dance based on points compiled through an analysis of results in competition. Instead of individuals, the lines in our dataset will track couples. Our visualization will have the option of letting the user customize their visualization to their needs. There will be functionality for the user to opt to display data that compares them to the five couples above and below them currently, that compares them to all of the dancers in their country at their level and style, to compare themselves with the top dancers in the world, and to compare themselves to a customized set of other dancers. The simplicity of this design combined with its ability to convey a large amount of information effectively is why we were attracted to this design. We will use bolded lines and color when necessary to highlight the couples in question, possibly shades of red to point out the five most similar couples that are below the user in ranking and shades of green to point out the five most similar couples that are above the user in ranking. Like this image, additional information about less emphasized lines will be available on mouse-over. To 

To more easily view upward and downward trends, a visualization showing trends for just the individual couple could highlight moments of exceptionally positive or negative growth. This visualization would be similar to the visualization shown below that highlights moments of recessions on a chart of unemployment trends. This view would be integrated with the original multiple couple comparison chart through a brush that would capture certain dates on the main chart and display them on this chart. On mouse-over the chart will display the specific competitions at which competitors lost or gained points. Red and green rectangles will highlight moments of exceptionally negative or exceptionally positive growth respectively.

Visualization 2 Inspiration
![alt text] (https://github.com/rkrabek/cs171-finalproject-ballroom-visualization/blob/master/Images/Visualization2_Inspiration.png)
Source: http://www.tvmcalcs.com/uploads/blog_files/recession_chart_final.jpg

Colors will be chosen more sparingly than in this design in order to better highlight the user’s country relative to the others, however the general layout will be similar. The user will be able to track the change in their country’s competitiveness over time by brushing over dates in Visualization 1, which will trigger a corresponding change in Visualization 2.

Additionally, snapshots comparing the users to other specific dancers could be a feature available to the user, again similar in design to snapshot visualizations relating to touchdown passes shown below.

Visualization 3 Inspiration
![alt text] (https://github.com/rkrabek/cs171-finalproject-ballroom-visualization/blob/master/Images/Visualization3_Inspiration.png)
Source: Section 6/final

Colors will be chosen more sparingly than in this design in order to better highlight the user’s country relative to the others, however the general layout will be similar. The user will be able to track the change in their country’s competitiveness over time by brushing over dates in Visualization 1, which will trigger a corresponding change in Visualizations 2 and 3.

Additionally, snapshots comparing the users to other specific dancers could be a feature available to the user, again similar in design to snapshot visualizations relating to touchdown passes shown below.

Visualization 4 Inspiration
![alt text] (https://github.com/rkrabek/cs171-finalproject-ballroom-visualization/blob/master/Images/Visualization4_Inspiration.png)
Source: http://www.nytimes.com/interactive/2014/10/19/upshot/peyton-manning-breaks-touchdown-passing-record.html?_r=0&abt=0002&abg=1)

Obviously there would have to be two highlighted lines per snapshot in our visualization as they are meant to compare the user to another couple specifically.

*Must-Have Features*

Visualization 1 and visualization 3 are the two crucial elements of our design. Visualization 1 will be a plot of a couple’s total points over time compared to a selected group of competitor’s total points over time. The inspiration for this visualization is displayed in the previous section and will accomplishes the first three objectives of our project:
- Allow dancers to track their individual progress in competitions over time 
- Allow dancers to compare their results to other similar dancers over time
- Allow customized comparisons of results between dancers.

Visualization 3, or the comparison of the competitiveness of a dancer’s native country in the larger world of ballroom, will give competitors a way to contextualize their success even if they are not competing on a world-level. Seeing the competitiveness of the field is crucial for contextualizing the results we aim to display in visualization 1. This will accomplish the last objective of our project:
- Display overall trends in results for the top couples and countries

*Optional Features*

Optional features in include Visualizations 2 and 4 (inspirations shown above). These include an interactive visualization of exceptional growth and decline in a couple’s career, as shown in the inspiration for Visualization 2, and a series of customizable snapshots of comparisons with another couple. 

*Project Schedule*

###### Week of 4/6 - 4/12
Goal: Secure useable data. This will include aggregating data from different services of the API into a usable format, sanitizing data to deal with missing values, and ensuring all necessary variables are present.

###### Week of 4/13 - 4/19
Goal: Visualization 1 should be functional for at least one of the possible features (i.e. it can compare a couple to the five most similar couples above and below them in ranking OR compare a couple to a customizable set of dancers). It does not need to have all of the visual features set in their final form (e.g. colors and line styles do not need to be in their final version and mouse-over functionality does not need to be fully implemented) but it should be readable and serve the purpose of comparing a dancer to a set of their competitors over time. Process book should be in progress.

###### Week of 4/20 - 4/26
Visualization 2 should be functional. Similar qualifications apply in terms of style and full functionality as for visualization 1 described above. The style and functionality of Visualization 1 should be refined and improved. Interactivity between the two figures should be functional. Continue process book.

###### Week of 4/27 - 5/3
Both Visualizations 1 and 3 should be improved and refined in terms of style and functionality. Additional features (including Visualizations 2 and 4) should be implemented as is feasible. Continue process book.

###### Before Due Date (5/5)
Add in text descriptions on the webpage as necessary to improve the interpretation of visualizations and add to user experience. Complete final edits on process book.





