document.addEventListener('DOMContentLoaded', function () {
    let app;

    const btns = document.getElementsByTagName('button');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function (evt) {
            destoryApp(app);

            import('./app/' + btns[i].getAttribute('data-module') + '.js').then(function (appClass) {
                app = new appClass.default({
                    target: 'app',
                    statBar: 'stats'
                });
            });

        });
    }

});

function destoryApp(app) {
    if (app) {
        app.destroy();
    }
}
