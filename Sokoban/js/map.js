/*---------------------------------------- map game data settings -------------------------------------------------*/
//it is easy to add or reduce levels when I store map game data all in one JS file
//Here I refer to some classic sokoban maps from the Internet
//each level has 4 different contents (name, size, mpoint, map)
var gameData = [
    {name: 'level 1',//the name of the level
    size: { width: 8, height: 8},//the size of the level, which links to table's rows and columns
    mpoint: { x: 4, y: 4},//man's default position in this level's map
    //ues corresponding numbers to arrange the different types objects' positions in the map
    map: [
        [00,00,05,05,05,00,00,00],
        [00,00,05,20,05,00,00,00],
        [00,00,05,10,05,05,05,05],
        [05,05,05,80,10,80,20,05],
        [05,20,10,80,60,05,05,05],
        [05,05,05,05,80,05,00,00],
        [00,00,00,05,20,05,00,00],
        [00,00,00,05,05,05,00,00]
    ]},

    {name: 'level 2',
    size: { width: 9, height: 9},
    mpoint: { x: 3, y: 3},
    map: [
        [05,05,05,05,05,00,00,00,00],
        [05,10,10,10,05,00,00,00,00],
        [05,10,80,10,05,00,05,05,05],
        [05,10,80,60,05,00,05,20,05],
        [05,05,05,80,05,05,05,20,05],
        [00,05,05,10,10,10,10,20,05],
        [00,05,10,10,10,05,10,10,05],
        [00,05,10,10,10,05,05,05,05],
        [00,05,05,05,05,05,00,00,00]
    ]},

    {name: 'level 3',
    size: { width: 10, height: 7},
    mpoint: { x: 3, y: 3},
    map: [
        [00,05,05,05,05,05,05,05,00,00],
        [00,05,10,10,10,10,10,05,05,05],
        [05,05,80,05,05,05,10,10,10,05],
        [05,10,10,60,80,10,10,80,10,05],
        [05,10,20,20,05,10,80,10,05,05],
        [05,05,20,20,05,10,10,10,05,00],
        [00,05,05,05,05,05,05,05,05,00]
    ]},

//If we want to add more levels, just add the related data here.
];
