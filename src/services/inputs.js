class Inputs 
{
  _targets = [];

  TAIL_LENGTH = 3;

  ANIMATION_DELAY = 50;

  set(targets = []) {
    this.parse(targets);
  }

  parse(inputs) {
    let targets = [];
    for (let el of inputs) {
      targets.push({
        el, status: null,
      });
    }

    this.clearAnimation();
    this._targets = targets;
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
      input.value = input.el.value;

      // If the value is the same, removing it from the list.
      if (input.value === input.newValue) {
        input.status = null;
        prepared.splice(i, 1);
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

  computeAnimValue(value, newValue, tail, status) {
    if (status === 'removing') {
      if (!!!value.length) {
        // '$$$' -> '$$'
        tail = tail.slice(0, -1);
        
        if (!!!tail.length)
          status = 'appending';
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
    else if (status === 'appending') {
      if (value.length + tail.length >= newValue.length) {
        // 'stri$$' -> 'strin$'
        value += newValue[value.length];
        tail = tail.slice(0, -1);
        
        if (value.length >= newValue.length)
          status = null
      }
      else if (tail.length < this.TAIL_LENGTH) {
        tail += '$';
      }
      else {
        // '$' -> '$$'
        value += newValue[value.length];
      }
    }
  
    return  { value, tail, status };
  }
  
  animate(targets) {
    for (let i = 0; i < targets.length; i++) {
      let input = targets[i];
      let { tail, status, value, newValue } = input;

      let computed = 
        this.computeAnimValue(value, newValue, tail, status);

      Object.assign(input, computed);

      input.el.value = 
        computed.value + computed.tail;

      if (computed.status === null) {
        targets.splice(i, 1);
        i--;
      }        
    }
  
    return Boolean(targets.length);
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

export default new Inputs();