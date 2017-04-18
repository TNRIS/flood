@colorNope: #3399FE;
@color00: #FCFB6B;
@color20: #FED32E;
@color40: #FE8204;
@color60: #FB5114;
@color80: #FE0000;


#reservoir_flood_conditions {
  polygon-opacity: 0;
  line-opacity: 0;

  // order is important here - draw outline first then the fill on top

  ::outline-glow {
    [zoom <= 7] {
      line-width: 3;
    }
    line-width: 5;
    line-opacity: .9;
    line-join: round;
    line-cap: round;
  }
  ::outline-glow-two {
    line-opacity: .6;
    line-width: 0;
    line-join: round;
    line-cap: round;
  }
  ::fill {
    line-width: 0;
    polygon-opacity: 1;
  }
  ::outline {
    [zoom <= 7] {
      line-width: .5;
    }
    line-width: .7;
    line-opacity: 1;
  }


  // set colors for each reservoir
  [flood_height_percent <= 0] {
    ::fill {
      polygon-fill: @colorNope;
    }
    ::outline {
      line-color: darken(@colorNope, 25);
    }
    ::outline-glow {
      line-opacity: 1;
      line-width: 5;
      line-color: lighten(@colorNope, 20);
    }
    ::outline-glow-two {
      line-opacity: .9;
      line-width: 2;
      line-color: darken(@colorNope, 10);
    }
  }
  [flood_height_percent > 0][flood_height_percent <= 20] {
    ::fill {
      polygon-fill: @color00;
    }
    ::outline {
      line-color: darken(@color00, 30);
    }
    ::outline-glow {
      line-color: lighten(@color00, 24);
    }
    ::outline-glow-two {
      line-opacity: .9;
      line-width: 2;
      line-color: darken(@color00, 10);
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

