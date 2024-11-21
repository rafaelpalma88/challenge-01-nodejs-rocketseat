export function buildRoutePath(path) {

  const routeParametersRegex = /:([a-zA-Z]+)/g
  
  const paramsWithParams = path.replaceAll(routeParametersRegex, '(?<id>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}