Vue.component('task-list', {
  template: '#task-list',
  props: {
      tasks: { default: [] },
  },
  data: function data() {
      return {
          newTask: ''
      };
  },
  computed: {
      incomplete: function incomplete() {
          return this.tasks.content.filter(this.inProgress).length;
      }
  },

  methods: {
      addTask: function addTask() {
          if (this.newTask) {
              this.tasks.content.push({
                  title: this.newTask,
                  completed: false
              });
              this.newTask = '';
          }
      },
   
      completeTask: function completeTask(task) {
          task.completed = !task.completed;
          let isAllTaskCompleted = true;
          this.tasks.content.map(function (item) {
              if (!item.completed)
                  isAllTaskCompleted = false;
          });

          localStorage.setItem( this.tasks.heading, JSON.stringify(this.tasks.content));
          let tasks = JSON.parse(localStorage.getItem(this.tasks.heading));
          console.log(tasks);

          console.log(isAllTaskCompleted);
          if (isAllTaskCompleted) {
            //   this.alertDisplay();
          }
      },
      removeTask: function removeTask(index) {
          this.tasks.content.splice(index, 1);
      },
      clearCompleted: function clearCompleted() {
          this.tasks.content = this.tasks.content.filter(this.inProgress);
      },
      clearAll: function clearAll() {
          this.tasks.content = [];
      },

      inProgress: function inProgress(task) {
          return !this.isCompleted(task);
      },
      isCompleted: function isCompleted(task) {
          return task.completed;
      }
  }
});


Vue.component('task-item', {
  template: '#task-item',
  props: ['task'],
  computed: {
      className: function className() {
          var classes = ['tasks__item__toggle'];
          if (this.task.completed) {
              classes.push('tasks__item__toggle--completed');
          }
          return classes.join(' ');
      }
  }
});


new Vue({
    el: '#app',
    data: {
    tasks: [],
    },
    methods : {
        set_data : function(){
            console.log('set');
            localStorage.setItem( 'YourItem', this.tasks.completed);
            message = get_data();
            console.log(message);
        },
        get_data : function(){
            console.log('get');
            return localStorage.getItem( 'YourItem' );
        }
    },

    mounted() {
        if(localStorage.getItem('Task1')){
            this.tasks.push({heading: 'Task1', content:JSON.parse(localStorage.getItem('Task1'))});
        }else{
        this.tasks.push({
                heading: 'Task1',
                content: [
                    {
                        title: 'step1',
                        completed: false
                    },
            
                    {
                        title: 'step2',
                        completed: false
                    },
                    {
                        title: 'step3',
                        completed: false
                    },
                    {
                        title: 'step4',
                        completed: false
                    }
                ]
            });
        }
        if(localStorage.getItem('Task2')){
            this.tasks.push({heading: 'Task2', content:JSON.parse(localStorage.getItem('Task2'))});
        }else{
            this.tasks.push({
                heading: 'Task2',
                content: [
                    {
                        title: 'step5',
                        completed: false
                    },
                    {
                        title: 'step6',
                        completed: false
                    },
                    {
                        title: 'step7',
                        completed: false
                    }
                ]
            });
        }
    }

});