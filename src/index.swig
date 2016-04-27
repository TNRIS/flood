<!DOCTYPE html>
<html>
  <head>
    <title>Texas Flood Information Viewer</title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.1.2/material.blue-indigo.min.css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600' rel='stylesheet' type='text/css'>

    {% if isProd %}
      <link rel="stylesheet" type="text/css" href="/assets/styles.css">
    {% endif %}

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body class="flood-viewer">
    <div id="reactApp"></div>

    <script defer src="https://code.getmdl.io/1.1.2/material.min.js"></script>
    <script src="/assets/scripts.js" type="text/javascript"></script>
  </body>
</html>
