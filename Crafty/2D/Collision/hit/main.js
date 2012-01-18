/**@
 * #.hit
 * @comp Collision
 *
 * @sign public Boolean/Array hit(String component)
 * @param component - Check collision with entities that has this component
 * @return `false` if no collision. If a collision is detected, returns an Array of objects that are colliding.
 * Takes an argument for a component to test collision for. If a collision is found, an array of 
 * every object in collision along with the amount of overlap is passed.
 *
 * If no collision, will return false. The return collision data will be an Array of Objects with the 
 * type of collision used, the object collided and if the type used was SAT (a polygon was used as the hitbox) then an amount of overlap.
 * ~~~
 * [{
 *    obj: [entity],
 *    type "MBR" or "SAT",
 *    overlap: [number]
 * }]
 * ~~~
 * `MBR` is your standard axis aligned rectangle intersection (`.intersect` in the 2D component). 
 * `SAT` is collision between any convex polygon.
 * @see .onHit, 2D
 */
hit: function(comp) {
  var area = this._mbr || this,
  results = Crafty.map.search(area, false),
  i = 0, l = results.length,
  dupes = {},
  id, obj, oarea, key,
  hasMap = ('map' in this && 'containsPoint' in this.map),
  finalresult = [];

  if(!l) {
    return false;
  }

  for(;i<l;++i) {
    obj = results[i];
    oarea = obj._mbr || obj; //use the mbr

    if(!obj) continue;
    id = obj[0];

    //check if not added to hash and that actually intersects
    if(!dupes[id] && this[0] !== id && obj.__c[comp] && 
      oarea._x < area._x + area._w && oarea._x + oarea._w > area._x &&
      oarea._y < area._y + area._h && oarea._h + oarea._y > area._y) 
    dupes[id] = obj;
  }

  for(key in dupes) {
    obj = dupes[key];

    if(hasMap && 'map' in obj) {
      var SAT = this._SAT(this.map, obj.map);
      SAT.obj = obj;
      SAT.type = "SAT";
      if(SAT) finalresult.push(SAT);
    } else {
      finalresult.push({obj: obj, type: "MBR"});
    }
  }

  if(!finalresult.length) {
    return false;
  }

  return finalresult;
},

