import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))

    }
  },  
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: async (req, res) => {
        const contentType = req.headers['content-type'];

        if (contentType === 'application/json') {
            const { title, description } = req.body;

            const task = {
                id: randomUUID(),
                title,
                description,
                created_at: new Date(),
                completed_at: null
            };

            database.insert('tasks', task);

            return res.writeHead(201).end();
        } else if (contentType === 'text/csv') {
            
          console.log('caiu aqui xxx')
          // Processa CSV
        }
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath(`/tasks/:id`),
    handler: (req, res) => {

      try {
        const { id  } = req.params;

        database.delete('tasks', id)
  
        return res.writeHead(204).end()

      } catch(error) {

        return res.writeHead(404, { 'Content-Type': 'application/json' }).end(
          JSON.stringify({ message: error.message }) 
        );

      }
      
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath(`/tasks/:id/complete`),
    handler: (req, res) => {
      try {
        const { id  } = req.params;

        database.complete('tasks', id)
  
        return res.writeHead(204).end()

      } catch(error) {

        return res.writeHead(404, { 'Content-Type': 'application/json' }).end(
          JSON.stringify({ message: error.message }) 
        );

      }
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath(`/tasks/:id`),
    handler: (req, res) => {

      try {
        const { id  } = req.params;

        const { title, description } = req.body;
  
        database.update('tasks', id, {title, description})
  
        return res.writeHead(204).end()

      } catch(error) {

        return res.writeHead(404, { 'Content-Type': 'application/json' }).end(
          JSON.stringify({ message: error.message }) 
        );

      }
    }
  },
  // E o verdadeiro desafio: Importação de tasks em massa por um arquivo CSV
]