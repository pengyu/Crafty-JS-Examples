window.onload = function () {
  //start crafty
  Crafty.init(400, 336);

  Crafty.c("Nucleotide", {
      init: function() {
        this.requires("2D, DOM, Text");
        this.attr({
            w: 20
            , h: 20
          })
        .css({
            "text-align": "center"
            , "border-style": "solid"
          });
      } ,
      Nucleotide: function(label, color) {
        this.text(label)
        .css({
            "background-color": color
          });
      }
    });

  Crafty.c("Adenine", {
      init: function() {
        this.requires("Nucleotide");
        this.Nucleotide("A", "red");
      }
    }
  );

  Crafty.c("Guanine", {
      init: function() {
        this.requires("Nucleotide");
        this.Nucleotide("G", "green");
      }
    }
  );

  Crafty.c("Cytosine", {
      init: function() {
        this.requires("Nucleotide");
        this.Nucleotide("C", "blue");
      }
    }
  );

  Crafty.c("Thymine", {
      init: function() {
        this.requires("Nucleotide");
        this.Nucleotide("T", "cyan");
      }
    }
  );

  //the loading screen that will display while our assets load
  Crafty.scene("main", function () {
      for(var j = 0; j < 10; ++j) {
        Crafty.e("Adenine").attr({x: 0, y: 20*j});
      }
      for(var j = 0; j < 10; ++j) {
        Crafty.e("Guanine").attr({x: 20, y: 20*j});
      }
    });

  Crafty.scene("main");
};
