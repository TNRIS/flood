#nws_ahps_gauges_texas{
  // for better visibility on different types of basemaps, add light white glow which will contrast the black marker line
  ::pred-halo
    [pred_sigstage = 'major'],
    [pred_sigstage = 'moderate'],
    [pred_sigstage = 'flood'],
    [pred_sigstage = 'action'] {
    marker-type: ellipse;
    marker-placement: point;
    marker-allow-overlap: true;

    marker-fill-opacity: 0.4;
    marker-line-width: 0;

    [pred_sigstage = 'major'] {
      marker-fill: #cc33ff;
      marker-width: 36;
    }

    [pred_sigstage = 'moderate'] {
      marker-fill: #ff0000;
      marker-width: 32;
    }

    [pred_sigstage = 'flood'] {
      marker-fill: #ff9900;
      marker-width: 28;
    }

    [pred_sigstage = 'action'] {
      marker-fill: #ffff00;
      marker-width: 24;
    }
  }

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

    [sigstage = 'major'] {
      marker-fill: #cc33ff;
    }

    [sigstage = 'moderate'] {
      marker-fill: #ff0000;
    }

    [sigstage = 'flood'] {
      marker-fill: #ff9900;
    }

    [sigstage = 'action'] {
      marker-fill: #ffff00;
    }

    [sigstage = 'no flooding'] {
      marker-fill: #00ff00;
    }

    [sigstage = 'not defined'] {
      marker-fill: #72afe9;
    }

    [sigstage = 'low'] {
      marker-fill: #906320;
    }

    [status = 'observations not current'] {
      marker-fill: #bdc2bb;
    }

    [status = 'out of service'] {
      marker-fill: #666666;
    }
  }
}
