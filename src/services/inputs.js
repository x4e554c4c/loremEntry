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
      
      input.tail = '';
      input.value = 'aaaaaaaaaaaa' || input.el.value;

      // If the value is the same, removing it from the list.
      if (input.value === input.newValue) {
        input.status = null;
        prepared.splice(i);
        i--;

        continue;
      }

      if (input.value) {
        input.status = 'removing'; 
        continue;
      }

      input.status = 'appending';
    } 

    return prepared;
  }

  computeAnimValue(value, newValue, tail, action) {
    if (action === 'removing') {
      if (!!!value.length) {
        // '$$$' -> '$$'
        tail = tail.slice(0, -1);

        if (!!!tail.length)
          status = 'adding';
      }
      else if (tail.length < this.TAIL_LENGTH) {
        // 'strin$' -> 'stri$$'
        value = value.slice(0, -1);
        tail += '$';
      }
      else {
        // 'stri$$' -> 'str$$'
        value = value.slice(0, -1);
      }
    }

    return  { value, tail, action };
  }
  
  animate(targets) {
    for (let input of targets) {
      let { tail, status, value, newValue } = input;

      let computed = 
        this.computeAnimValue(value, newValue, tail, status);

      Object.assign(input, computed);
      
      input.el.value = 
        computed.value + computed.tail
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