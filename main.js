import DisplayCoords from './app/DisplayCoords.js';

document.addEventListener('DOMContentLoaded', function() {
    let app;

    const btn = document.getElementById('btn-1');
    btn.addEventListener('click', function(evt) {
        if (app) {
            app.destroy();
        }

        app = new DisplayCoords({
            target: 'app',
            statBar: 'stats'
        });
    });
});
