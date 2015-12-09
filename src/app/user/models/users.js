import ENV from 'utils/env'
import REST from 'utils/rest'

export default class extends REST {

  resource = {
    res: ENV.UC_RES,
    api: '/users',
    idVar: 'user_id'
  }

}
