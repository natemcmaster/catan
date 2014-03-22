
module.exports = BaseModel;

function BaseModel(data) {
  this.data = data;
}

BaseModel.prototype.toJSON = function () {
  return this.data
}

