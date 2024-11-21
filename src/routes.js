import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    // Listagem de todas as tasks
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
     
      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))

    }
  },
  {
    // Criação de uma task
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description  } = req.body

     //- `id` - Identificador único de cada task
      //- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
      //- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.


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
    // Remover uma task pelo `id`
    method: 'DELETE',
    path: buildRoutePath(`/tasks/:id`),
    handler: (req, res) => {
      const { id  } = req.params;

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    // Marcar pelo `id` uma task como completa
    method: 'PATCH',
    path: buildRoutePath(`/tasks/:id/complete`),
    handler: (req, res) => {
      const { id  } = req.params;
      const { nome, email } = req.body;

      database.update('tasks', id, {nome, email})

      return res.writeHead(204).end()
    }
  },
  {
    // Atualização de uma task pelo `id`
    method: 'PUT',
    path: buildRoutePath(`/tasks/:id`),
    handler: (req, res) => {
      const { id  } = req.params;
      const { nome, email } = req.body;

      database.update('tasks', id, {nome, email})

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