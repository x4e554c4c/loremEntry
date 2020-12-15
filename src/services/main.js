import Collector from '~/collector'
import Inputs from '~/inputs'
import Entry from '~/entry'

function proceed() {
  let targets = Collector.find();
  let inputs = new Inputs(targets);

  inputs.assign(type => {
    return Entry.generate();
  });
}

window.proceed = proceed;