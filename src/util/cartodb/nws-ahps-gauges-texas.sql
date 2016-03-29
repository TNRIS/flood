SELECT * FROM tnris.nws_ahps_gauges_texas
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
      ('666666', 9),
    ) as render_order(obs_status, render_z)
  ON render_order.obs_status = tnris.nws_ahps_gauges_texas.obs_status
ORDER BY render_z
