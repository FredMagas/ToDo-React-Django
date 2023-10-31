import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import TodoForm from './components/TodoForm'
import Table from './components/Table'

function App() {

  const [todos, setTodos] = useState("")
  const [isLoading, setisLoading] = useState(true)

  useEffect( () => {
    fetchData()
    console.log(todos);
  }, [])
  
  const fetchData = async () => {
    try {
      const response = await axios.get("https://api-todo-react-app-4a664ae2c098.herokuapp.com/api/todo/")
      setTodos(response.data)
      setisLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <div className='w-full min-h-screen overflow-auto bg-indigo-100 text-black flex flex-col items-center'>
    <div className='flex flex-row content-center justify-center items-center'>
      <img className='w-8 mr-4' src="./src/assets/circle-check-regular.svg" alt="" />
      <nav className='pt-8'>
        <h1 className='text-5xl pb-12'>ToDo List</h1>
      </nav>
    </div>
    <TodoForm
    setTodos = {setTodos}
    fetchData = {fetchData}
    />
    <Table
    todos = {todos}
    setTodos = {setTodos}
    isLoading = {isLoading}
    />

    <footer class="bg-white dark:bg-gray-900 rounded-3xl mt-40">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="sm:flex sm:flex-col sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400 mr-2">© 2023 <a href="https://fredericomagalhaes.com/" class="hover:underline">Frederico Magalhães</a>. All Rights Reserved.</span>
          <hr class="my-4 w-80 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
          <div class="flex mt-4 space-x-5 justify-center sm:mt-4">
            <div className="lg:tooltip" data-tip="LinkedIn">
              <a href="https://www.linkedin.com/in/frederico-magalh%C3%A3es/" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" clip-rule="evenodd"/>
                    <path d="M3 5.012H0V15h3V5.012Z"/>
                  </svg>
                  <span class="sr-only">LinkedIn account</span>
              </a>
            </div>
            <div className="lg:tooltip" data-tip="Github">
              <a href="https://github.com/FredMagas" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                  </svg>
                  <span class="sr-only">GitHub account</span>
              </a>
            </div> 
            <div className="lg:tooltip" data-tip="Portfolio">
              <a href="https://www.fredericomagalhaes.com/" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6.487 1.746c0 4.192 3.592 1.66 4.592 5.754 0 .828 1 1.5 2 1.5s2-.672 2-1.5a1.5 1.5 0 0 1 1.5-1.5h1.5m-16.02.471c4.02 2.248 1.776 4.216 4.878 5.645C10.18 13.61 9 19 9 19m9.366-6h-2.287a3 3 0 0 0-3 3v2m6-8a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <span class="sr-only">Portfolio WebSite</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  )
}

export default App