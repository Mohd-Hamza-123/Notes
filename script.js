
// entire page
let container = document.querySelector('.container');
let option_list = Array.from(document.querySelectorAll('.option'));
let dropDown_wallpaper = document.querySelector('.bxs-image');

// First page elements
const plus_button = document.querySelector(".add_note");
const primary_textarea = document.querySelector(".write_note_primary");
const save_button = document.getElementById("save_note");
const edit_button = document.querySelector(`.edit_button`);
const create_note_name = document.getElementById("note_name");
const spreadSheet_Button = Array.from(document.querySelectorAll('.bx-spreadsheet'));
const colorpallet = document.getElementById('color_pallet');
let speech_btn = document.querySelector('.bx-volume-full');
// Second page elements
let input_Notes = document.getElementById('input_note')
let second_page = document.querySelector(".second_page");
let second_page_All_Notes = document.querySelector(`.second_page_All_Notes`);
let second_Page_Note;
let delete_list = ``

// // second Page icons

const grid_icon_first = document.querySelector('.arrow_grid');
const grid_hidden_icons = document.querySelector('.menu');
const star_icon_container = document.querySelector('.bxs-star');
const archive_icon_container = document.querySelector('.bxs-archive');
const default_icon = document.querySelector('.bx-table');
let favourite_star_icons;
let favourite_item;
let second_Page_Note_icons = [];
let arr_notes = [];
let key = '';
let value = '';
let favourite;
let second_page_archive;
let archive_List_id;
let star_list_archive;
let archive_list_star;
let color_local_storage;
color_local_storage = localStorage.getItem('colors');
if (color_local_storage !== null) {
    colorpallet.value = color_local_storage;
}

// // Clutter
let clutter_star_container = '';
let clutter_archive_container = '';
let clutter = '';
let favourite_star_button;
let archive_visibility;
// reading 
let str;
let default_reading_h3_id;
let edit = false;
// total notes
let total_Notes = 0;
let total_Archive_Notes = 0;
let total_Favourite_Notes = 0;
let sort = document.querySelector('.bx-sort-a-z');

let retrive_data = localStorage.getItem('user');
if (retrive_data !== null) {
    arr_notes = JSON.parse(retrive_data);
}

append_in_second_page();
check_yellow();
archive_visibility_fun();


function plus_button_event() {
    primary_textarea.value = ``;
    create_note_name.value = ``;
    save_button.classList.remove('displayNone');
    create_note_name.removeAttribute('disabled');
    primary_textarea.removeAttribute('readonly');
    create_note_name.focus();
    edit_button.classList.add('displayNone');
}

function save_button_event() {
    if (edit) {
        if (!isNaN(k)) {
            key = create_note_name.value;
            value = primary_textarea.value;
            arr_notes[k].key = key;
            arr_notes[k].text = value;
            k = null;
            save_button.classList.add('displayNone');
            create_note_name.value = '';
            primary_textarea.value = '';
            append_in_second_page();
            str = JSON.stringify(arr_notes);
            localStorage.setItem('user', str);
        }

    }
    else {
        if (create_note_name.value === '' || primary_textarea.value === '') {
            return;
        }
        key = create_note_name.value;
        value = primary_textarea.value;
        save_notes_in_arr(key, value);
        create_note_name.value = '';
        primary_textarea.value = '';
        create_note_name.focus();
    }
    edit = false;
    archive_visibility_fun();
}

function save_notes_in_arr(key, value) {

    arr_notes.splice(0, 0, {
        key: key,
        text: value,
        archive: false,
        favourite: false
    });
    str = JSON.stringify(arr_notes);
    localStorage.setItem('user', str);
    append_in_second_page();
}


function append_in_second_page() {
    clutter = '';
    arr_notes.forEach((element, i) => {
        clutter += `<div id="archive_visibility${i}" class="second_Page_Note flex">
        <h3 id="default_reading_h3_id${i}" onclick="default_reading(${i})">${arr_notes[i].key}</h3>
       <div class="second_Page_Note_icons flex">
         <i class='bx bx-box' id="second_page_archive${i}" onclick="archive_second(${i})"></i>
         <i class='bx bx-star' id="second_page_star${i}" onclick="favourite_star(${i})" "></i>
         <i class='bx bx-trash' id="second_page_trash${i}" onclick="delete_note(${i})"></i>
       </div>
     </div>`;

    })

    total_count();
    second_page_All_Notes.innerHTML = clutter;
    default_icon.classList.add('yellow');
    default_icon.style.borderColor = 'yellow';
    archive_icon_container.classList.remove('yellow');
    archive_icon_container.style.borderColor = 'white';
    star_icon_container.classList.remove('yellow');
    star_icon_container.style.borderColor = 'white';

}
function default_reading(i) {
    default_reading_h3_id = document.getElementById(`default_reading_h3_id${i}`);
    create_note_name.value = arr_notes[i].key;
    primary_textarea.value = arr_notes[i].text;
    input_Notes.classList.remove('displayNone');
    second_page.classList.add('displayNone');
    save_button.classList.add('displayNone');
    edit_button.classList.remove('displayNone');
    create_note_name.setAttribute('disabled', true);
    primary_textarea.setAttribute('readonly', true);
    k = i;
}

function clutter_append() {
    clutter = '';
    arr_notes.forEach((element, i) => {
        clutter += `<div id="archive_visibility${i}" class="second_Page_Note_archive_list flex">
       <h3 id="default_reading_h3_id${i}" onclick="default_reading(${i})">${arr_notes[i].key}</h3>
       <div class="second_Page_Note_icons flex">
         <i class='bx bx-box' id="second_page_archive${i}" onclick="archive_second(${i})"></i>
         <i class='bx bx-star' id="second_page_star${i}" onclick="favourite_star(${i})" "></i>
         <i class='bx bx-trash' id="second_page_trash${i}" onclick="delete_note(${i})"></i>
       </div>
     </div>`;
    })
}


let k;


function archive_second(i) {

    if (arr_notes[i].archive === false) {
        arr_notes[i].archive = true;
    }
    else {
        arr_notes[i].archive = false;
    }


    archive_visibility_fun();

    check_clutter_archive_container();
    check_yellow();
    str = JSON.stringify(arr_notes);
    localStorage.setItem('user', str);
    total_count();
}

function archive_visibility_fun() {
    arr_notes.forEach((element, i) => {
        if (arr_notes[i].archive === true) {
            archive_visibility = document.getElementById(`archive_visibility${i}`);
            archive_visibility.classList.add('displayNone');
        }

    })
}

function archive_icon_container_event() {
    check_clutter_archive_container();
    second_page_All_Notes.innerHTML = clutter_archive_container;
    check_yellow_archive_list();

    arr_notes.forEach((element, i) => {
        if (arr_notes[i].favourite === true) {
            archive_list_star = document.getElementById(`archive_list_star${i}`);
            if (archive_list_star !== null) {
                archive_list_star.classList.add('yellow');
            }
        }
        else {
            archive_list_star = document.getElementById(`archive_list_star${i}`);
            if (archive_list_star !== null) {
                archive_list_star.classList.remove('yellow');
            }
        }
    })
    total_count();
    default_icon.classList.remove('yellow');
    default_icon.style.borderColor = 'white';
    archive_icon_container.classList.add('yellow');
    archive_icon_container.style.borderColor = 'yellow';
    star_icon_container.classList.remove('yellow');
    star_icon_container.style.borderColor = 'white';
}

function favourite_star(i) {
    append_in_second_page();
    favourite_star_icons = document.getElementById(`second_page_star${i}`);
    if (arr_notes[i].favourite === false) {
        arr_notes[i].favourite = true;
    }
    else {
        arr_notes[i].favourite = false;
    }

    if (arr_notes[i].favourite === true) {
        favourite_star_icons.classList.add('yellow');
    }
    else {
        favourite_star_icons.classList.remove('yellow');
    }
    check_yellow();
    archive_visibility_fun();
    str = JSON.stringify(arr_notes);
    localStorage.setItem('user', str);
    total_count();
}

function star_icon_container_event() {
    check_clutter_star_container();
    second_page_All_Notes.innerHTML = clutter_star_container;
    check_yellow_favourite_list();

    arr_notes.forEach((element, i) => {
        if (arr_notes[i].archive === true) {
            star_list_archive = document.getElementById(`star_list_archive${i}`);
            if (star_list_archive !== null) {
                star_list_archive.classList.add('yellow');
            }
        }
        else {
            star_list_archive = document.getElementById(`star_list_archive${i}`);
            if (star_list_archive !== null) {
                star_list_archive.classList.remove('yellow');
            }
        }
    })
    default_icon.classList.remove('yellow');
    default_icon.style.borderColor = 'white';
    archive_icon_container.classList.remove('yellow');
    archive_icon_container.style.borderColor = 'white';
    star_icon_container.classList.add('yellow');
    star_icon_container.style.borderColor = 'yellow';

}

// special functions

function check_yellow_archive_list() {
    arr_notes.forEach((element, i) => {
        if (arr_notes[i].archive === true) {
            archive_List_id = document.getElementById(`archive_List_id${i}`);
            if (archive_List_id !== null) {
                archive_List_id.classList.add('yellow');
            }
        }
        else {
            archive_List_id = document.getElementById(`archive_List_id${i}`);
            if (archive_List_id !== null) {
                archive_List_id.classList.remove('yellow');
            }

        }
    })
}

function check_yellow_favourite_list() {
    arr_notes.forEach((element, i) => {
        if (arr_notes[i].favourite === true) {
            favourite_item = document.getElementById(`starList${i}`);
            favourite_item.classList.add('yellow');
        }
        // else {
        //     favourite_item = document.getElementById(`starList${i}`);
        //     favourite_item.classList.remove('yellow');
        // }
    })
}

function check_yellow() {
    arr_notes.forEach((element, i) => {
        if (arr_notes[i].favourite === true) {
            favourite_star_icons = document.getElementById(`second_page_star${i}`);
            favourite_star_icons.classList.add('yellow');
        }
        else {
            favourite_star_icons = document.getElementById(`second_page_star${i}`);
            favourite_star_icons.classList.remove('yellow');
        }
        if (arr_notes[i].archive === true) {
            second_page_archive = document.getElementById(`second_page_archive${i}`);
            second_page_archive.classList.add('yellow');
        }
        else {
            second_page_archive = document.getElementById(`second_page_archive${i}`);
            second_page_archive.classList.remove('yellow');
        }
    })

}

function check_clutter_star_container() {
    clutter_star_container = '';
    arr_notes.forEach((element, i) => {
        if (arr_notes[i].favourite === true) {
            clutter_star_container += `
        <div class="second_Page_Note_star_list flex">
        <h3 id="default_reading_h3_id${i}" onclick="default_reading(${i})">${arr_notes[i].key}</h3>
        <div class="second_Page_Note_icons_star flex">
          <i class='bx bx-box' id="star_list_archive${i}" onclick="Star_list_archive(${i})"></i>
          <i class='bx bx-star' id="starList${i}" onclick="favrouriteStarList(${i})"></i>
          <i class='bx bx-trash' onclick="favouriteStarList_remove(${i})"></i>
        </div>
      </div>`;
        }
    })
}

function Star_list_archive(i) {
    if (arr_notes[i].archive === true) {
        arr_notes[i].archive = false;
    }
    else {
        arr_notes[i].archive = true;
    }

    arr_notes.forEach((element, i) => {
        if (arr_notes[i].archive === true) {
            star_list_archive = document.getElementById(`star_list_archive${i}`);
            star_list_archive.classList.add('yellow');
        }
        else {
            star_list_archive = document.getElementById(`star_list_archive${i}`);
            if (star_list_archive !== null) {
                star_list_archive.classList.remove('yellow');
            }

        }
    })

    total_count();
}

function favouriteStarList_remove(i) {
    arr_notes.splice(i, 1);
    check_clutter_star_container();
    star_icon_container_event();
    total_count();
}


function archive_List_remove(i) {
    arr_notes.splice(i, 1);
    check_clutter_archive_container();
    archive_icon_container_event();
    total_count();
}




function check_clutter_archive_container() {
    clutter_archive_container = '';
    arr_notes.forEach((element, i) => {
        if (arr_notes[i].archive === true) {
            clutter_archive_container += `<div class="second_Page_Note_archive_list flex">
            <h3 id="default_reading_h3_id${i}" onclick="default_reading(${i})">${arr_notes[i].key}</h3>
            <div class="second_Page_Note_icons_archive flex">
              <i class='bx bx-box' id="archive_List_id${i}" onclick="archive_List(${i})" ></i>
              <i class='bx bx-star' id="archive_list_star${i}" onclick="Archive_list_star(${i})"></i>
              <i class='bx bx-trash' onclick ='archive_List_remove(${i})'></i>
            </div>
          </div>`
        }
    })
    str = JSON.stringify(arr_notes);
    localStorage.setItem('user', str);
}


function archive_List(i) {
    arr_notes[i].archive = false;
    archive_icon_container_event();
    total_count();
}



function Archive_list_star(i) {
    if (arr_notes[i].favourite === true) {
        arr_notes[i].favourite = false;
    }
    else {
        arr_notes[i].favourite = true;
    }

    arr_notes.forEach((element, i) => {
        if (arr_notes[i].favourite === true) {
            archive_list_star = document.getElementById(`archive_list_star${i}`);
            if (archive_list_star !== null) {
                archive_list_star.classList.add('yellow');
            }
        }
        else {
            archive_list_star = document.getElementById(`archive_list_star${i}`);
            if (archive_list_star !== null) {
                archive_list_star.classList.remove('yellow');
            }
        }
    })
    total_count();
}

//////////////////////////////

function favrouriteStarList(i) {
    arr_notes[i].favourite = false;
    check_clutter_star_container();
    star_icon_container_event();
    total_count();
}

function delete_note(i) {
    arr_notes.splice(i, 1);
    append_in_second_page();
    check_yellow();
    str = JSON.stringify(arr_notes);
    localStorage.setItem('user', str);
    archive_visibility_fun();
}

let rotate = true;
function grid_icon_first_event() {
    grid_hidden_icons.classList.toggle('displayNone');
    if (grid_hidden_icons.classList.contains('displayNone')) {
        let grid_arrow = document.querySelector('.bx-chevron-right');
        if (rotate) {
            grid_arrow.style.transform = `rotate(${360}deg)`;
            grid_arrow.style.transition = `${0.5}s`
            rotate = !rotate;
        }
        else {
            grid_arrow.style.transform = `rotate(${0}deg)`;
            grid_arrow.style.transition = `${0.5}s`
            rotate = !rotate;
        }

    }
    else {
        let grid_arrow = document.querySelector('.bx-chevron-right');
        grid_arrow.style.transform = `rotate(${180}deg)`;
        grid_arrow.style.transition = `${0.5}s`
    }

}

function default_icon_event() {
    append_in_second_page();
    check_yellow();
    archive_visibility_fun();
}

function primary_spreadSheet_Button() {
    input_Notes.classList.add('displayNone');
    second_page.classList.remove('displayNone');
    check_yellow();

}

function second_page_spreadSheet_Button_event() {
    input_Notes.classList.remove('displayNone');
    second_page.classList.add('displayNone');
}

// Note Reading functions


function edit_button_event() {
    edit = true;
    create_note_name.removeAttribute('disabled');
    primary_textarea.removeAttribute('readonly');
    edit_button.classList.add('displayNone');
    save_button.classList.remove('displayNone');
}
let selected_value;

function dropDown_wallpaper_event() {
    selected_value = dropDown_wallpaper.value;
    container.style.backgroundImage = selected_value;

}

function total_count() {
    arr_notes.forEach((element, n) => {
        total_Notes++;
        if (arr_notes[n].favourite === true) {
            total_Favourite_Notes++;
        }
        if (arr_notes[n].archive === true) {
            total_Archive_Notes++;
        }
    })

    let total_Notes_element = document.getElementById('total_Note');
    let total_Archive_element = document.getElementById('total_Archive');
    let total_Favourite_element = document.getElementById('total_Favourite');
    total_Notes_element.textContent = `Total Notes : ${total_Notes}`;
    total_Archive_element.textContent = `Archive Notes : ${total_Archive_Notes}`
    total_Favourite_element.textContent = `Favourite Notes : ${total_Favourite_Notes}`
    total_Notes = 0;
    total_Archive_Notes = 0;
    total_Favourite_Notes = 0;
}

function colorpallet_event() {
    let color = colorpallet.value;
    primary_textarea.setAttribute('placeholder', 'Click the + circle to write');
    primary_textarea.style.color = color;
    colorpallet.style.borderColor = color;
    localStorage.setItem('colors', color);
}

dropDown_wallpaper.addEventListener('input', dropDown_wallpaper_event);
plus_button.addEventListener('click', plus_button_event);
save_button.addEventListener('click', save_button_event);
spreadSheet_Button[0].addEventListener('click', primary_spreadSheet_Button);
spreadSheet_Button[1].addEventListener('click', second_page_spreadSheet_Button_event);
grid_icon_first.addEventListener('click', grid_icon_first_event);
star_icon_container.addEventListener('click', star_icon_container_event);
default_icon.addEventListener('click', default_icon_event);
archive_icon_container.addEventListener('click', archive_icon_container_event);
edit_button.addEventListener('click', edit_button_event);
colorpallet.addEventListener('input', colorpallet_event);

