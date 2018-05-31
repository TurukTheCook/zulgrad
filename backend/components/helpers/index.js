export default {
  caseInsensitive(word) {
    return { $regex: new RegExp('^' + word + '$', 'i') }
  },
  beforeSend(data) {
    data.__v = undefined
    data.createdAt = undefined
    data.updatedAt = undefined
  },
  beforeSendUser(data) {
    data.__v = undefined
    data.password = undefined
  }
}