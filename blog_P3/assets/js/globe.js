if(!Detector.webgl){
    Detector.addGetWebGLMessage();
} else {
    var years = ['1990','1995','2000'];
    var container = document.getElementById('container');
    var globe = new DAT.Globe(container);

    console.log(globe);
    var i, tweens = [];
    
    var settime = function(globe, t) {
        return function() {
            new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
        };
    };

    TWEEN.start();
    
    for(i = 0; i < years.length; i++) {
        var y = years[i];
        xhr = new XMLHttpRequest();
        xhr.open('GET', 'globe/population909500.json', true);
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    window.data = data;
                    for (i=0;i<data.length;i++) {
                        globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
                    }
                    globe.createPoints();
                    settime(globe,0)();
                    globe.animate();
                    document.body.style.backgroundImage = 'none'; // remove loading
                }
            }
        };
        xhr.send(null);
    }
} 