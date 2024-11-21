export async function json(req,res) {
  const buffers = []

  for await (const chunk of req) {
      buffers.push(chunk)
  }

  try {
    const rawData = Buffer.concat(buffers).toString()

    req.body = rawData ? JSON.parse(rawData) : null;

  } catch (error) {
      req.body = null
      console.error('error', error)
  }

  return res.setHeader('Content-Type', 'application/json')
  
}