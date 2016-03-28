/*
  SQL query that joins full reservoir polygons to WaterDataForTexas reservoir conditions point data.
 */
SELECT polys.cartodb_id as cartodb_id,
  polys.the_geom_webmercator as the_geom_webmercator,
  points.name as name,
  date,
  percent_full,
  water_surface_elevation,
  surface_area,
  conservation_capacity,
  conservation_storage,
  conservation_pool_elevation,
  reservoir_page,
  recent_graph,
  historical_graph,
  statistics_graph
FROM wdft_reservoirs as polys
  JOIN points on (polys.full_name = points.name)
