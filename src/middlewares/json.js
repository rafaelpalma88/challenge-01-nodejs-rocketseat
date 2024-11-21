export async function json(req,res) {
  const buffers = []

  for await (const chunk of req) {
      buffers.push(chunk)
  }

  try {

      req.body = JSON.parse(Buffer.concat(buffers).toString())

  } catch (error) {

      req.body = null
      console.error('error xxx', error)

  }

  return res
  .setHeader('Content-Type', 'application/json')
  
}