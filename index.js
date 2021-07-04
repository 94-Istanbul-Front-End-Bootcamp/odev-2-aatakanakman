let data = [];
let ageCheck = document.querySelector('#ageCheck')
let activeCheck = document.querySelector('#activeCheck')
let inputText = document.querySelector('#inputText')

const fetchData = () => {
    //verinin çekildiği yer
    fetch("data.json")
    .then(response => {
        return response.json();
    })
    .then(responseData => {
        //json'dan okunan verinin data array'ine atanması
        data = responseData;

        //veri geldikten sonra filtreleme butonu görünür olsun
        let filterButton = document.querySelector("#filterButton");
        filterButton.setAttribute("style", "");

        document.querySelector('#ageLabel').setAttribute('style', "")
        document.querySelector('#activeLabel').setAttribute('style', "")
        document.querySelector('#inputText').setAttribute('style' , "")
        ageCheck.checked = false
        activeCheck.checked = false
        inputText.value = ""
        //verinin html içerisinde listelendiği fonksiyon
        listData(responseData);
    })
    .catch(err => {
        //hata yönetimi
        console.log(err)
    })
}

//verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
const listData = (data) => {
    let list = document.querySelector(".list");
    list.innerHTML = data.map(element => {
        return `
        <li id=${element.id}>
            <span class='bold'>name:</span> ${element.name}
            <span class='bold'>email:</span> ${element.email}
        </li>
        `;
    })
}

//verinin filtrelenmesini sağlayan fonksiyon
//TODO
const filterData = (filter) => {

    let filter1 = filter;

    if(filter1 == "filter"){
        if(ageCheck.checked == true && activeCheck.checked == true){
            filter1 = "ageAndActive"
        }else if(ageCheck.checked == true && activeCheck.checked == false && inputText.value == ""){
            
            filter1 = "age"
        }else if(ageCheck.checked == false && activeCheck.checked == true && inputText.value == ""){
            filter1 = "isActive"
        }else if (ageCheck.checked == false && activeCheck.checked == false && inputText.value != "") {
            filter1 = "input"
        }else if(ageCheck.checked == true && activeCheck.checked == false && inputText.value != ""){
            
            filter1 = "inputAndAge"
        }else if (ageCheck.checked == false && activeCheck.checked == true && inputText.value != ""){
            filter1 = "inputAndActive"
        }else if(ageCheck.checked == true && activeCheck.checked == true && inputText.value != ""){
            filter1 = "all"
        }
        else{
            filter1 = ""
        }
    }
    
    switch (filter1) {
        
        case "isActive":
            let filteredData = data.filter(element => element.isActive === true);
            listData(filteredData);

            break;
        case 'age':
                let filterAge = data.filter(element => element.age > 18);
                listData(filterAge)

            break;
        case "ageAndActive":
                let filter = data.filter(element => element.isActive === true && element.age > 18);
                listData(filter)
              
            break;   
        case "input" : 
                let filterInput = data.filter(element => element.name[0].toLowerCase() == inputText.value)
                listData(filterInput)
            break;

        case "inputAndAge":
            console.log("asdasdad")
                let filterAgeInput = data.filter(element => element.name[0].toLowerCase() == inputText.value && element.age > 18)
                listData(filterAgeInput)
            break;
        case "inputAndActive":
                let filterActiveAndInput = data.filter(element => element.name[0].toLowerCase() == inputText.value && element.isActive == true) 
                listData(filterActiveAndInput)
            break;
        case "all":
                let all = data.filter(element => element.name[0].toLowerCase() == inputText.value && element.isActive == true && element.age > 18)
                listData(all)
        default:

            break;
    }

}
