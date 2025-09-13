/* outputs visible task details to console in Kanbanflow when a task description is clicked */
const log = function(msg) { console.log(msg); };
const strip = function(html){
   let doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}
const outputIt = function(e) {
  // Find the closest `.task` element to the click target
  const clicked = e.target.closest('.task');
  if (!clicked) return; // ignore clicks outside `.task`

  let msg = "";
  const append = (txt = "") => { msg += txt + "\n"; };

  const name = clicked.querySelector('.task-name').textContent;// textNoChildren(clicked);
  const descriptionEls = clicked.querySelectorAll(':scope > .task-description p'); 
  const subtaskEls = clicked.querySelectorAll('.subTasks label span');

  append(name);
  append(name.replace(/./g, "-"));

  if (descriptionEls.length > 0) {
    append();
    descriptionEls.forEach(el => {
      append(strip(el.innerHTML.replace(/<br>/g, "\n")));
    });
  }

  if (subtaskEls.length > 0) {
    append();
    append("sub-tasks\n---------");
    subtaskEls.forEach(el => {
      append(el.textContent.trim());
    });
  }

  log(msg);
};
document.addEventListener('click', outputIt);
alert('Ready to dump KanbanFlow Tasks to console on click: descriptions and sub-tasks must be expanded in list view to be included');
