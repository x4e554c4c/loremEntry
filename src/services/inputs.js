class Inputs 
{
  constructor(targets) {
    this._targets = targets;
  }

  assign(generator) {
    for (let input of this._targets) {
      input.value = generator('text');
    }
  }
}

export default Inputs;