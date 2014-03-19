
module.exports = BaseModel;

function BaseModel(data) {
  this.data = data;
}

BaseModel.prototype.getData = function () {
  return this.data
}

