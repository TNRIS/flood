@colorNope: #ecf2f9;
@color00: #3399FF;
@color20: #4deaea;
@color40: #FFFF99;
@color60: #FFCC33;
@color80: #D73027;


#reservoir_flood_conditions {
  polygon-opacity: 0;
  line-opacity: 0;

  // order is important here - draw outline first then the fill on top

  ::outline-glow {
    line-width: 7;
    line-opacity: .9;
    line-join: round;
    line-cap: round;
  }
  ::fill {
    line-width: 0;
    polygon-opacity: 1;
  }
  ::outline {
    [zoom <= 7] {
      line-width: .2;
    }
    line-width: .5;
    line-opacity: 1;
  }


  // set colors for each reservoir
  [flood_height_percent <= 0] {
    ::fill {
      polygon-fill: @colorNope;
    }
    ::outline {
      line-width: .3;
      line-color: darken(@colorNope, 25);
    }
    ::outline-glow {
      line-width: 6;
      line-opacity: .7;
      line-color: darken(@colorNope, 5);
    }

  }
  [flood_height_percent > 0][flood_height_percent <= 20] {
    ::fill {
      polygon-fill: @color00;
    }
    ::outline {
      line-color: darken(@color00, 20);
    }
    ::outline-glow {
      line-color: lighten(@color00, 24);
    }

  }
  [flood_height_percent > 20][flood_height_percent <= 40] {
    ::fill {
      polygon-fill: @color20;
    }
    ::outline {
      line-color: darken(@color20, 40);
    }
    ::outline-glow {
      line-color: lighten(@color20, 28);
    }
  }
  [flood_height_percent > 40][flood_height_percent <= 60] {
    ::fill {
      polygon-fill: @color40;
    }
    ::outline {
      line-color: darken(@color40, 50);
    }
    ::outline-glow {
      line-opacity: .95;
      line-color: lighten(@color40, 30);
    }
  }
  [flood_height_percent > 60][flood_height_percent <= 80] {
    ::fill {
      polygon-fill: @color60;
    }
    ::outline {
      line-color: darken(@color60, 20);
    }
    ::outline-glow {
      line-color: lighten(@color60, 30);
    }
  }
  [flood_height_percent > 80] {
    ::fill {
      polygon-fill: @color80;
    }
    ::outline {
      line-color: darken(@color80, 40);
    }
    ::outline-glow {
      line-color: lighten(@color80, 30);
    }
  }
}

