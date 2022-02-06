/*---------------------------------------- before start -------------------------------------------------*/
//lock arrow keys when using the select menu
function lock_arrow(key){
    var keyCode = window.event ? key.keyCode : key.which;
    if(key.preventDefault){
        if(keyCode==37||keyCode==38||keyCode==39||keyCode==40){
            key.preventDefault();
        }
    }else{
        if(keyCode==37||keyCode==38||keyCode==39||keyCode==40){
            window.event.returnValue == false;
        }
    }
}

/*---------------------------------------- let's start -------------------------------------------------*/
function start() {
    // load the first map
    setMap(gameData[0]);

    //set the select part
    var select = document.querySelector('select');
    var level_part = '';
    //here provides 3 levels and if we will have more then can change the number here
    for (var i = 0; i < 3; i++) {
        level_part += '<option> Level ' + (i + 1)+ '</option>';
    }
    select.innerHTML = level_part;

    //change a level
    select.onchange = function(event) {
        //to get the number of the level
        var level_sub_string = this.value.substring(6, 8);//to get the position 6-8/the number of the level
        var game_data_int = parseInt( level_sub_string - 1);//to parse a value as a string and returns the first integer
        var level_int = parseInt(level_sub_string);
        //reload the map
        setMap(gameData[game_data_int]) ;
        if(level_int == 1){
            document.querySelector('.level').innerHTML = 'Level <span>' + level_int + '- Esay' +'</span>';
        }else if(level_int == 2){
            document.querySelector('.level').innerHTML = 'Level <span>' + level_int + '- Middle' + '</span>';
        }else if(level_int == 3){
            document.querySelector('.level').innerHTML = 'Level <span>' + level_int + '- Hard' + '</span>';
        }

        //lose focus
        this.blur();
    }

    //restart
    document.getElementById('restart').onclick = function(event) {
        var select_value =select.value.substring(6, 8);//to get the position 6-8's sub string = the number of the level
        setMap(gameData[parseInt(select_value) - 1]);
    }

    //call the key event function
    keyEvent();
}

/*---------------------------------------- draw the map -------------------------------------------------*/
function setMap(data) {
    //set the whole container of the game map
    var map = '';

    //use table to draw the map, every point has a associated id
    for (var i = 0; i < data.size.height; i++) {
        map += '<tr>';//draw the row's position
        for (var j = 0; j < data.size.width; j++) {
            map += '<td id=' +  i + '_' + j + '></td>';//draw inside object(s) position in the row, id is their coordinates
        }
        map += '</tr>';//end the row's position
    }

    //write the map to the html
    document.querySelector('table').innerHTML = map;
    setMapClass(data.map);
}

// divide the shown objects to different class
// className is to show to the player's position; dataset.class is the original one
function setMapClass(data) { 
    keys = {
        0: "placeholder",
        5: "wall",
        10: "ground", 
        20: "target", //target position for boxes
        60: "man", //the player will control it
        80: "box",  
    };

    //initialize class, put all the objects to their positions
    data.forEach(function(k, i) {
        k.forEach(function(k, j) {//use anonymous function to return
            document.getElementById(i + '_' + j).className = keys[k];//link to keys settings
            document.getElementById(i + '_' + j).dataset.class = keys[k];
        });
    });
}


/*-------------------------------------- listen to the keyboard --------------------------------------------*/
function keyEvent() { 
    document.onkeydown = function(event) {//check if press the keyboard
        // get current man position
        var cur = document.querySelector('.man').id.split('_');
        var row = cur[0];
        var col = cur[1];
        // total row and column numbers
        var rows = document.querySelector('table').rows.length
        var cols = document.querySelector('table').rows[0].cells.length
        var direction;

        // get the different keys' keydown
        switch (event.keyCode) {//also can use .key or .code
            case 37:
                direction = 'left';
                col--;
                if (col < 0 || document.getElementById(row + '_' + col).className == 'wall') {
                    //if the man can't move left
                    return;
                } 
                else if (document.getElementById(row + '_' + col).className == 'box'
                    || document.getElementById(row + '_' + col).className == 'arrive') {
                    // whatever a box on the target or not is on your left
                    col--;
                    if (col < 0 || document.getElementById(row + '_' + col).className == 'wall'
                        || document.getElementById(row + '_' + col).className == 'arrive'
                        || document.getElementById(row + '_' + col).className == 'box') {
                        // there is a wall or another box on the left of the box
                        return; // then the man cannot move left
                    }
                    col++; //if the box on the left is ok to be moved furture left, the man is ok to move left, return col = col-1
                }
                // if on the left is not a box or wall, the man is free to move left, return col = col-1
                break;

            // other rest 3 directions are similar
            case 38:
                direction = 'up';
                row--;
                if (row < 0 || document.getElementById(row + '_' + col).className == 'wall') {
                    return;
                } else if (document.getElementById(row + '_' + col).className == 'box'
                    || document.getElementById(row + '_' + col).className == 'arrive') {
                    row--;
                    if (row < 0 || document.getElementById(row + '_' + col).className == 'wall'
                        || document.getElementById(row + '_' + col).className == 'arrive'
                        || document.getElementById(row + '_' + col).className == 'box') {
                        return;
                    }
                    row++;
                }
                break;

            case 39:
                direction = 'right';
                col++;
                if (col >= cols || document.getElementById(row + '_' + col).className == 'wall') {
                    return;
                } else if (document.getElementById(row + '_' + col).className == 'box'
                    || document.getElementById(row + '_' + col).className == 'arrive') {
                    col++;
                    if (col >= cols || document.getElementById(row + '_' + col).className == 'wall'
                        || document.getElementById(row + '_' + col).className == 'arrive'
                        || document.getElementById(row + '_' + col).className == 'box') {
                        return;
                    }
                    col--;
                }
                break;

            case 40:
                direction = 'down';
                row++;
                if (row >= rows || document.getElementById(row + '_' + col).className == 'wall') {
                    return;
                } else if (document.getElementById(row + '_' + col).className == 'box'
                    || document.getElementById(row + '_' + col).className == 'arrive') {
                    row++;
                    if (row >= rows
                        || document.getElementById(row + '_' + col).className == 'wall'
                        || document.getElementById(row + '_' + col).className == 'arrive'
                        || document.getElementById(row + '_' + col).className == 'box') {
                        return;
                    }
                    row--;
                }
                break;
        }
        // move the man from cur to [row,col] by different direction
        move(cur, [row, col], direction);
    }
}


/*-------------------------------------- move mechanics --------------------------------------------*/
function move(cur, next, direction) {
    // row and col marks the next position
    var row = next[0];
    var col = next[1];
    if (document.getElementById(cur[0] + '_' + cur[1]).dataset.class == 'target') {
        // if the man is standing at a target block right now, when he moves, the block should stay a target
        document.getElementById(cur[0] + '_' + cur[1]).className = 'target';
    } 
    else { // he can't stand on a box or the wall!!! so he must on a ground now, same as the target above
        document.getElementById(cur[0] + '_' + cur[1]).className = 'ground';
    }

    if (document.getElementById(next[0] + '_' + next[1]).className == 'ground'
        || document.getElementById(next[0] + '_' + next[1]).className == 'target'){ // the 'next' now is ground or target
        document.getElementById(next[0] + '_' + next[1]).className = 'man'; // move the man to it
    } 
    else { // eles 'next' now should be a box(whatever arrived on the target ot not)
        switch (direction) { // where the box will arrive
            case 'up':
                row--;
                break;
            case 'right':
                col++;
                break;
            case 'down':
                row++;
                break;
            case 'left':
                col--;
                break;
        }

        if (document.getElementById(row + '_' + col).className == 'ground') { // if the box will arrive on a ground
            document.getElementById(row + '_' + col).className = 'box'; // just draw the box on that block
            document.getElementById(next[0] + '_' + next[1]).className = 'man'; // draw the man on the next
        } 
        else { // else the box will arrive on a target 
            document.getElementById(row + '_' + col).className = 'arrive'; // draw a arrived box on the block
            document.getElementById(next[0] + '_' + next[1]).className = 'man'; // draw the man on the next
        }
    }
    setTimeout(function() {
        isWin(); // to judge if this level is solved
    }, 500)
}


/*-------------------------------- test win or not, give players the alert ------------------------------------------*/
function isWin() { // solved or not
    if (!document.querySelector('.box')) { //if the box all turn to arrived
        if (document.querySelector('.level span').innerHTML == '3') { // the the last level
            alert("Congratulations! All level passed!");
            isWin = function(){};
            window.location.href = "home.html";// finish the last level then back to the home page
        } else {
            alert("Good job! Now try the next new level!");
            var level = parseInt(document.querySelector('.level span').innerHTML);
            setMap(gameData[level]) // switch to next level
            if(level == 0){
                document.querySelector('.level').innerHTML = 'Level <span>' + (level+1) + '- Esay' +'</span>';
            }else if(level == 1){
                document.querySelector('.level').innerHTML = 'Level <span>' + (level+1) + '- Middle' + '</span>';
            }else if(level == 2){
                document.querySelector('.level').innerHTML = 'Level <span>' + (level+1) + '- Hard' + '</span>';
            }
            document.querySelector('select').value = 'Level ' + (level + 1);
        }
    }
}


/*-------------------------------- call the function and start the game -----------------------------------------*/
start();
