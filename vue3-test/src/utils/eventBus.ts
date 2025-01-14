import mitt from 'mitt'

type Events = {
  'update-message': string
}

const emitter = mitt<Events>()
export default emitter
