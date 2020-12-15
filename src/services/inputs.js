class Inputs 
{
  _targets = [];

  TAIL_LENGTH = 3;

  ANIMATION_DELAY = 300;

  constructor(targets = []) {
    this.parse(targets);
  }

  parse(inputs) {
    for (let el of inputs) {
      this._targets.push({
        el, status: null,
      });
    }
  }

  computeNewValues(generator) {
    for (let input of this._targets) {
      input.newValue = generator('text');
    }
  }

  prepareForAnimation() {
    let prepared = [...this._targets];

    for (let i = 0; i < prepared.length; i++) {
      let input = prepared[i];
      
      input.tail = 0;

      // If the value is the same, removing it from the list.
      if (input.el.value === input.newValue) {
        input.status = null;
        prepared.splice(i);
        i--;

        break
      }

      if (input.el.value) {
        input.status = 'removing'; 
        break;
      }

      input.status = 'appending';
    } 

    return prepared;
  }
  
  animate(targets) {
    for (let input of targets) {
      input.el.value = Math.random();
    }
  }

  clearAnimation() {
    if (this.animation !== null)
      clearInterval(this.animation);
  }


  assign(generator) {
    // Clearing current animation (if it exists)
    this.clearAnimation()

    // Generating new value for each input
    this.computeNewValues(generator);

    // Computing animation status for targets
    let animated = this.prepareForAnimation();

    // Inializing animation loop
    this.animation = 
      setInterval(() => this.animate(animated), this.ANIMATION_DELAY);
  }
}

export default Inputs;