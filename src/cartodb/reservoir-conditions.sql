SELECT polys.cartodb_id AS cartodb_id,
  polys.the_geom_webmercator AS the_geom_webmercator,
  conditions.lake_full_name AS full_name,
  conditions.lake_condensed_name,
  round(flood_height_percent) AS flood_height_percent,
  water_level,
  conservation_pool_elevation,
  top_of_dam_elevation,
  lake_url_name
FROM tnris.wdft_reservoirs AS polys
  JOIN tnris.table_3745698116 AS conditions ON polys.condensed_ = conditions.lake_condensed_name
WHERE flood_height_percent IS NOT NULL
