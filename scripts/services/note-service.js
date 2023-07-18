//if export is default then we don't have to required use curely brackets in import
import Note from '../model/note.js';
export const noteOperations ={
    notes:[],
   add(noteObject){
        const note = new Note(noteObject);
        this.notes.push(note);
   } ,
   toggleMark(id){
     this.searchById(id).toggleMark();
     // const noteObject = this.searchById(id);
     // noteObject.isMarked = !noteObject.isMarked;
   },
   total(){
    return this.notes.length;
   },
   marktotal(){
    return this.notes.filter(note=>note.isMarked).length;
   },
   unmarktotal(){
    return this.total()-this.marktotal();
   },
   getNotes(){
     return this.notes;
   },
   remove(){
     this.notes = this.notes.filter(note=>!note.isMarked);
   },
   searchById(id){
    return this.notes.find(note=>note.id===id);
   },
   searchByTitle(title) {
    return this.notes.filter(note => note.title.toLowerCase().includes(title.toLowerCase()));
  },
  sortByTitle() {
    this.notes.sort((a, b) => a.title.localeCompare(b.title));
},

sortByDate() {
    this.notes.sort((a, b) => new Date(a.cdate) - new Date(b.cdate));
},
   

}