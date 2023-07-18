//Controller(I/O)+ Event + Talk to Services
import{noteOperations} from '../services/note-service.js'
window.addEventListener('load',init);
function init(){
        showCounts();
        bindEvents();
        //disableButton();
}
const enableButton=()=>
    document.querySelector('#delete').disabled=false;

const disableButton=()=>
    document.querySelector('#delete').disabled=true;

function bindEvents(){
    document.querySelector('#add').addEventListener('click',addNote);
    document.querySelector('#delete').addEventListener('click',deleteMarked);
    document.querySelector('#searchByIdBtn').addEventListener('click', searchById);
    document.querySelector('#searchByTitleBtn').addEventListener('click', searchByTitle);
    document.querySelector('#sortTitle').addEventListener('click', sortNotesByTitle);
    document.querySelector('#sortDate').addEventListener('click', sortNotesByDate);
}
function sortNotesByTitle() {
    noteOperations.sortByTitle();
    printNotes(noteOperations.getNotes());
}

function sortNotesByDate() {
    noteOperations.sortByDate();
    printNotes(noteOperations.getNotes());
}
function searchById() {
    const searchId = document.querySelector('#searchId').value.trim();
    if (searchId !== '') {
        const foundNote = noteOperations.searchById(searchId);
        if (foundNote) {
            printNotes([foundNote]);
            return;
        }
    }
    // If note not found or search ID is empty, display all notes
    printNotes(noteOperations.getNotes());
}

function searchByTitle() {
    const searchTitle = document.querySelector('#searchTitle').value.trim();
    if (searchTitle !== '') {
        const foundNotes = noteOperations.searchByTitle(searchTitle);
        if (foundNotes.length > 0) {
            printNotes(foundNotes);
            return;
        }
    }
    // If no notes found or search title is empty, display all notes
    printNotes(noteOperations.getNotes());
}
function deleteMarked(){
     noteOperations.remove();
     printNotes(noteOperations.getNotes());
}
function showCounts(){
    noteOperations.marktotal()>0?enableButton():disableButton();
    document.querySelector('#total').innerText= noteOperations.total();
    document.querySelector('#marktotal').innerText= noteOperations.marktotal();
    document.querySelector('#unmarktotal').innerText= noteOperations.unmarktotal();
}
function addNote(){
    //read Id ,Title, Description ,Completion Date, Importance
    //DOM
    /*const id = document.querySelector('#id').value;
    const title = document.querySelector('#title').value;*/

    const fields = ['id','title','desc','cdate','importance'];
    const noteObject = {}; //Object Literal
    for(let field of fields){
        noteObject[field] = document.querySelector(`#${field}`).value.trim();
    }
    noteOperations.add(noteObject);
    printNote(noteObject);
    showCounts();
}
function printIcon(myClassName='trash',fn,id){
    //<i class="fa-solid fa-trash"></i>
    
    const iTag = document.createElement('i'); //To Create Dynamic Tag we use document.createElement
    iTag.setAttribute('note-id',id);
    iTag.className = `fa-solid fa-${myClassName} clickable me-2`;
    //Add click event listener to the delete icon
     iTag.addEventListener('click', fn);   //call function by function
    return iTag;
}
function toggleMark(){
    //console.log("Toggle Marks ....",this);
    const icon = this;
    const id = this.getAttribute('note-id');
    noteOperations.toggleMark(id);  
    const tr = icon.parentNode.parentNode;
    //tr.className = 'table-danger'
    tr.classList.toggle('table-danger');
    showCounts();
}
function edit(){
    console.log("Edit........");
}
function printNotes(notes)
{
    const tbody = document.querySelector('#notes');
    tbody.innerHTML = '';
    notes.forEach(note => printNote(note));
    showCounts();
}
function printNote(noteObject){
    const tbody = document.querySelector('#notes');
    const row = tbody.insertRow(); //<tr>
    for(let key in noteObject){
        if(key=='isMarked'){
            continue;
        }
        const td = row.insertCell(); //<td>
        td.innerText = noteObject[key];
    }
    const td = row.insertCell();
    td.appendChild(printIcon('trash',toggleMark,noteObject.id));
    td.appendChild(printIcon("user-pen",edit,noteObject.id));
}