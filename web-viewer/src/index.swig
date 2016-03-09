<!DOCTYPE html>
<html>
<head>
  <title></title>

  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://code.getmdl.io/1.1.2/material.blue-indigo.min.css">

  {% if isProd %}
    <link rel="stylesheet" type="text/css" href="/assets/styles.css">
  {% endif %}
</head>
<body>
  <div id="reactApp"></div>

  <script defer src="https://code.getmdl.io/1.1.2/material.min.js"></script>
  <script src="/assets/scripts.js" type="text/javascript"></script>
</body>
</html>