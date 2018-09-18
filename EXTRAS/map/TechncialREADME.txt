Jeffrey Piccirillo 
09/18/2018

Hi there, I'm not sure where this graphic will be hosted / presented, or by whom.  I wanted to provide clues to how I myself as its creator would position it within a separate web page (for the best user experience, taking into account other content on the page and presentation at different scales).  If you already have experience with embedding interactive/responsive SVG graphics within HTML, feel free to disregard.  Regardless, the hosting webpage must have a div with id=map for the script to select and bind the graphic to, and load largeCities.js/smallCities.js before the main script as these are used to create the graphic.  Thank you! 
 
Currently, the graphic is positioned using viewbox attributes (set within map.js, when the svg is created and bound to #map) to fill its entire containing div, preserve aspect ratio, and respond on browser resize.  I made this decision expecting that the map would be embedded within a separate webpage's div - having it fill that container and scale with the available room within that div's seems most logical, rather than specifying a static width.  For this reason, viewing the raw map index.html at jpiccirillo.com/EXTRAS/map/ might appear pretty oversized if the browser is at full width.  

An example of having the map embedded within a another page is available at jpiccirillo.com/gradmap.html.  In this example, I pulled the graphic's styling from the index and placed it, along with the d3.js, turf.min.js, tippy.js, and jQuery src tags, in the header of the hosting webpage.  Then, I placed a div with the id=map (id that map.js finds to bind to), along with specific script resources to load just before the main source.

<div>
	<script src="/EXTRAS/map/largeCities.js" type="text/javascript"></script>
        <script src="/EXTRAS/map/smallCities.js" type="text/javascript"></script>
        <div id="map">
               	<script src="/EXTRAS/map/map.js" type="text/javascript"></script>
	</div>
</div>

This approach seems to work pretty well, allowing the graphic to fill whatever the available space in its containing div, while still preserving aspect ratio, proportions, and interactivity.  I'd also watch out for conflicting stylesheets, as some of the hosting webpage's css might apply to the map's elements.  The original css targeting these elements might need tweaks to raise their priority.  