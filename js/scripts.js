var postDates = {};
// Получаем ссылку на элемент textarea
const textInput = document.getElementById("textInput");
const imageInput = document.getElementById("imageInput"); // Добавлено

// Добавляем обработчик события нажатия клавиши Enter
textInput.addEventListener("keydown", function (event) {
  // Проверяем, что нажата клавиша Enter (код 13)
  if (event.keyCode === 13) {
    // Вызываем функцию publishPost и передаем объект события
    publishPost(event);

    // Предотвращаем стандартное действие клавиши Enter в текстовом поле (новая строка)
    event.preventDefault();
  }
});

function chooseImage() {
  const imageInput = document.getElementById("imageInput");
  imageInput.click();
}

// Обработка изменения выбранного файла
function handleImageChange() {
  const imageInput = document.getElementById("imageInput");

  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
var selectedImage; // Переменная для хранения установленного изображения

function uploadImage() {
  // Вызовите клик на input для открытия окна выбора файла
  document.getElementById("imageAdd").click();
}

function updateAvatar() {
  // Обновление изображения после выбора файла
  var input = document.getElementById("imageAdd");
  var avatarImg = document.getElementById("avatar");

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      avatarImg.src = e.target.result;
      input.value = "";

      // Сохранение установленного изображения в переменной
      selectedImage = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function publishPost(event) {
  event.preventDefault();
  const emptyP = document.getElementById("empty_post");
  const text = textInput.value;
  let nameElem = document.getElementById("name");
  let nameText = nameElem.textContent || nameElem.innerText;
  let name = nameText;
  const tagElem = document.getElementById("tag");
  let tagText = tagElem.textContent || tagElem.innerText;
  let tag = tagText;
  const imageFile = imageInput.files[0]; // Добавлено

  // Создаем новый пост
  const post = document.createElement("div");
  post.className = "post";

  // Добавляем аватар
  const avatarDiv = document.createElement("div");
  avatarDiv.className = "post_avatar";
  const avatarImg = document.createElement("img");

  // Проверяем, установлено ли изображение пользователем
  if (selectedImage) {
    avatarImg.src = selectedImage;
  } else {
    // Если изображение не установлено, используем стандартное изображение
    avatarImg.src = "img/profile.svg";
  }

  avatarImg.alt = "";
  avatarDiv.appendChild(avatarImg);
  post.appendChild(avatarDiv);

  // Добавляем контент поста
  const contentDiv = document.createElement("div");
  contentDiv.className = "post_content";

  // Добавляем профиль пользователя
  const profileDiv = document.createElement("div");
  profileDiv.className = "post_profile";
  const profileName = document.createElement("p");
  profileName.textContent = name; // Вы можете изменить текст
  profileDiv.appendChild(profileName);
  const profileTag = document.createElement("p");
  profileTag.innerHTML = `<span>${tag}</span>`;
  profileDiv.appendChild(profileTag);
  const postDate = document.createElement("p");
  postDate.className = "post_date";
  postDate.id = "postDate_" + Date.now();
  postDates[postDate.id] = 1;
  postDate.textContent = "1s. ago";
  profileDiv.appendChild(postDate);
  contentDiv.appendChild(profileDiv);

  // Добавляем основной текст поста
  const mainDiv = document.createElement("div");
  mainDiv.className = "post_main";
  const mainText = document.createElement("p");
  mainText.textContent = text;
  mainDiv.appendChild(mainText);
  contentDiv.appendChild(mainDiv);

  // Добавляем изображение к посту
  if (imageFile) {
    const image = document.createElement("img");
    image.src = URL.createObjectURL(imageFile);
    image.alt = "Post Image";
    mainDiv.appendChild(image);
  }

  post.appendChild(contentDiv);

  // Добавляем пост перед первым дочерним элементом в #posts
  document.getElementById("empty_post").style.display = "none";
  const postsContainer = document.getElementById("posts");
  const firstPost = postsContainer.firstChild;
  postsContainer.insertBefore(post, firstPost);

  // Очищаем поля ввода
  textInput.value = "";
  imageInput.value = ""; // Очищаем поле для выбора изображения
  console.log("New postDate id:", postDate.id);
}
// Ваши данные профиля (замените их на свои)
let userProfile = {
  name: "Limbo Kalisto",
  tag: "@limbokalisto",
  followers: 921,
  registrationDate: "01.01.1999",
  subscribes: 36,
};
// Открывает всплывающее окно
function openEditProfilePopup(event) {
  event.preventDefault();
  document.getElementById("editName").value = userProfile.name;
  document.getElementById("editTag").value = userProfile.tag;

  document.getElementById("editProfilePopup").style.display = "block";
}

// Закрывает всплывающее окно
function closeEditProfilePopup(event) {
  event.preventDefault();
  document.getElementById("editProfilePopup").style.display = "none";
}

// Сохраняет изменения профиля
function saveProfileChanges(event) {
  const editName = document.getElementById("editName").value;
  const editTag = document.getElementById("editTag").value;

  userProfile.name = editName;
  userProfile.tag = editTag;

  // Обновляем данные на странице
  document.querySelector(".name_text").textContent = editName;
  document.querySelector(".second_info_text span").textContent = editTag;

  // Закрывает всплывающее окно после сохранения
  closeEditProfilePopup(event);
}
document
  .getElementById("editTag")
  .addEventListener("keydown", function (event) {
    // Получаем текущее значение поля ввода
    var inputValue = event.target.value;
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  });

document.getElementById("editTag").addEventListener("input", function (event) {
  // Получаем текущее значение поля ввода
  var inputValue = event.target.value;

  // Предотвращаем удаление первого символа
  if (inputValue.substring(0, 1) !== "@") {
    // Если первый символ был удален, восстанавливаем его
    event.target.value = lastValue;
  } else {
    lastValue = inputValue; // Обновляем последнее значение
  }
});

function updatePostDate() {
  // Проходимся по каждому элементу
  for (var postId in postDates) {
    if (postDates.hasOwnProperty(postId)) {
      var postDateElement = document.getElementById(postId);
      var totalSeconds = postDates[postId];

      // Обновляем текст в зависимости от значений
      if (totalSeconds < 60) {
        postDateElement.innerText = totalSeconds + "s. ago";
      } else {
        var minutes = Math.floor(totalSeconds / 60);
        var remainingSeconds = totalSeconds % 60;

        // Обновляем текст только при каждой новой минуте
        if (remainingSeconds === 0) {
          postDateElement.innerText = minutes + "m. ago";
        }
      }

      // Увеличиваем общее количество секунд для каждого поста
      postDates[postId]++;
    }
  }
}

// Запускаем функцию обновления каждую секунду
setInterval(updatePostDate, 1000);
