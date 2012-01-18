	/**@
	* #.collision
	* @comp Collision
  *
	* @sign public this .collision([Crafty.Polygon polygon])
	* @param polygon - Crafty.Polygon object that will act as the hit area
	* Constructor takes a polygon to use as the hit area. If left empty, 
	* will create a rectangle polygon based on the x, y, w, h dimensions.
	*
	* This must be called before any .hit() or .onhit() methods.
	*
	* The hit area (polygon) must be a convex shape and not concave 
	* for the collision detection to work.
	* @example
	* ~~~
	* Crafty.e("2D, Collision").collision(
	*     new Crafty.polygon([50,0], [100,100], [0,100])
	* );
	* ~~~
	* @see Crafty.Polygon
	*/
	collision: function(poly) {
		var area = this._mbr || this;
		
		//if no polygon presented, create a square
		if(!poly) {
			poly = new Crafty.polygon([0,0],[area._w,0],[area._w,area._h],[0,area._h]);
		}
		this.map = poly;
		this.attach(this.map);
		this.map.shift(area._x, area._y);
		
		return this;
	},
	

