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
// Returns 1-6, emulating a die
function dice() {
    return Math.floor(Math.random()*6)+1;
}

/* If numRolls == 0 => return the array, 
    else => add a dice roll to the array, 
            call roll_dice again with numRolls - 1

    This is a more advanced - but not strictly better - programming
    paradigm called "recursion". It involves a base case that STOPS the recursion, 
    and a recursive condition that will eventually reach the base case.

    For most intents and purposes, it does exactly what a loop does. It isn't any 
    better or worse for MOST cases and in this case I just preferred using it. */
function roll_dice(numRolls, dice_array) {
    if (!numRolls) {
        return dice_array;
    } else {
        dice_array.push(dice());
        roll_dice(numRolls - 1, dice_array);
    }
};

// Takes in a value 1-6 and returns the corresponding dice emoji
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

// A function to create and add 'li' to a list
function append_li(value, list) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(visualizeDice(value)));
    list.appendChild(li);
}

// Empties the innerHTML of a list, clearing it
function clear_list(li) {
    li.innerHTML = "";
}

// If an html element is hidden, unhides it. Else, hides it.
function toggle_hidden(element) {
    if (element.hidden) {
        element.hidden = false;
    } else {
        element.hidden = true;
    }
};

/* Specific function to clear page
    First, it clears the list to prevent any unwanted behavior. */
function update_page() {
    clear_list(all_rolls_list);
    /* This is a helper function that iterates over the dice array, 
        and RETURNS the sum of the array. It also calls append_li on each loop.
        Since it is very specific, I put it into its own function 
        so changes made to it wouldn't affect the update page function. 
        
        As a general rule, your functions should TRY to have a singular goal. Even though this
        function appears to break that rule, everything in the function falls under the goal of
        doing the legwork for updating the page. Be careful about making your goal to wide
        or you'll have functions that do too much and fixing bugs becomes much harder. */
    function updater(sum, index){
        if (index >= die_rolls.length) {
            return sum
        } else {
            append_li(die_rolls[index], all_rolls_list);
            return updater(sum += die_rolls[index], index + 1)
        }
    }
    // This is where we actually use the updater function
    let sum = updater(0, 0)
    total.innerHTML = "Total: " + sum;
};

/* Because of the functions we made above, this section is very clear and legible.
    I don't even need to document how the code works because it uses human language,
            roll the dice, update the page, toggle hidden. We even reuse update_page
            in multiple functions, making our code cleaner and more functional. */
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