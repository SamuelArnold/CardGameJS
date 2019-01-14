obj = {
    'trianglifiedlightblue': ['#a5cade', '#b7d5e5', '#d5e6f0', '#006ab4', '#e8f2f7', '#cee2ed'],
    'trianglifiedbleu': ['#004e83', '#005f9f', '#004879', '#006ab4', '#004777', '#005f9f'],
    'trianglifiedviolet': ['#680036', '#830447', '#e62f8e', '#c76c9b'],
    'trianglifiedrouge': ['#5f0308', '#851117', '#cf363f', '#e86d74']
};
function addTriangle(classname) {

    targets = document.getElementsByClassName(classname);
    for (i = 0; i < targets.length; i++) {
        target = targets[i];
        if (target != null) {
            var dimensions = target.getClientRects()[0];
            var pattern = Trianglify({
                width: dimensions.width,
                height: dimensions.height,
                x_colors: obj[classname],
                cell_size: 100 + Math.random() * 200
            });
            target.style['background-image'] = 'url(' + pattern.png() + ')';
        }
    }
}

    addTriangle('trianglifiedlightblue');
    addTriangle('trianglifiedbleu');
    addTriangle('trianglifiedviolet');
    addTriangle('trianglifiedrouge');
