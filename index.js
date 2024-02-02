let rechargeCard = []

let refnum = {
  mtn: "*555*",
  glo: "*123*",
  airtel: "*222*",
  mobile: "*321*"
}
let sta

let AllCArdsInLocalStorage = JSON.parse(localStorage.getItem('cardpin'))
if (AllCArdsInLocalStorage) {
  rechargeCard = AllCArdsInLocalStorage
}

function displayAlldetail() {
  show.innerHTML = ""
  rechargeCard.forEach((el, i) => {
    show.innerHTML += `
      <tr>
      <td>${i + 1}</td>
      <td>${el.networkBox}</td>
      <td>${el.amountBox}</td>
      <td>${el.pin}</td>
      <td><button class="statusbtn">${el.sta}</button></td>
      <td onclick="handledelete(${i})"><button class="delbtn">Delete</button></td>
      </tr>
      `
  });
}


function addCard() {
  let networkBox = document.getElementById('choosenet').value
  let amountBox = document.getElementById('selectamount').value
  let generateBox = document.getElementById('generate').value
  if (!networkBox || !amountBox || !generateBox) {
    showMessageModal('Please fill the space box')
  }

  let card = {
    networkBox,
    amountBox,
    pin: generate.value,
    sta: 'unused'
  }
  generate.value = ''
  rechargeCard.push(card)
  localStorage.setItem('cardpin', JSON.stringify(rechargeCard))

  displayAlldetail()


}

function generatepin() {
  let randomN = Math.floor(Math.random() * 1000000000000)
  generate.value = refnum[choosenet.value] + randomN + '#'
}

function loadCard() {

  if (load.value == "") {
    showMessageModal('Kindly Generate a pin')
  }
  rechargeCard.forEach(element => {
    if (element.pin == load.value) {
      if (element.sta == "unused") {
        showMessageModal('Recharge Succesful')
        element.sta = "used"
        
        
      } else if (element.sta == "used") {
        showMessageModal('pin already used')
      }
      
    } 
  }) ;

 localStorage.setItem('cardpin', JSON.stringify(rechargeCard))
  displayAlldetail()


}

function showMessageModal(messagetext) {
  modalbox.style.display = "block"
  modalbox.innerHTML = `
  <h1 id="modaltext">${messagetext}</h1>
  <button id="okay" onclick="handleOkayBtn()">Okay</button>
  `
}
function handleOkayBtn() {
  modalbox.style.display = "none"
}
function handledelete(index) {
  rechargeCard.splice(index, 1)

  displayAlldetail()
}




displayAlldetail()