import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44374/api/',
    timeout: 1000,
  });

const axiosModule = {
    category : {
        get : {
            getCategories()
            {
                return instance.get("Home/getCategories");
            },
            getCategory(id)
            {
                return instance.get(`Home/getCategory?id=${id}`);
            }
        },
        post : {
            addCategory(category)
            {
                return instance.post("Home/addCategory", category);
            },
            editCategory(category)
            {
                return instance.post("Home/editCategory", category);
            },
            removeCategory(id)
            {
                return instance.post(`Home/removeCategory?id=${id}`);
            }
        }
    },
    task:
    {
        get: {
            getTask(id)
            {
                return instance.get(`Home/getTask?id=${id}`);
            },
            getActiveTasks()
            {
                return instance.get("Home/getActiveTasks");
            },
            getActiveTasksByCategoryId(categoryId)
            {
                return instance.get(`Home/getActiveTasksByCategoryId?id=${categoryId}`);
            },
            getCompleteTasks()
            {
                return instance.get("Home/getCompleteTasks");
            },
            getCompleteTasksByCategoryId(categoryId)
            {
                return instance.get(`Home/getCompleteTasksByCategoryId?id=${categoryId}`);
            },
            getTasksByCategoryId(categoryId)
            {
                return instance.get(`Home/getTasksByCategoryId?id=${categoryId}`); 
            }
        },
        post: {
            addTask(task)
            {
                return instance.post("Home/addTask", task);
            },
            editTask(task)
            {
                return instance.post("Home/editTask", task);
            },
            removeTask(id)
            {
                return instance.post(`Home/removeTask?id=${id}`);
            }
        }
    }
}

export default axiosModule;