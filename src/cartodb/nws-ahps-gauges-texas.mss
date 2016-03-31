#nws_ahps_gauges_texas{
  // for better visibility on different types of basemaps, add light white glow which will contrast the black marker line
  ::glow {
    marker-type: ellipse;
    marker-placement: point;
    marker-allow-overlap: true;
    marker-width: 14;
    marker-fill-opacity: 0.9;
    marker-fill: #fff;
    marker-line-width: 0;

  }

  ::inside {
    marker-placement: point;
    marker-type: ellipse;
    marker-allow-overlap: true;
    marker-width: 10;
    marker-line-opacity: 0.6;
    marker-line-width: 1;
    marker-line-color: #000;   
    marker-fill-opacity: 0.9;

    [obs_status = 'cc33ff'] {
      marker-fill: #cc33ff;
    }

    [obs_status = 'ff0000'] {
      marker-fill: #ff0000;
    }

    [obs_status = 'ff9900'] {
      marker-fill: #ff9900;
    }

    [obs_status = 'ffff00'] {
      marker-fill: #ffff00;
    }

    [obs_status = '00ff00'] {
      marker-fill: #00ff00;
    }

    [obs_status = '72afe9'] {
      marker-fill: #72afe9;
    }

    [obs_status = '906320'] {
      marker-fill: #906320;
    }

    [obs_status = 'bdc2bb'] {
      marker-fill: #bdc2bb;
    }

    [obs_status = '666666'] {
      marker-fill: #666666;
    }
  }
}
