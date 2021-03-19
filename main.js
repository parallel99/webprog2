document.addEventListener('DOMContentLoaded', function () {
    let app;

    const btns = document.getElementsByTagName('button');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function (evt) {
            destoryApp(app);

            import('./app/' + btns[i].getAttribute('data-module') + '.js').then(function (appClass) {
                const params = getParameters(appClass);
                app = new appClass.default(params);
            });

        });
    }

});

function destoryApp(app) {
    if (app) {
        app.destroy();
    }
}

function getParameters(appType) {
    const defaultParams = {
        target: 'app',
        statBar: 'stats'
    };

    switch (appType.name) {
        case 'GuessingGame':
            defaultParams.min = 150;
            defaultParams.max = 3200;
            break;
    }

    return defaultParams;
}
