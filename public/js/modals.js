$( () => {

const $loginModal = $('.login-modal');
const $login = $('.login');
const $registerModal = $('.register-modal');
const $register = $('.register');
const $closeModal = $('.close-modal');

const loginModal = () => {
  $loginModal.css('display', 'block', '!important');
};
const registerModal = () => {
  $registerModal.css('display', 'block', '!important');
};

const openBox = () => {
  $loginModal.css('display', 'block');
  $registerModal.css('display', 'block')
};

const closeBox = () => {
  $loginModal.css('display', 'none');
  $registerModal.css('display', 'none')
};

$login.on('click', loginModal);
$register.on('click', registerModal);
$closeModal.on('click', closeBox);

closeBox();

});



// this.showNav = false;
//
// this.openLogin = () => {
//   document.getElementById("hello").style.height = "200px";
//   this.showNav = true;
// }
//
// this.closeLogin = () => {
//   document.getElementById("hello").style.height = "0px";
//   this.showNav = false;
// }
