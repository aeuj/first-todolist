// 유저가 값을 입력한다
// 플러스 버튼을 클릭하면 할일이 추가된다
// delete 버튼을 누르면 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 그어진다
// 1. check 버튼을 클릭하는 순간 true를 false로 바꿔준다
// 2. true이면ㅇ 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로 ㄱ

// 진행중 끝남 탭을 누르면 언더바가 이동한다
// 끝남탭은 끝난 아이템만 진행중탭은 진행중 중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = [];
let mode = 'all';
let filterList =[]
addButton.addEventListener("click", addTask);

for(let i=1; i< tabs.length; i++){
  tabs[i].addEventListener("click", function(event){
    filter(event);
  });
}
console.log(tabs);
function addTask(){
  let task = {
    id:ramdonIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  }
  taskList.push(task);
  console.log(taskList);
  render();
}

function render(){
  let list =[];
  if(mode == "all"){
    list = taskList;
  }else if(mode == "ongoing" || mode == "done"){
    list = filterList;
  }
  let resultHTML = '';
  for(let i=0; i < list.length; i++){
    if(list[i].isComplete == true){
      resultHTML +=  `<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">check</button>
        <button onclick="deleteTask('${list[i].id}')">delete</button>
      </div>
    </div>`;
    }else{
      resultHTML +=  `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">check</button>
        <button onclick="deleteTask('${list[i].id}')">delete</button>
      </div>
    </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
  for(let i=0; i < taskList.length; i++){
    if(taskList[i].id == id){
        taskList[i].isComplete = !taskList[i].isComplete; // ! check누르면 줄긋고 다시 누르면 풀리게
        break;
    }
  }
  render(); // 다시 불러줌 실행
  console.log(taskList);
}

function deleteTask(id){
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      taskList.splice(i, 1)
      break;
    }
  }
  render(); // ui부분도 보이게 하려면 불러야한다. 업데이트
}

function filter(event){
  mode=event.target.id
  filterList = [];
  // tab밑에 라인 움직이게 하기
  document.getElementById("under-line").style.width =
    event.target.offsetWidth + "px";
  document.getElementById("under-line").style.top =
    event.target.offsetTop + event.target.offsetHeight + "px";
  document.getElementById("under-line").style.left = 
    event.target.offsetLeft + "px";
  if(mode == "all"){
    render()
  }else if(mode == "ongoing"){
    for(let i = 0; i < taskList.length; i++){
      if(taskList[i].isComplete == false){
        filterList.push(taskList[i])
      }
    }
    render();
  }else if(mode == "done"){
    for(let i=0; i< taskList.length; i++){
      if(taskList[i].isComplete == true){
        filterList.push(taskList[i])
      }
    }
    render()
  }
  console.log(filterList);
}

function ramdonIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);
}
