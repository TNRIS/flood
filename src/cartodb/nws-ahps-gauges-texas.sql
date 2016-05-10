SELECT * FROM nws_ahps_gauges_texas
  LEFT JOIN
    (VALUES
      ('major', 90),
      ('moderate', 80),
      ('flood', 70),
      ('action', 60),
      ('no flooding', 50),
      ('not defined', 40),
      ('low', 30)
    ) as render_order(r_sigstage, render_z)
  ON render_order.r_sigstage = nws_ahps_gauges_texas.sigstage
ORDER BY render_z asc
