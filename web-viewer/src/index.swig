<!DOCTYPE html>
<html>
<head>
  <title></title>

  {% if isProd %}
    <link rel="stylesheet" type="text/css" href="/assets/styles.css">
  {% endif %}
</head>
<body>
  hi james {% if isProd %}got yer prod{% endif %}

  <script src="/assets/scripts.js" type="text/javascript"></script>
</body>
</html>