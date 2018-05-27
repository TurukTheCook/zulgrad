let helper = {
  caseInsensitive: (word) => {
    return { $regex: new RegExp('^' + word + '$', 'i') }
  },
  beforeSend: (data) => {
    data.__v = undefined
  },
  beforeSendUser: (data) => {
    helper.beforeSend(data)
    data.password = undefined
  }
}

export default helper