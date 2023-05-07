document.querySelector('.img__btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
  });
  
// 假数据存储
const users = [];

// 获取表单元素
const signInForm = document.querySelector('.sign-in');
const signUpForm = document.querySelector('.sign-up');

// 登录处理函数
function handleSignIn(e) {
  e.preventDefault();
  const email = signInForm.querySelector('input[type="email"]').value;
  const password = signInForm.querySelector('input[type="password"]').value;

  // 验证用户
  const user = users.find((user) => user.email === email);
  if (!user || user.password !== password) {
    alert('Invalid email or password');
    return;
  }

  alert('Logged in successfully');
  // 在这里执行登录成功后的操作，例如重定向到另一个页面
}

// 注册处理函数
function handleSignUp(e) {
  e.preventDefault();
  const name = signUpForm.querySelector('input[type="text"]').value;
  const email = signUpForm.querySelector('input[type="email"]').value;
  const password = signUpForm.querySelector('input[type="password"]').value;

  // 检查电子邮件是否已被使用
  if (users.find((user) => user.email === email)) {
    alert('Email already in use');
    return;
  }

  // 保存用户
  users.push({
    name: name,
    email: email,
    password: password,
  });

  alert('Registered successfully');
  // 在这里执行注册成功后的操作，例如自动登录或重定向到另一个页面
}

// 为登录和注册表单添加事件监听器
signInForm.addEventListener('submit', handleSignIn);
signUpForm.addEventListener('submit', handleSignUp);
