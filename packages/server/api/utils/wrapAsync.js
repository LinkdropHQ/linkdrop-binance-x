import boom from '@hapi/boom'

export default fn => (req, res, next) => {
  fn(req, res, next).catch(err => {
    if (!err.isBoom) {
      if (err.name === 'CastError' || err.kind === 'ObjectId') {
        return next(boom.notFound('No valid entry found'))
      }
      return next(boom.badImplementation(err))
    }
    next(err)
  })
}
