function acceptCookies() {
    document.getElementById('cookieWall').style.display = 'none';
    document.getElementById('pageContent').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById('cookieWall').style.display = 'flex';
    document.getElementById('pageContent').style.display = 'none';
});
