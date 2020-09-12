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
            <img id="open${item.img}" class="section2-table-item_img" src=${item.img}></img>
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

                <div class="section2-table-item_type">
                    ${showByType(item)}
                </div>

                <div class="section2-table-item_wak"
                    <a href="#" id="accordion1${item.name}"class"accordion"-titulo>Resistant:</a>
                    <div id="panel1" class="accordion-content"> 
                        <p>${item.resistant}</p>
                    </div>
                </div>

                <div class="section2-table-item_wak"
                    <a href="#" id="accordion2${item.name}" class="accordion-titulo">Weaknesses:</a>
                    <div id="panel2" class="accordion-content"> 
                        <p>${item.weaknesses}</p>
                    </div>
                </div>

                <div class="section2-table-item_wak"
                    <a href="#" id="accordion3${item.name}" class="accordion-titulo">CP:</a>
                    <div id="panel3" class="accordion-content"> 
                        <table>
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
                </div>
                `;
                
            table.appendChild(showForItem);

            const accordion1 = document.getElementById("accordion1" + item.name);
            const accordion2 = document.getElementById("accordion2" + item.name);
            const accordion3 = document.getElementById("accordion3" + item.name);
            const panel1 = document.getElementById("panel1");
            const panel2 = document.getElementById("panel2");
            const panel3 = document.getElementById("panel3");
                
            accordion1.addEventListener("click", () => {
                if (panel1.style.display==="block") {
                    panel1.style.display="none";
                   accordion1.classList.remove("active");
                } else {
                    panel1.style.display="block";
                    accordionTitulo.classList.add("active");
                }
            });
            
            accordion2.addEventListener("click", () => {
                if (panel2.style.display==="block") {
                    panel2.style.display="none";
                    accordion2.classList.remove("active");
                } else {
                    panel2.style.display="block";
                    accordion2.classList.add("active");
                }
            });
            
            accordion3.addEventListener("click", () => {
                if (panel3.style.display==="block") {
                    panel3.style.display="none";
                    accordion3.classList.remove("active");
                } else {
                    panel3.style.display="block";
                    accordion3.classList.add("active");
                }
            });

            const closeForItem= document.getElementById("close" + item.name);
            
            closeForItem.addEventListener("click", () => {
                showForItem.style.display="none";
            });
        };

        const openForItem = document.getElementById("open" + item.img);

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


