'use strict';

class WorldDatabase {

    constructor() {
        this.database = ['AUSCHWITZ', 'AUSTRALIA', 'ANTARKTIDA', 'MELBOURNE', 'SLOVAKIA', 'ANTANANARIVO', 'MISSISSIPPI',
    'LUXEMBOURG', 'SOMALILAND', 'UNITED KINGDOM', 'CZECH REPUBLIC', 'REPUBLIC OF SOUTH AFRICA'];
    }

    getWorld() {
        return this.database[Math.floor(Math.random() * this.database.length)];
    }
}