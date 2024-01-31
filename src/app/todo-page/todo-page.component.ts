import { CommonModule, DOCUMENT, NgClass, NgFor } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncLocalStorage } from 'async_hooks';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css',
})
export class TodoPageComponent implements OnInit {
  isDarkMode: boolean = false; // Add this line

  todos: string[] = [];
  todoText: string = '';
  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

    // Check if localStorage is available
    if (localStorage) {
      // Load theme preference from local storage
      const storedTheme = localStorage.getItem('isDarkMode');
      this.isDarkMode = storedTheme === 'true';

      // Load todos from local storage
      const storedTodos = localStorage.getItem('todos');
      this.todos = JSON.parse(storedTodos || '[]');
    }
  }

  ngOnInit() {
    // ngOnInit logic here, if needed
  }

  addTodo() {
    this.todos.push(this.todoText);
    this.todoText = '';

    // Save todos to local storage
    if (localStorage) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  handleDelete(todo: string) {
    this.todos = this.todos.filter((t) => t !== todo);

    // Save todos to local storage after deletion
    if (localStorage) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  handleClearTodos() {
    this.todos = [];

    // Save an empty array to local storage
    if (localStorage) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    // Save theme preference to local storage
    if (localStorage) {
      localStorage.setItem('isDarkMode', this.isDarkMode.toString());
    }
  }
}
