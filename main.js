"use strict";

/*  Dice Roller
Takes some user input and "rolls" that many dice, stores values in an
array, and displays the total of the array along with each individual
index of the array.
*/

let die_rolls = [];

const dice_input = document.querySelector("#dice-input");
const roll_button = document.querySelector("#roll-button");
const reset_button = document.querySelector("#reset-button");
const all_rolls_button = document.querySelector("#all-rolls-button");
const all_rolls_list = document.querySelector("#all-rolls");

const total = document.querySelector("#total");

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

function clear_list(li) {
    li.innerHTML = "";
}
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

function toggle_hidden(element) {
    if (element.hidden) {
        element.hidden = false;
    } else {
        element.hidden = true;
    }
};

function update_page() {
    let sum = 0;
    clear_list(all_rolls_list);
    for (const roll of die_rolls) {
        append_li(roll, all_rolls_list);
        sum += roll;
    };
    total.innerHTML = "Total: " + sum;
};

roll_button.addEventListener("click", function () {
    let num_dice_rolls = dice_input.value;
    roll_dice(num_dice_rolls, die_rolls);
    update_page();
});

all_rolls_button.addEventListener("click", function () {
    toggle_hidden(all_rolls_list);
});

reset_button.addEventListener("click", function(){
    die_rolls = [];
    update_page();
})