let categories = {
  "أذكار الصباح": [
    { title: "ذكر 1", text: "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور" },
    { title: "ذكر 2", text: "أصبحنا وأصبح الملك لله والحمد لله لا إله إلا الله وحده لا شريك له" }
  ],
  "أذكار المساء": [
    { title: "ذكر 1", text: "أمسينا وأمسى الملك لله والحمد لله لا إله إلا الله وحده لا شريك له" },
    { title: "ذكر 2", text: "اللهم إني أمسيت أشهدك وأشهد حملة عرشك وملائكتك وجميع خلقك" }
  ],
  "أذكار النوم": [
    { title: "ذكر 1", text: "باسمك اللهم أموت وأحيا" },
    { title: "ذكر 2", text: "اللهم رب الأسحار، ربنا ورب كل شيء" }
  ],
  "أذكار الصلاة": [
    { title: "ذكر 1", text: "سبحان الله وبحمده" },
    { title: "ذكر 2", text: "اللهم صل على محمد وعلى آل محمد" }
  ]
};

const categoriesDiv = document.getElementById("categories");
const contentDiv = document.getElementById("content");
const controlsDiv = document.getElementById("controls");

let currentCategory = null;

function renderCategories() {
  categoriesDiv.innerHTML = "";
  for (let cat in categories) {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = cat;
    btn.onclick = () => showCategory(cat);
    categoriesDiv.appendChild(btn);
  }
}
renderCategories();

function showCategory(category) {
  currentCategory = category;
  contentDiv.innerHTML = `<h2>${category}</h2>`;
  controlsDiv.innerHTML = `
    <button class="control-btn" onclick="addZekr()">إضافة ذكر</button>
    <button class="control-btn" onclick="changeFontSize(-2)">تصغير الخط</button>
    <button class="control-btn" onclick="changeFontSize(2)">تكبير الخط</button>
    <button class="control-btn" onclick="changeFontStyle()">تغيير الخط</button>
  `;
  renderZekrs();
}

function renderZekrs() {
  const list = document.createElement("ul");
  categories[currentCategory].forEach((zekr, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${zekr.title}</b>: ${zekr.text} 
      <button onclick="editZekr(${index})">تعديل</button>
      <button onclick="deleteZekr(${index})">حذف</button>
      <button onclick="moveZekrUp(${index})">⬆️</button>
      <button onclick="moveZekrDown(${index})">⬇️</button>
    `;
    list.appendChild(li);
  });
  contentDiv.appendChild(list);
}

function addZekr() {
  const title = prompt("أدخل عنوان الذكر:");
  const text = prompt("أدخل نص الذكر:");
  if(title && text){
    categories[currentCategory].push({title, text});
    renderZekrs();
  }
}

function deleteZekr(index) {
  if(confirm("هل أنت متأكد من حذف هذا الذكر؟")){
    categories[currentCategory].splice(index, 1);
    renderZekrs();
  }
}

function editZekr(index) {
  const zekr = categories[currentCategory][index];
  const newTitle = prompt("تعديل العنوان:", zekr.title);
  const newText = prompt("تعديل النص:", zekr.text);
  if(newTitle && newText){
    categories[currentCategory][index] = {title:newTitle, text:newText};
    renderZekrs();
  }
}

function moveZekrUp(index) {
  if(index > 0){
    [categories[currentCategory][index-1], categories[currentCategory][index]] =
    [categories[currentCategory][index], categories[currentCategory][index-1]];
    renderZekrs();
  }
}

function moveZekrDown(index) {
  if(index < categories[currentCategory].length-1){
    [categories[currentCategory][index+1], categories[currentCategory][index]] =
    [categories[currentCategory][index], categories[currentCategory][index+1]];
    renderZekrs();
  }
}

let currentFontSize = 16;
function changeFontSize(amount){
  currentFontSize += amount;
  contentDiv.style.fontSize = currentFontSize + "px";
}

let fontList = ["Arial","Tahoma","Verdana","Courier New","Times New Roman"];
let fontIndex = 0;
function changeFontStyle(){
  fontIndex = (fontIndex + 1) % fontList.length;
  contentDiv.style.fontFamily = fontList[fontIndex];
}