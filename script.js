window.addEventListener('load', () => {
	const form = document.querySelector("#new-task");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
	const date = document.querySelector("#new-task-dueDate")
	const errorMessage = 'Task is either longer than 30 characters or empty'

	form.addEventListener('submit', (e) => {
		if(input.value.length == 0 || input.value.length > 30){
			alert(errorMessage)
			return
		}

		e.preventDefault();

		const task = input.value;

		const taskComponent = document.createElement('div');
		taskComponent.classList.add('task');
		taskComponent.setAttribute('draggable', true);

		const taskContent = document.createElement('div');
		taskContent.classList.add('content');

		taskComponent.appendChild(taskContent);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');
		
		taskContent.appendChild(task_input_el);
		
		const dateInput = document.createElement('input');
		dateInput.classList.add('date');
		dateInput.type = 'date';
		dateInput.setAttribute('readonly', 'readonly')
		dateInput.value = date.value

		taskContent.appendChild(dateInput);

		const taskButtonsDiv = document.createElement('div');
		taskButtonsDiv.classList.add('actions');
		
		const taskEditButton = document.createElement('button');
		taskEditButton.classList.add('edit');
		taskEditButton.innerText = 'Edit';

		const taskDeleteButton = document.createElement('button');
		taskDeleteButton.classList.add('delete');
		taskDeleteButton.innerText = 'Delete';

		const taskMoveUpButoon = document.createElement('button')
		taskMoveUpButoon.classList.add('upDown')
		taskMoveUpButoon.innerText = 'UP'

		const taskMoveDownButoon = document.createElement('button')
		taskMoveDownButoon.classList.add('upDown')
		taskMoveDownButoon.innerText = 'DOWN'
		
		taskButtonsDiv.appendChild(taskMoveUpButoon)
		taskButtonsDiv.appendChild(taskMoveDownButoon)
		taskButtonsDiv.appendChild(taskEditButton);
		taskButtonsDiv.appendChild(taskDeleteButton);

		taskComponent.appendChild(taskButtonsDiv);

		list_el.appendChild(taskComponent);
		list_el.setAttribute('draggable', 'true')
		
		input.value = '';
		date.value = '';

		taskEditButton.addEventListener('click', (e) => {
			if (taskEditButton.innerText.toLowerCase() == "edit") {
				taskEditButton.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				dateInput.removeAttribute('readonly')
				task_input_el.focus();
			} else  {	
				const taskInputValue = task_input_el.value.trim();
        
				// Check if the trimmed input is empty
				if (taskInputValue === '') {
					// Display an error message and prevent saving the task
					alert(errorMessage);
					return;
				}
				taskEditButton.innerText = "Edit";
				dateInput.setAttribute('readonly', 'readonly')
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		taskDeleteButton.addEventListener('click', (e) => {
			list_el.removeChild(taskComponent);
		});

		taskMoveDownButoon.addEventListener('click',(e)=>{
			const currentTask = e.target.parentNode.parentNode; 
			const nextTask = currentTask.nextElementSibling; 
			if (nextTask) { 
				list_el.insertBefore(nextTask, currentTask);
			}
		});		

		taskMoveUpButoon.addEventListener('click',(e)=>{
			const currentTask = e.target.parentNode.parentNode; 
			const prevTask = currentTask.previousElementSibling; 
			if (prevTask) { 
				list_el.insertBefore(currentTask, prevTask);
			}
		});
	});
});
