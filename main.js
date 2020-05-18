"use strict";

/*  Dice Roller
Takes some user input and "rolls" that many dice, stores values in an
array, and displays the total of the array along with each individual
index of the array.
*/

// ================ VARIABLES ==========================
let die_rolls = [];

const dice_input = document.querySelector("#dice-input");
const roll_button = document.querySelector("#roll-button");
const reset_button = document.querySelector("#reset-button");
const all_rolls_button = document.querySelector("#all-rolls-button");
const all_rolls_list = document.querySelector("#all-rolls");

const total = document.querySelector("#total");

// ================ FUNCTIONS ==========================

function dice() {
    return Math.floor(Math.random()*6)+1;
}

function roll_dice(numRolls, dice_array) {
    if (!numRolls) {
        return dice_array;
    } else {
        dice_array.push(dice());
        roll_dice(numRolls - 1, dice_array);
    }
};
function visualizeDice(value) {
    switch(value) {
        case 1:
            return "\u2680";
        case 2:
            return "\u2681"
        case 3:
            return "\u2682"
        case 4:
            return "\u2683"
        case 5:
            return "\u2684"
        case 6:
            return "\u2685"
    }
}
function append_li(value, list) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(visualizeDice(value)));
    list.appendChild(li);
}

function clear_list(li) {
    li.innerHTML = "";
}

function toggle_hidden(element) {
    if (element.hidden) {
        element.hidden = false;
    } else {
        element.hidden = true;
    }
};

function update_page() {
    clear_list(all_rolls_list);

    function updater(sum, index){
        if (index >= die_rolls.length) {
            return sum
        } else {
            append_li(die_rolls[index], all_rolls_list);
            return updater(sum += die_rolls[index], index + 1)
        }
    }

    let sum = updater(0, 0)
    total.innerHTML = "Total: " + sum;
};


// ================ EVENTS ==========================
roll_button.addEventListener("click", function () {
    roll_dice(dice_input.value, die_rolls);
    update_page();
});

all_rolls_button.addEventListener("click", function () {
    toggle_hidden(all_rolls_list);
});

reset_button.addEventListener("click", function(){
    die_rolls = [];
    update_page();
})