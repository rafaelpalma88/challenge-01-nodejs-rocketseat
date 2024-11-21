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
    handler: (req, res) => {
      const { title, description  } = req.body

      const task = { 
        id: randomUUID(), 
        created_at: new Date(), 
        title, 
        description 
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath(`/tasks/:id`),
    handler: (req, res) => {
      const { id  } = req.params;

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath(`/tasks/:id/complete`),
    handler: (req, res) => {
      const { id  } = req.params;

      database.complete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath(`/tasks/:id`),
    handler: (req, res) => {
      const { id  } = req.params;
      const { title, description } = req.body;

      database.update('tasks', id, {title, description})

      return res.writeHead(204).end()
    }
  },
  {
    // E o verdadeiro desafio: Importação de tasks em massa por um arquivo CSV
    method: 'XXXXX',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query
      
      const tasks = database.select('tasks', search ? {
        nome: search,
        email: search
      }: null)
      return res.end(JSON.stringify(tasks))
    }
  },
]