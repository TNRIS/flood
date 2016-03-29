@color0: #990000;
@color10: #D73027;
@color20: #F46D43;
@color30: #FDAE61;
@color40: #FFCC33;
@color50: #FEE090;
@color60: #FFFF99;
@color70: #CCFFFF;
@color80: #3399FF;
@color90: #0000FF;

Map {
  buffer-size: 128;
}

#wdft_reservoirs_combined {
  polygon-opacity: 0;
  line-opacity: 0;

  // order is important here - draw outline first then the fill on top

  ::outline {
   line-width: .5;
   line-opacity: 1;
  }
  ::fill {
    polygon-opacity: 1;
  }

  // set colors for each reservoir
  [percent_full_copy > 0][percent_full_copy <= 10] {
    ::fill {
      polygon-fill: @color0;
    }
    ::outline {
      line-color: lighten(@color0, 10);
    }
  }
  [percent_full_copy > 10][percent_full_copy <= 20] {
    ::fill {
      polygon-fill: lighten(@color10, 10);
    }
    ::outline {
      line-color: darken(@color10, 50);
    }
  }
  [percent_full_copy > 20][percent_full_copy <= 30] {
    ::fill {
      polygon-fill: lighten(@color20, 10);
    }
    ::outline {
      line-color: darken(@color20, 50);
    }
  }
  [percent_full_copy > 30][percent_full_copy <= 40] {
    ::fill {
      polygon-fill: @color30;
    }
    ::outline {
      line-color: darken(@color30, 50);
    }
  }
  [percent_full_copy > 40][percent_full_copy <= 50] {
    ::fill {
      polygon-fill: @color40;
    }
    ::outline {
      line-color: darken(@color40, 50);
    }
  }
  [percent_full_copy > 50][percent_full_copy <= 60] {
    ::fill {
      polygon-fill: @color50;
    }
    ::outline {
      line-color: darken(@color50, 50);
    }
  }
  [percent_full_copy > 60][percent_full_copy <= 70] {
    ::fill {
      polygon-fill: @color60;
    }
    ::outline {
      line-color: darken(@color60, 50);
    }
  }
  [percent_full_copy > 70][percent_full_copy <= 80] {
    ::fill {
      polygon-fill: @color70;
    }
    ::outline {
      line-color: darken(@color70, 50);
    }
  }
  [percent_full_copy > 80][percent_full_copy <= 90] {
    ::fill {
      polygon-fill: @color80;
    }
    ::outline {
      line-color: darken(@color80, 10);
    }
  }
  [percent_full_copy > 90][percent_full_copy <= 100] {
    ::fill {
      polygon-fill: @color90;
    }
    ::outline {
      line-color: lighten(@color90, 30);
    }
  }
}
