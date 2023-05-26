import {defineStore} from 'pinia'


export const useTaskStore=defineStore('Task',{
    state:()=>({
       tasks: [],
       isLoading:false
    }),
    getters:{
        fav(){
            return this.tasks.filter(t => t.isFav)
        },
        favCount: (state)=>{
            return state.tasks.reduce((p,c)=>{
                return c.isFav ? p+1 : p
            },0)
        },
        tasksCount:(state)=>{
            return state.tasks.length
        }
    },
    actions:{
        async getTasks(){
            this.isLoading= true
            const resp = await fetch(" http://localhost:3000/tasks")
            const data = await resp.json()
            this.tasks=data
            this.isLoading=false
        },
        async addTask(task){
            this.tasks.push(task)

            const res = await fetch(" http://localhost:3000/tasks",{
                method:'POST',
                body:JSON.stringify(task),
                headers:{'Content-Type':'application/json'}
            })

            if(res.error){
                console.log(error)
            }
        },
       async deleteTask(id){
          this.tasks= this.tasks.filter(t => t.id !== id)

          const res = await fetch(" http://localhost:3000/tasks/"+id,{
            method:'DELETE',

        })

        if(res.error){
            console.log(error)
        }
        },
       async toggleFav(id){
           const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav

            const res = await fetch(" http://localhost:3000/tasks/"+id,{
                method:'PATCH',
                body:JSON.stringify({isFav:task.isFav}),
                headers:{'Content-Type':'application/json'}
            })

            if(res.error){
                console.log(error)
            }
        }
    }
})