# Assembles the static site from shared chrome + per-page content fragments.
# Output is plain HTML in the project root - no runtime dependency on this script.
#   Run:  powershell -File .claude/build-pages.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$enc  = New-Object System.Text.UTF8Encoding($false)
$sprite = [System.IO.File]::ReadAllText("$root\assets\icons-sprite.html", [System.Text.Encoding]::UTF8)

$NAV = @(
  @{ key='screen-print'; href='screen-print.html'; label='Screen Print' }
  @{ key='stickers';     href='stickers.html';     label='Stickers' }
  @{ key='dtf';          href='what-is-dtf.html';  label='DTF' }
  @{ key='services';     href='services.html';     label='Services' }
  @{ key='portfolio';    href='portfolio.html';    label='Portfolio' }
  @{ key='about';        href='about.html';        label='About' }
)

function Build-Page {
  param($Slug, $Title, $Description, $Body, $Active)

  $navHtml = ($NAV | ForEach-Object {
    $cur = if ($_.key -eq $Active) { ' aria-current="page"' } else { '' }
    "      <a href=""$($_.href)""$cur>$($_.label)</a>"
  }) -join "`n"

  $html = @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$Title</title>
<meta name="description" content="$Description">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/site.css?v=20260928b">
</head>
<body>

$sprite

<div class="bar">
  <div class="wrap">
    <div class="l">Screen Print &middot; Stickers &middot; DTF Transfers</div>
    <div class="r">
      <a href="tel:+18186416940">+1 818 641 6940</a>
      <span class="sep">/</span>
      <a class="mail" href="mailto:info@rodinkprinting.com">info@rodinkprinting.com</a>
      <span class="sep">/</span>
      <a class="ig" href="https://www.instagram.com/rodinkprinting/" target="_blank" rel="noopener">@rodinkprinting</a>
    </div>
  </div>
</div>

<header>
  <div class="wrap">
    <a href="index.html" class="logo" aria-label="RodinK home"><img src="assets/brand/logo.png" alt="RodinK"></a>
    <nav class="main" id="nav">
$navHtml
    </nav>
    <div class="hd-r">
      <a href="get-a-quote.html" class="btn btn-coral">Get a Quote <svg class="icon ui-arrow" aria-hidden="true"><use href="#i-arrow-up-right"></use></svg></a>
      <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>

$Body

<footer>
  <div class="wrap">
    <div class="f-grid">
      <div class="f-logo">
        <img src="assets/brand/logo.png" alt="RodinK">
        <p>RodinK offers top-notch screen printing and on-demand stickers. Screen print, stickers and DTF, produced in Pacoima, Los Angeles.</p>
      </div>
      <div><h5>Print</h5><ul>
        <li><a href="screen-print.html">Screen Print</a></li>
        <li><a href="stickers.html">Stickers</a></li>
        <li><a href="what-is-dtf.html">DTF Transfers</a></li>
        <li><a href="services.html">Print Services</a></li></ul></div>
      <div><h5>Explore</h5><ul>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="deals.html">Sticker Deals</a></li>
        <li><a href="getting-started.html">Getting Started</a></li>
        <li><a href="about.html">About</a></li></ul></div>
      <div><h5>Help</h5><ul>
        <li><a href="faq-dtf.html">FAQ &ndash; DTF</a></li>
        <li><a href="faq-stickers.html">FAQ &ndash; Stickers</a></li>
        <li><a href="get-a-quote.html">Get a Quote</a></li>
        <li><a href="contact.html">Contact</a></li></ul></div>
      <div><h5>Find us</h5><ul>
        <li>9901 San Fernando Rd<br>Pacoima, CA 91331</li>
        <li><a href="tel:+18186416940">+1 818 641 6940</a></li>
        <li><a href="mailto:info@rodinkprinting.com">info@rodinkprinting.com</a></li>
        <li><a href="https://www.instagram.com/rodinkprinting/" target="_blank" rel="noopener">@rodinkprinting</a></li></ul></div>
    </div>
    <div class="f-bot">
      <div>&copy; <span id="yr"></span> RodinK. All rights reserved.</div>
      <div><a href="privacy.html">Privacy Policy</a></div>
    </div>
  </div>
</footer>

<script src="assets/js/site.js?v=20260928b"></script>
</body>
</html>
"@

  [System.IO.File]::WriteAllText("$root\$Slug.html", $html, $enc)
  "  built $Slug.html  ({0:N1} KB)" -f ((Get-Item "$root\$Slug.html").Length/1KB)
}

# ---- build every page whose fragment exists ----
# Read as UTF-8 explicitly: PowerShell 5.1's Get-Content defaults to ANSI,
# which turns em dashes in the titles into mojibake.
$pages = [System.IO.File]::ReadAllText("$PSScriptRoot\pages.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
foreach ($p in $pages) {
  $frag = "$PSScriptRoot\content\$($p.slug).html"
  if (-not (Test-Path $frag)) { "  SKIP $($p.slug) - no fragment"; continue }
  $body = [System.IO.File]::ReadAllText($frag, [System.Text.Encoding]::UTF8)
  Build-Page -Slug $p.slug -Title $p.title -Description $p.description -Body $body -Active $p.active
}
"done."
