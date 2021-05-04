
function allowDrop(event){
    event.preventDefault();
}
  
function drag(event){
    event.dataTransfer.setData("pickedElementId", event.target.id);
}
  
function drop(event){
    // Preventing default action
    event.preventDefault();

    // If targeted element is image then abort
    if(String(event.target.localName) !== String('div')) return false;

    if(!event.target.className.includes("box")) return false;

    // Removing whitespaces and trimming
    let childVals = event.target.innerHTML;
    childVals = childVals.trim().replace(/(\r\n|\n|\r)/gm, "");
    event.target.innerHTML = childVals;

    // If already element exist then abort
    if(event.target.hasChildNodes()) return false; 

    let data = event.dataTransfer.getData("pickedElementId");
    let elmt = document.getElementById(data);
    event.target.appendChild(elmt);
    return true;
}

(function(){
    
    let divs = document.querySelectorAll(".box");
    let i = 0;
    divs.forEach(div => {
        div.ondrop = function(event){ if(!drop(event)) alert("This block contains another block. Select other block");};
        div.ondragover = function(event){ allowDrop(event); };
        div.setAttribute('id', 'box'+i);
        i++;
    });

});
