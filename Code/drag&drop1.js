
function allowDrop(event){
    event.preventDefault();
}
  
function drag(event){
    event.dataTransfer.setData("elementId", event.target.id);
}
  
function drop(event){
    event.preventDefault();
    var data = event.dataTransfer.getData("elementId");
    event.target.appendChild(document.getElementById(data));
}
