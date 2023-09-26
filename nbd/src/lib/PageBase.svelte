<script>
    export let pageTitle = "Nothing But Docs";
    import NavBar from "./components/NavBar.svelte";
</script>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{pageTitle}</title>

    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Telex&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Inconsolata:700" rel="stylesheet">
</head>

<body class="bg-scorpion-950">
    <NavBar></NavBar>
    <slot></slot>
</body>

</html>
