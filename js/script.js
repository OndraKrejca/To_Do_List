const alert =  document.querySelector(".c-item_alert")
const form =  document.querySelector(".c-form")
const grocery =  document.getElementById("grocery")
const btn =  document.querySelector(".c-form--btn")
const container = document.querySelector(".grocery__container")
const clear = document.querySelector(".clear__items")

let editElement;
let elementFlag = false;
let elementID = "";

form.addEventListener("submit", writeElement)
clear.addEventListener("click", clearItem)
window.addEventListener("DOMContentLoaded", writeLocalStorage)

function writeElement (e) {
    e.preventDefault()
    const value = grocery.value
    const id = new Date().getTime().toString()

    if (value && !elementFlag) {
        const article = document.createElement("article")
        article.classList.add("c-items__item")

        const attr = document.createAttribute("data-id")
        attr.value = id
        article.setAttributeNode(attr)

        article.innerHTML = `
        <p class="title">${value}</p>
        <a href="#" class="edit_btn"><i class="fa-solid fa-pen-to-square "></i></a>
        <a href="#" class="delete_btn"><i class="fa-solid fa-trash-can "></i></a>
        `
        const editBtn = article.querySelector(".edit_btn")
        const deleteBtn = article.querySelector(".delete_btn")

        editBtn.addEventListener("click", editItem)
        deleteBtn.addEventListener("click", deleteItem)

        container.prepend(article)

        container.classList.add("grocery__container__show")
        addLocalStorage (id, value)
        znameni("Přidana položka", "sucess")
        
        setBackDefault ()

    } else if (value && elementFlag) {
        editElement.innerHTML = value
        editLocalStorage(elementID, value)
        setBackDefault ()
        znameni("Upravena položka", "sucess")
       
        

    } else {
        znameni("Chybí položka", "danger")

    }
}

function znameni (text, klasa) {
    alert.classList.add(`alert_${klasa}`)
    alert.innerHTML = text

    setTimeout( function () {
        alert.classList.remove(`alert_${klasa}`)
        alert.innerHTML = ""
    }, 1000)
}

function clearItem () {
    const items = document.querySelectorAll(".c-items__item")

    items.forEach(oneItem => {
        container.removeChild(oneItem)
    })
    clearLocalStorage ()    
    container.classList.remove("grocery__container__show")
}

function editItem (e) {
    const el = e.currentTarget.parentElement
    editElement = e.currentTarget.previousElementSibling

    grocery.value = editElement.innerHTML
    elementFlag = true
    btn.value = "edit"

    elementID = el.dataset.id
}

function deleteItem (e) {
    const el = e.currentTarget.parentElement
    const id = el.dataset.id

    container.removeChild(el)

    if (container.children.length < 2) {
        container.classList.remove("grocery__container__show")
    }
  
    deleteLocalStorage (id)  
    setBackDefault ()  
}

function addLocalStorage (id, value) {
    let getLc = getLocalStorage ()

    const item = {id: id, value: value}
    
    getLc.push(item)

    localStorage.setItem("items", JSON.stringify(getLc))

}

function deleteLocalStorage (id) {
    let getLc = getLocalStorage ()

    getLc = getLc.filter( oneItem => {

        if (oneItem.id !== id) {
            return oneItem
        }
    })

    localStorage.setItem("items", JSON.stringify(getLc))

}

function editLocalStorage (id, value) {
    let getLc = getLocalStorage ()

    getLc = getLc.map(oneItem => {

        if (oneItem.id === id) {
            oneItem.value = value
        }

        return oneItem
    })

    localStorage.setItem("items", JSON.stringify(getLc))
}

function clearLocalStorage () {

    localStorage.clear()
}

function getLocalStorage () {

    const lc = localStorage.getItem("items")

    if (lc !== null) {
        return JSON.parse(lc)
    } else {
       return []
    }
}

function writeLocalStorage () {
    let getLc = getLocalStorage ()

    getLc.forEach(oneItem => {
        const {id, value} = oneItem
        
        pageLocalStorage (id, value)
        container.classList.add("grocery__container__show")

    })
   
}

function pageLocalStorage (id, value) {
    const article = document.createElement("article")
    article.classList.add("c-items__item")

    const attr = document.createAttribute("data-id")
    attr.value = id
    article.setAttributeNode(attr)

    article.innerHTML = `
    <p class="title">${value}</p>
    <a href="#" class="edit_btn"><i class="fa-solid fa-pen-to-square "></i></a>
    <a href="#" class="delete_btn"><i class="fa-solid fa-trash-can "></i></a>
    `
    const editBtn = article.querySelector(".edit_btn")
    const deleteBtn = article.querySelector(".delete_btn")

    editBtn.addEventListener("click", editItem)
    deleteBtn.addEventListener("click", deleteItem)

    container.prepend(article)
}

function setBackDefault () {
    grocery.value = ""
    elementID = ""
    elementFlag = false;
    btn.value = "Přidat"
}