import { filterByType, sortByName, filterByName, computeByStats } from './data.js';
import data from './data/pokemon/pokemon.js';

const table = document.querySelector("#table");
const modal = document.querySelector("#modal");
const selectByName = document.querySelector("#selectByName");
const selectByType = document.querySelector("#selectByType");
const searchByName = document.querySelector("#searchByName");
const index = document.querySelector("#index");
const reset = document.querySelector("#reset");



let showByType = (item) => {
    let showForType = " ";

    for ( var i = 0; i < item.type.length; i++ ) {
        showForType = showForType + `<p class= "type${item.type[i]}"> ${item.type[i]}</p>`
    }
    return showForType;
};

const showByData = (array) => {
    table.innerHTML="";    


    array.forEach((item) => {
        const puntos = computeByStats(Object.values(item.stats));
        const name= item.name[0].toUpperCase() + item.name.slice(1);
        
        const showByItem = document.createElement("div");
        showByItem.classList.add("section2_table-item");
        showByItem.innerHTML=`
            <p class="section2-table-item_num">#${item.num}</p>
            <img id="open${item.name}" class="section2-table-item_img" src=${item.img}></img>
            <p class="section2-table-item_name">${name}</p>
            <div class="section2-table-item_type">
                ${showByType(item)}
            </div>
            ` ;
            // ${showByType(item)}
        table.appendChild(showByItem)
                                        
        const showForData = () => {
            const showForItem = document.createElement("div");
            showForItem.classList.add("section2_modal-item");
            // showForItem.classList.add("type" + item.type[0]);
            showForItem.style.display="block";
            showForItem.innerHTML= `
                <span id="close${item.name}" class="section2-modal-item_close">&times;</span>
                <p class="section2-modal-item_num">#${item.num}</p>
                <img class="section2-modal-item_img" src=${item.img}></img>
                <p class="section2-modal-item_name">${item.name}</p>

                <div class="section2-modal-item_type">
                    ${showByType(item)}
                </div>

                <div>
                    <p id="optionByRes${item.name}" class="section2-modal-item_stats">Resistant:</p>
                    <p id="resultByRes${item.name}" class="section2-modal-item_stats-content">${item.resistant}</p>
                   
                    <p id="optionByWak${item.name}" class="section2-modal-item_stats">Weaknesses:</p>
                    <p id="resultByWak${item.name}" class="section2-modal-item_stats-content">${item.weaknesses}</p>

                    <p id="optionBySta${item.name}" class="section2-modal-item_stats">CP:</p>
                    <table id="resultBySta${item.name}" class="section2-modal-item_stats-content">
                        <tbody>
                            <tr>
                                <td></td>
                                <th>Attack</th>
                                <th>Defense</th>
                                <th>Stamina</th>
                                <th>CP</th>
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
                </div>
                `;
                
            table.appendChild(showForItem);

            const optionByRes = document.getElementById("optionByRes" + item.name);
            const optionByWak = document.getElementById("optionByWak" + item.name);
            const optionBySta = document.getElementById("optionBySta" + item.name);
            const resultByRes = document.getElementById("resultByRes" + item.name);
            const resultByWak = document.getElementById("resultByWak" + item.name);
            const resultBySta = document.getElementById("resultBySta" + item.name);
                
            optionByRes.addEventListener("click", () => {
                if (resultByRes.style.display==="block") {
                    resultByRes.style.display="none";
                    optionByRes.classList.remove("active");
                } else {
                    resultByRes.style.display="block";
                    optionByRes.classList.add("active");
                }
            });
            
            optionByWak.addEventListener("click", () => {
                if (resultByWak.style.display==="block") {
                    resultByWak.style.display="none";
                    optionByWak.classList.remove("active");
                } else {
                    resultByWak.style.display="block";
                    optionByWak.classList.add("active");
                }
            });
            
            optionBySta.addEventListener("click", () => {
                if (resultBySta.style.display==="block") {
                    resultBySta.style.display="none";
                    optionBySta.classList.remove("active");
                } else {
                    resultBySta.style.display="block";
                    optionBySta.classList.add("active");
                }
            });

            const closeForItem= document.getElementById("close" + item.name);
            
            closeForItem.addEventListener("click", () => {
                showForItem.style.display="none";
            });
        };

        const openForItem = document.getElementById("open" + item.name);

        openForItem.addEventListener("click", () => {
            showForData();
        });            
    
           
    });
};

        



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


