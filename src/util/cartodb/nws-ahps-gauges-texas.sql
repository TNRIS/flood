SELECT * FROM nws_ahps_gauges_texas_copy
  LEFT JOIN
    (VALUES
      ('cc33ff', 1),
      ('ff0000', 2),
      ('ff9900', 3),
      ('ffff00', 4),
      ('00ff00', 5),
      ('72afe9', 6),
      ('906320', 7),
      ('bdc2bb', 8),
      ('666666', 9)
    ) as render_order(r_obs_status, render_z)
  ON render_order.r_obs_status = nws_ahps_gauges_texas_copy.obs_status
ORDER BY render_z desc
