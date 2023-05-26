const createDescription = () => {
    var descriptionContainer = document.getElementById('description-container');
    var explore = document.getElementById('explore')
    if(descriptionContainer && explore){
        console.log('descCreate')
        explore.addEventListener('click',() => {
            console.log('clicked')
            descriptionContainer.innerHTML = "<div class='description'>desc</div>"
        })
    }
}

createDescription()