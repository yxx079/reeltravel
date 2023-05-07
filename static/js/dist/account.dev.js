"use strict";

document.querySelector('.img__btn').addEventListener('click', function () {
  document.querySelector('.cont').classList.toggle('s--signup');
}); // 假数据存储

var users = []; // 获取表单元素

var signInForm = document.querySelector('.sign-in');
var signUpForm = document.querySelector('.sign-up'); // 登录处理函数

function handleSignIn(e) {
  e.preventDefault();
  var email = signInForm.querySelector('input[type="email"]').value;
  var password = signInForm.querySelector('input[type="password"]').value; // 验证用户

  var user = users.find(function (user) {
    return user.email === email;
  });

  if (!user || user.password !== password) {
    alert('Invalid email or password');
    return;
  }

  alert('Logged in successfully'); // 在这里执行登录成功后的操作，例如重定向到另一个页面
} // 注册处理函数


function handleSignUp(e) {
  e.preventDefault();
  var name = signUpForm.querySelector('input[type="text"]').value;
  var email = signUpForm.querySelector('input[type="email"]').value;
  var password = signUpForm.querySelector('input[type="password"]').value; // 检查电子邮件是否已被使用

  if (users.find(function (user) {
    return user.email === email;
  })) {
    alert('Email already in use');
    return;
  } // 保存用户


  users.push({
    name: name,
    email: email,
    password: password
  });
  alert('Registered successfully'); // 在这里执行注册成功后的操作，例如自动登录或重定向到另一个页面
} // 为登录和注册表单添加事件监听器


signInForm.addEventListener('submit', handleSignIn);
signUpForm.addEventListener('submit', handleSignUp);
//# sourceMappingURL=account.dev.js.map
