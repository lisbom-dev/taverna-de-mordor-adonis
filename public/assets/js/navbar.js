const menuButton = document.querySelector('#user-menu-button')
const mobileArea = document.querySelector('#mobile-menu')
const profileManagementPopup = document.querySelector('#profile-management-popup')

function hideMobileArea() {
  mobileArea.classList.toggle('hidden')
}
function hidleProfileManagement() {
  profileManagementPopup.classList.toggle('hidden')
}
