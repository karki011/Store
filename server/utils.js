exports.isAsset = function(urlPath) {
    var pieces = urlPath.split('/');
    if (pieces.length === 0) {
        return false;
    }
    var lastPiece = pieces[pieces.length - 1];
    if (urlPath.indexOf('/api') !== -1 || urlPath.indexOf('/?') !== -1) {
        return true;
    } else if (lastPiece.indexOf('.') !== -1) {
        return true;
    } else {
        return false;
    }
}
