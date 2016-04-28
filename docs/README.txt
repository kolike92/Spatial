Rollin Lau 
rlau@bu.edu
CS411 Group 8

https://api.mapbox.com/styles/v1/rlaulau/cini1raob001iabnfbn46nv4a.html?title=true&access_token=pk.eyJ1IjoicmxhdWxhdSIsImEiOiJjaW1wYmRhbmEwMHVydXlreWF6cnR1b2YzIn0.0TSYl8Y-HRFdy6vGIw772Q#15/42.34780610393952/-71.0773374408718/0

Style URL and Access Token omitted. 

Other files and topics include still images of map, sample datafiles, and brief summary of approach. Goal: build basemap for Spatial

Drew building shapefiles from http://bostonopendata.boston.opendata.arcgis.com/

Merged 2 disjoint datasets to create samples for year built.

Drew sample dataset from Factual APi. Parsed data. 
Require: full database of Boston region from Factual. 

Concerning the map, only Boston is colored, yellow buildings are the oldest: dating back to 1700s.

Lighter the color the more recently it was built. 

Any buildings not colored in the Boston area only have outlines.
note: more of these buildings should be colored in, but are not recognized for various reasons: (remodeling, conflicting years built within data set)

Adjacent cities/localities are not filled with any color, only outlined. 

Map only looks good in zoom range ~16-18. Looks fine at many more ranges on editor. 
Rendering issues are still an outstanding issue, hence the png images. The map looks great in the editor but for some reason will not translate to the web format effectively. Attempted from Windows and Mac client using MapBox software
to upload directly as well as export->upload to their server. I varied every metric I could with numerous files with no fix. 
Possible reason could be the size restriction of map data (using free account) however my map-files were greater than some sample maps I have seen online, 

example reference: http://a.tiles.mapbox.com/v3/wiredmaplab.map-ku6szhel/page.html#14/41.8776/-87.6151

The reference map is much sharper. Perhaps a localized situation with my dataset but the editor looks fine.

Steps needed to reach goal: 
	acquire database information from factual
	store in local database and manipulate data to form connection between map software/interface
	and local database(or through reverse geolocation). 
	
