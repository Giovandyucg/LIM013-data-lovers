import { filterByType, sortByName, filterByName, computeByStats } from './data.js';
import data from './data/pokemon/pokemon.js';

const table = document.querySelector("#table");
const modal = document.querySelector("#modal");
const selectByName = document.querySelector("#selectByName");
const selectByType = document.querySelector("#selectByType");
const searchByName = document.querySelector("#searchByName");
const index = document.querySelector("#index");
const reset = document.querySelector("#reset");


const showByData = (array) => {
    table.innerHTML="";    


    array.forEach((item) => {
        const puntos = computeByStats(Object.values(item.stats));
        const name= item.name[0].toUpperCase() + item.name.slice(1);
       

        const showByItem = document.createElement("div");
        showByItem.classList.add("section2_table-item");
        showByItem.innerHTML=`
            <p class="section2-table-item_num">#${item.num}</p>
            <img id="open${item.img}" class="section2-table-item_img"src=${item.img}></img>
            <p class="section2-table-item_name"> ${name}</p>
            <p class="section2-table-item_type"> ${item.type}</p>
            ` ;
        table.appendChild(showByItem)
                                        
        const showForData = () => {
            const showForItem = document.createElement("div");
            showForItem.classList.add("section2_modal-item");
            showForItem.style.display="block";
            showForItem.innerHTML= `
                <span id="close${item.name}" class="section2-modal-item_close">&times;</span>
                <p class="section2-modal-item_num">#${item.num}</p>
                <img class="section2-modal-item_img" src=${item.img}></img>
                <p class="section2-modal-item_name">${item.name}</p>
                <p class="section2-modal-item_type">${item.type}</p>
                <p class="section2-modal-item_wak">resistant:${item.resistant}</p>
                <p class="section2-modal-item_wak">waknesses: ${item.weaknesses}</p>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <th>Attack</th>
                            <th>Defense</th>
                            <th>Stamina</th>
                            <th>PC</th>
                        </tr>
                        <tr>
                            <th></th>
                            <td>${item.stats["base-attack"]}</td>
                            <td>${item.stats["base-defense"]}</td>
                            <td>${item.stats["base-stamina"]}</td>
                            <td>${puntos}</td>
                        </tr>  
                    </tbody>
                </table> 
                `;
            table.appendChild(showForItem);
            
            const closeForItem= document.getElementById("close" + item.name);
            
            closeForItem.addEventListener("click", function() {
                showForItem.style.display="none";
            });
        };

        const openForItem = document.getElementById("open" + item.img);

        openForItem.addEventListener("click", showForData);
    });   
}    

//inicializando//
showByData(data.pokemon)


// filterByName//
searchByName.addEventListener("keyup", (e) => {
    table.innerHTML="";
    modal.innerHTML="";
    selectByType.selectedIndex = 0;  
    selectByName.selectedIndex = 0;  
    if (e.keyCode === 13) {
    const showForName = searchByName.value.toLowerCase();
    const showCardName = filterByName(data.pokemon,showForName);
    showByData(showCardName);
    searchByName.value=""; 
    index.innerHTML=" / " + showForName;
    }
});

//sortByName//
selectByName.addEventListener("change", () => {
    table.innerHTML="";
    modal.innerHTML="";
    const showByName = selectByName.value;
    const showListName = sortByName(data.pokemon,showByName);
    showByData(showListName);
    selectByType.selectedIndex = 0; 
    index.innerHTML=" / " + showByName;   
});


// filterByType//
selectByType.addEventListener("change", () => {
    table.innerHTML="";
    modal.innerHTML="";
    const showByType = selectByType.value;
    const showListType = filterByType(data.pokemon,showByType);
    showByData(showListType);
    if (showByType == "All Types") {
    showByData(data.pokemon);
    }
    index.innerHTML=" / " + showByType;
});


reset.addEventListener("click", () => {
    table.innerHTML="";
    modal.innerHTML="";
    showByData(data.pokemon);
    selectByName.selectedIndex = 0;
    selectByType.selectedIndex = 0;    
    index.innerHTML=" / All Types";
});


