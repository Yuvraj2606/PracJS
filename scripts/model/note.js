//The Feature of class in JS from ES6
//export feature also from ES6
class Note{
    constructor(noteObject){
        for(let key in noteObject){
            this[key] = noteObject[key];
        }
        this.isMarked = false;
    }
    toggleMark(){
        this.isMarked = !this.isMarked;
    }
}
export default Note;